const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) =>{
		if(err){
			console.log("Unable to append to server.log.");
		}
	});
	next();
});

/* Redirect to under maintenance page. */
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Hello, welcome to my page',
		pageTitle: 'Home Page'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', function(req, res){
	res.send({
		errorMessage: "Error handling this request"
	});
})

app.listen(80, () => {
	console.log("Server is up on port 80");
});