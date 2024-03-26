const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const port = 3001;
const app = express();

app.use(express, express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// db.once('open', () => {
//   });
app.listen(port, () => {
  console.log('API listening on port', port);
});
