// keys.js
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
    DB_URI: process.env.DB_URI || 'your_mongodb_uri',
    EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'Gmail',
    EMAIL_USER: process.env.EMAIL_USER || 'your_email@example.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'your_email_password',
  };
  