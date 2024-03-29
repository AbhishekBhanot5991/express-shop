module.exports = {
    secretKey: process.env.SECRET_KEY || 'mysecretkey',
    databaseConnectionString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/mydatabase',
    port: process.env.PORT || 3000
};