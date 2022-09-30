const { DB_USERNAME, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: null,
    database: 'sgn_development',
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: null,
    database: 'sgn_test',
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
};
