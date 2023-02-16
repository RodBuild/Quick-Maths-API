const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = async () => {
  // Connect to MongoDB URI
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      _db = mongoose.connection;
      statusDb();
    })
    .then(() => {
      console.log('Connection to MongoDB established successfully');
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// This may be unnccessary.....
const statusDb = () => {
  // console.log(connection)
  // Establish a connection with the URI
  // Check the MongoDB connection
  // const connection = mongoose.connection;
  // _db = connection;
  // connection.once('open', function () {
  // console.log('Connection to MongoDB established successfully');
  // });
  // connection.on('error', function (err) {
  // console.log('Connection Error\n', err);
  // });
  _db.on('error', function (err) {
    console.log('Connection Error\n', err);
  });
};

const getDb = () => {
  if (!_db) {
    console.log('Database not initialized');
  } else {
    return _db;
  }
};

module.exports = { initDb, getDb };
