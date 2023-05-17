require('dotenv').config()

const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const user = require('./routes/user.route')

const app = express()
const port = process.env.PORT || 30000
const connectionUrl = process.env.MONGODB_CONNECTION_URL;

app.use(express.json())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())
app.enable('trust proxy')

app.use('/api', user)

mongoose.connect(connectionUrl).then(() => {
    console.log('Connected to the database.');
  }).catch((err) => {
    console.log('ERROR: Cannot connect to the database.');
    console.log(err);
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})