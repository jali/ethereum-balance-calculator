var express = require('express');

var app = express();



//configuration
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');


app.get('/', function (req, res){
	res.render('index', {
		pageTitle:'Simple Express 3 and Jade example'
	});
});

var server = app.listen(3010);

console.log('Example app listening at http://localhost:3010');
