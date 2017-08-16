const nodemailer = require('nodemailer');

module.exports = function (app, express) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'email@address.com',
      pass: 'password'
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <sandreae@gmail.com>', // sender address
    to: 'email@address.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
 // transporter.sendMail(mailOptions, (error, info) => {
 //   if (error) {
 //       return console.log(error);
 //   }
 //   console.log('Message %s sent: %s', info.messageId, info.response);
 // });

  return transporter
}
