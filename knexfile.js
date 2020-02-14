// Update with your config settings.
const path = require('path');
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config({ path: `${__dirname}/.env` });

const BASE_PATH = path.join(__dirname, 'backend', 'db');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
    ...knexSnakeCaseMappers(),
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
    ...knexSnakeCaseMappers(),
  }
};
