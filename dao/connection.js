const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
    // For development environment
    pool = mysql.createPool({
        connectionLimit: 20,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    // Query function for executing queries
    async function query(sql, values) {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', { sql, values });
                    reject(error);
                } else {
                    console.log('Executed query:', { sql, values });
                    resolve(results);
                }
            });
        });
    }

    // Log that the database connection is established only if there's no error
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
        } else {
            console.log('Connected to database:', process.env.DB_NAME, 'on', process.env.DB_HOST);
            connection.release();
        }
    });

    module.exports = { query };
} else {
    // For other environments (production, etc.)
    pool = mysql.createPool({
        connectionLimit: 20,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    async function query(sql, values) {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', { sql, values });
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Log that the database connection is established only if there's no error
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
        } else {
            console.log('Connected to database:', process.env.DB_NAME, 'on', process.env.DB_HOST);
            connection.release();
        }
    });

    module.exports = { query };
}
