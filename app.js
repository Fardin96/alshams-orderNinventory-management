// imports-modules
const express = require('express');
const mongoose = require('mongoose');

// imports-others
require('dotenv').config();

// imports-routes
// const userRoute = require('./routes/user');
const authenticaitonRoutes = require('./routes/auth/auth-routes');

// configs
const app = express();
app.use(express.json());
const connection = mongoose.connection;

// mongodb connection
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5001;

mongoose.connect(uri);

// console.log('+-------------SERVER------------------+');
// console.log('MONGODB_URI ', uri);
// console.log('PORT', port);
// console.log('+-------------------------------------+');

connection.once('open', () => {
  console.log('Database connection established successfully!!!');
});

connection.on('error', () => {
  console.log('Error connecting to mongobd database!');
});

// routes
app.get('/', (req, res) => {
  res.json('Connection successful!');
});

// app.use('/newUser', userRoute);
app.use('/auth', authenticaitonRoutes);

// default error codes!
app.use((req, res, next) => {
  const err = new Error('Not Found Bitch!');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);

  // Send a specific response based on error status
  if (res.statusCode === 404) {
    res.send('Not Found!');
  } else {
    res.send(err.message);
  }
});

app.listen(port, () => {
  console.log('Listening on port :', port);
});
