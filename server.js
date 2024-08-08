const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('welcome to my page ')
})

//import the router file
const personroutes = require('./routes/personroutes');
const menuitemroutes = require('./routes/menuItemroutes');
//use the routers
app.use('/person',personroutes);
app.use('/menu',menuitemroutes);

// comment for testing 

app.listen(3000,()=>{
  console.log('listenig on port 3000');
})
