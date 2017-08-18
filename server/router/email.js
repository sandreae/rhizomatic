const nodemailer = require('nodemailer');

module.exports = function (app, express) {

  var emailRoute = express.Router()

  emailRoute.get('/send',function(req,res){
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
   };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        return console.log(error);
    } else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
  });
  });
  return emailRoute
}
