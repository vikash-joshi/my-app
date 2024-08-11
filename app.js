require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT
//var cors = require('cors')
const cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const ConnectMongoose=require('./db/db')
const { StartTask } =require('./common/custoncron')
//const { startCronJobs } = require('./common/cronjobs');


//app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.json());
// Server-side code (example in Express.js)
// Server-side code (example in Express.js)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow credentials to be sent with requests
}));


app.use(express.json())
StartTask(); 
//startCronJobs();
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/User'));
app.use('/api/Admin', require('./routes/admin'));


app.listen(port, async () => {
  await ConnectMongoose();
  console.log(`Example app listening on port ${port}`)
})