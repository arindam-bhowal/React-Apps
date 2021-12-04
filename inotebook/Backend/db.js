const mongoose = require('mongoose');

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect('mongodb://localhost:27017/test');
//   console.log('Connected to Mongo')
}


module.exports = connectToMongo;