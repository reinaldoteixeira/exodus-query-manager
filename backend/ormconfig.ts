export default {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: 'Z',
  migrations: ['./src/database/migrations/**.ts'],
  entities: ['./src/domains/*/models/**.ts'],
  seeds: ['./src/database/seeds/**.ts'],
  logging: false,
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
