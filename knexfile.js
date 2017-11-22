module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: [USERNAME],
      database: [DATABASE],
      charset: 'utf8'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER,
      database: process.env.DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  }
}