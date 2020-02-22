// Update with your config settings.
const path = require('path');
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config({ path: `${__dirname}/.env` });

const BASE_PATH = path.join(__dirname, 'backend', 'db');

const connection = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT,
};

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
