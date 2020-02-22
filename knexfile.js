// Update with your config settings.
const path = require('path');
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config({ path: `${__dirname}/.env` });

const BASE_PATH = path.join(__dirname, 'backend', 'db');

const connection = {
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  port: '5432',
};

module.exports = {
  client: 'pg',
  connection,
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
  ...knexSnakeCaseMappers(),
};
