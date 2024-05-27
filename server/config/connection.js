const {connect, connection} = require('mongoose');
require('dotenv').config();

connect(process.env.MONGODB_URI);

module.exports = connection;

// connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cooknook');

// connect(process.env.MONGODB_URI, {dbName: 'cooknook' })
// .then(() => console.log('Connected to the database'));