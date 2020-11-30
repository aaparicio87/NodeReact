require('dotenv').config()

module.exports = {

  // Configuracion de DB
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "123",
  database: process.env.DB_DATABASE || "inquires",
  host: process.env.DB_HOST ||"127.0.0.1",
  dialect: process.env.DB_DIALECT || "mysql",

  // Configurar Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Configuracion de Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations"

}
