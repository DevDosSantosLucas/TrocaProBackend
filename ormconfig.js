module.exports = {
  
  "type": "postgres",
  "url": process.env.DATABASE_URL ,

    "migrations": [
      "./dist/database/migrations/*.js"
      // "./src/database/migrations/*.ts"

    ], 

  "entities":[
    "./dist/models/*.js"

    // "./src/models/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}




// "host": "localhost",
// "port": 5432,
// "username": "postgres",
// "password": "123456",
// "database": "base_troca_pro_orm",