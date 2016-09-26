// include the required library like fs for reading file from file system 
// and nodemailer for sending the email in an easy way
var fs = require('fs')
var nodemailer = require('nodemailer')

// some set up for variables
var hostName = 'jenrenalcare.com'
// test.html contains the HTML-based email that I got from the actual twitter email via outlook desktop application
var fileName = 'test.html'

// setting the hostname for the smtp
var transporter = nodemailer.createTransport('direct:?name=' + hostName)

try {
  var data = fs.readFileSync(fileName)
  var emailContents = data.toString()
} catch (err) {
  return console.log("File " + fileName + " not found. Please make sure it exist!")
}

var mailOptions = {
  from: '"Twitter" <foo@blurdybloop.com>',
  to: 'chen.baron@hotmail.com',
  subject: 'Suspicious sign in detected on your Twitter account',
  html: emailContents,
}

// send the email with the contents based on test.html
transporter.sendMail(mailOptions, function(error, info) {
  if(error) return console.log(error)
  console.log('Email has been sent.')
})