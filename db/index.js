const mongoose = require('mongoose');
const config = require('./config.json');

const connectionURL = `mongodb://${config.db.user}@${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(connectionURL, { useNewUrlParser: true})
  .catch(err => console.error(err));

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose connection open on ${connectionURL}`)
});

db.on('disconnected', () => {
  console.log(`Mongoose disconnected open on ${connectionURL}`)
});