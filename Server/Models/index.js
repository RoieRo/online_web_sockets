const { Sequelize } = require("sequelize");

// Create a new instance of Sequelize for PostgreSQL
const sequelize = new Sequelize("postgres", "postgres", "totocard", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: console.log, // Enable logging for SQL queries
});

// Import all models
module.exports = {
    sequelize,
};