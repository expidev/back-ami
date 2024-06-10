require("dotenv").config()

const config =  {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PASS: process.env.PASS,
    EMAIL: process.env.EMAIL,
    DEFAULT_LOG_EMAIL: process.env.DEFAULT_LOG_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.PORT,
    FRONTEND: process.env.FRONTEND,
    NOTIFIFACTION_SENDER: process.env.NOTIFIFACTION_SENDER
}

module.exports = { config } 