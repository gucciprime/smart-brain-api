const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'richardle',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {res.send('working')})

// signin
app.post('/signin', signin.handleSignin(db, bcrypt))

// register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

//profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

//image post
app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => console.log(`app is running on port ${process.env.PORT}`));
/*
 /--> res = this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> POST --> user
*/