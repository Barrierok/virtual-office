// Update with your config settings.
require('dotenv').config();
const path = require('path');

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
  },
};
