import path from 'path';
import Koa from 'koa';
import Pug from 'koa-pug';
import socket from 'socket.io';
import http from 'http';
import mount from 'koa-mount';
import serve from 'koa-static';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import { Model } from 'objection';
import _ from 'lodash';
import Knex from 'knex';
import errorHandler from './lib/errorHandler';

import knexConfig from '../knexfile';
import addChatRoutes from './modules/chat/routes';
import webpackConfig from '../webpack.config';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default () => {
  const app = new Koa();
  const knex = Knex(knexConfig.development);
  Model.knex(knex);

  app.use(bodyParser());
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

  const router = new Router();

  app.use(koaLogger());
  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    noCache: process.env.NODE_ENV !== 'production',
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);

  const server = http.createServer(app.callback());
  const io = socket(server);
  app.use(errorHandler);

  addChatRoutes(router, io);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return server;
};
