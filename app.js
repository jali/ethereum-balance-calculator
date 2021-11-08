const express = require('express'),
	axios = require('axios');

const app = express();

var calculate = (a) => { return a/=Math.pow(10, 18) }

//configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res){
	res.render('index', {
		pageTitle:'Node app for calculating ethereum balance!',
	});
});

app.post('/result', function(req, res){
	let postedData = req.body;
	
	// call api
	let url = `https://api.blockcypher.com/v1/eth/main/addrs/${postedData.address}/balance`

	const getEthereumAsync = async () => {
	    let result = await (axios(url))
	    let d = await (result.data);
	    return d;
		};

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

