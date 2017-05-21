var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));


// Set up to use a session
app.use(cookieParser('notsosecret'));
app.use(session({
    secret: 'notsosecretkey123'
}));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// An array to store chat messages.
var msgs = [];
var listofusers = [];

function getName(req, res) {

    if(req.session.name != undefined) {
      return res.json({
        name: req.session.name
      });
    }
    else {
      return res.json({
        name: ""
      });
    }
}

// Add the username to the session
function setName(req, res) {
    if (!req.body.hasOwnProperty('name')) {
        res.statusCode = 400;
        return res.json({
            error: 'Invalid message'
        });
    } else {
        req.session.name = req.body.name;
        listofusers.push(req.session.name)
        return res.json({
            name: req.body.name,
            list: listofusers
        });
    }
}

// Set the username to empty by clearing the session
function logout(req, res) {
    // When a user logs out, remove that user from listofusers
    // in other words, that user is no longer online
    var index = listofusers.indexOf(req.session.name)
    if(index > -1) {
      listofusers.splice(index, 1)
    }

    req.session = null;
    return res.json({});
}

// Get a message from a user
function addMessage(req, res) {
    var msg = req;
    console.log("addmsg:" + req.body.text);
    msgs.push(req.body.text);
    res.send('Success');
}

// Get the full list of messages
function getMessages(req, res) {
    res.send(JSON.stringify(msgs));
}

// Routes
app.get('/name', getName);
app.post('/name', setName);
app.get('/logout', logout);
app.post('/addmsg', addMessage);
app.get('/messages', getMessages);


app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');