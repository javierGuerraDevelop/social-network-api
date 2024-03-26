const { connect, connection } = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/socialApiDB';

connect(mongoURI);

module.exports = connection;
