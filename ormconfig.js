const migrationsPath =
  './dist/database/migrations' || './src/database/migrations'

module.exports = {
  // synchronize: true, // Tem que usar ?
  synchronize: true,

  type: 'postgres',
  // url: process.env.DATABASE_URL_ELEPHANTSQL,
  // "url":DATABASE_URL_ELEPHANTSQL,
  url: 'postgres://lebniwyn:Wk_J1nHt34_rDLUiX7UtzySDTsX9DJjf@fanny.db.elephantsql.com/lebniwyn',

  migrations: [
    './dist/database/migrations/*.js'
    // './src/database/migrations/*.ts'
  ],

  entities: [
    './dist/models/*.js'
    // "./src/database/migrations/*.ts"

    // './src/models/*.ts'
  ],
  cli: {
    // migrationsDir: './src/database/migrations'
    migrationsDir: migrationsPath

    // migrationsDir: './dist/database/migrations'
  }
}

// "host": "localhost",
// "port": 5432,
// "username": "postgres",
// "password": "123456",
// "database": "base_troca_pro_orm",
