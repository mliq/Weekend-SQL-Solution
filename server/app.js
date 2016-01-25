/*  SERVER  */
var express = require('express');
var app = express();

var users = require('./routes/users');
var orders = require('./routes/orders');
var index = require('./routes/index');
var addresses = require('./routes/addresses');

// mount body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mount router middleware
app.use("/users", users);
app.use("/orders", orders);
app.use("/addresses", addresses);
app.use("/", index);

// set node to listen on a port
app.set('port', process.env.PORT || 5000);
app.listen(app.get("port"), function() {
    console.log("Server is ready: " + app.get("port"));
});