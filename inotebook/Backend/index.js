const express = require('express')
const connectToMongo = require('./db');
const app = express()
var cors = require('cors')

// -------Dont need to run connectToMongo as it is asyncronous function ---------
// connectToMongo();
const port = 5000

// For using res.body 
app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})