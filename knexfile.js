// Update with your config settings.
const path = require('path');
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config({ path: `${__dirname}/.env` });

const BASE_PATH = path.join(__dirname, 'backend', 'db');

const {
  DB_USER, DB_PASSWORD, HOST, DB_PORT, DB,
} = process.env;

const connection = `postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DB}`;

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || connection,
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
  ...knexSnakeCaseMappers(),
};
