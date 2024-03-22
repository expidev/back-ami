const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
    // For development environment
    pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    // Query function for executing queries
    async function query(sql, values) {
        console.log("pass2")
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', { sql, values });
                    console.log(error.message)
                    reject(error);
                } else {
                    console.log('Executed query:', { sql, values });
                    resolve(results);
                }
            });
        });
    }

    // Export the pool and the query function for development environment
    module.exports = { query };
} else {
    // For other environments (production, etc.)
    pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log("pass3")

    // Export the pool directly for other environments
    module.exports = pool;
}