const express = require('express'),
	async = require('asyncawait/async'),
	await = require('asyncawait/await'),
	axios = require('axios'),
	bodyParser = require('body-parser');

const app = express();

var calculate = (a) => { return a/=Math.pow(10, 18) }

//configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res){
	res.render('index', {
		pageTitle:'ES6 NodeJS app that uses async/await!',
	});
});

app.post('/result', function(req, res){
	let postedData = req.body;
	
	// call api
	let url = `https://api.blockcypher.com/v1/eth/main/addrs/${postedData.address}/balance`

	const getEthereumAsync = async ( () => {
	    let result = await (axios(url))
	    let d = await (result.data);
	    return d;
		});

	getEthereumAsync()
		.then(d => res.render('result', {
			pageTitle: `Ethereum balance calculated in Ether: ${calculate(d.balance)}`
		}))
		.catch(reason => res.render('result', {
			error: reason.response.data.error
		}));
});

// run server
const server = app.listen(3000);
console.log('App listening at http://localhost:3000');

