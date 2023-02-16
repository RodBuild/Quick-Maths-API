// This file starte the port listening
// and connects to MongoDb
const app = require('./app');
const db = require('./db/connect');
const port = process.env.PORT || 3000;

async function start() {
  await db.initDb();
  app.listen(port);
  console.log(`Listening on port ${port}`);
}

start();
