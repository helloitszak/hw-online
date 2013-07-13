var express = require('express');
var sass = require('node-sass');
var app = express();

app.use(sass.middleware({
	root: __dirname + "/www",
	src: "sass",
	dest: "css",
	includePaths: [__dirname + "/www/bower_components"],
	debug: true
}));

var port = process.env.PORT || 3000;
console.log("Development Server listening on " + port);
app.use(express.static(__dirname + "/www"));
app.listen(port);