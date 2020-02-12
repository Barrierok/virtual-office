import path from 'path';
import Koa from 'koa';
import socket from 'socket.io';
import http from 'http';
import mount from 'koa-mount';
import serve from 'koa-static';
import views from 'koa-views';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import { Model } from 'objection';
import Knex from 'knex';
import errorHandler from './lib/errorHandler';

import knexConfig from '../knexfile';
import addChatRoutes from './modules/chat/routes';
import addUserRoutes from './modules/auth/routes';
import webpackConfig from '../webpack.config';
import './modules/auth/utils/configuratePassport';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default () => {
  const app = new Koa();
  const knex = Knex(knexConfig.development);
  Model.knex(knex);

  app.keys = [process.env.SECRET];
  app.use(session({}, app));
  app.use(bodyParser());
  app.use(views(
    path.join(__dirname, '..', 'views'),
    { extension: 'pug' },
  ));
  app.use(koaLogger());
  app.use(errorHandler);
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(serve(path.join(__dirname, '..', 'public')));
  if (isDevelopment) {
    koaWebpack({
      config: webpackConfig,
    }).then((middleware) => {
      app.use(middleware);
    });
  } else {
    const urlPrefix = '/assets';
    const assetsPath = path.resolve(`${__dirname}/../dist/public`);
    app.use(mount(urlPrefix, serve(assetsPath)));
  }

  const server = http.createServer(app.callback());
  const io = socket(server);

  const router = new Router();
  addUserRoutes(router);
  addChatRoutes(router, io);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return server;
};
