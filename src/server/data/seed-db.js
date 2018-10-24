require('dotenv').config();

const users = require('./users.json');
const contacts = require('./contacts.json');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedDB(collectionName, initialRecords) {
  MongoClient.connect(process.env.DB_CONN, (error, dbObject) => {
    if (error) return console.log(error)
    console.log('successfully connected to the mongo database!');
    const database = dbObject.db('mangagecontacts');
    const collection =  database.collection(collectionName);

    collection.remove();

    initialRecords.forEach((item) => {
      if(item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    collection.insertMany(initialRecords,(error, result) => {
      console.log(`${result.insertedCount} records inserted`);
      console.log('closing connection...');
      dbObject.close();
      console.log('done');
    });
  });
}

seedDB('users', users);
seedDB('contacts', contacts);

