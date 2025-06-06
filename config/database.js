module.exports = ({ env }) => {
  // Production (Railway) configuration
  if (env("NODE_ENV") === "production") {
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: env("DATABASE_URL"),
          ssl: {
            rejectUnauthorized: false,
          },
        },
        acquireConnectionTimeout: 60000,
        pool: {
          min: 2,
          max: 10,
        },
        debug: false,
      },
    }
  }

  // Development configuration
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      useNullAsDefault: true,
      debug: false,
    },
  }
}
