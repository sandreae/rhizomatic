const nodemailer = require('nodemailer');

module.exports = function (app, express) {

  var emailRoute = express.Router()

  emailRoute.get('/send',function(req,res){
  let transporter = nodemailer.createTransport({
    service: 'FastMail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    to: req.query.to,
    from: req.query.from,
    subject: req.query.subject,
    html: req.query.html
   };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(error);
    } else{
        console.log("Message sent: " + response.message);
        res.send("sent");
      }
  });
  });
  return emailRoute
}
