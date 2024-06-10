const mysql = require('mysql');
const { config } = require('../config/config');

let pool;
let query;

const logIsDatabaseConnected = (pool) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
        } else {
            console.log('Connected to database:', config.DB_NAME, 'on', config.DB_HOST);
            connection.release();
        }
    });
}

if (config.NODE_ENV === 'development') {
    // For development environment
    pool = mysql.createPool({
        connectionLimit: 20,
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
    });

    query = async (sql, values) => {
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

} else {
    // For other environments (production, etc.)
    pool = mysql.createPool({
        connectionLimit: 20,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    query = async (sql, values) => {
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

}

logIsDatabaseConnected(pool);

module.exports = { query };
