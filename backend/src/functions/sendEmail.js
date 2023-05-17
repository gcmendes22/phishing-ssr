const nodemailer = require("nodemailer")

module.exports = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.SANDBOX_USER,
          pass: process.env.SANDBOX_PASSWORD
        }
    })

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) console.error(error)
		else console.log(info.response)
	})
}