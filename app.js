const express = require('express'),
	app = express(),
	request = require('request');

let DOCKER_SERVER = 'docker',
	DOCKER_PORT = 2375;

if (process.env.DOCKER_SERVER && process.env.DOCKER_SERVER != '')
	DOCKER_SERVER = process.env.DOCKER_SERVER;

if (process.env.DOCKER_PORT && process.env.DOCKER_PORT != '')
	DOCKER_PORT = process.env.DOCKER_PORT;

const DOCKER_API_URL = `http://${DOCKER_SERVER}:${DOCKER_PORT}`;

console.log("@DOCKER_SERVER: ", DOCKER_SERVER);
console.log("@DOCKER_PORT: ", DOCKER_PORT);
console.log("@DOCKER_API_URL: ", DOCKER_API_URL);

app.use(express.json());

app.use(express.static('swagger-ui'));

app.get('/swaggerJSON/', function (request, response) {
	console.log("@swaggerJSON");
	response.send(require('./swagger'));
	// response.send(require('./swagger-ui/swagger.json'));
});

app.head('/v1.40/*', function (req, res) {
	console.log("@HEAD");

	request.get({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			// res.status(response.statusCode).send(body);
			res.sendStatus(response.statusCode);
		}
	});
});

app.get('/v1.40*', function (req, res) {
	console.log("@GET");

	request.get({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
			// res.sendStatus(response.statusCode);
		}
	});
});

app.delete('/v1.40/*', function (req, res) {
	console.log("@DELETE");

	request.delete({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});
});

app.post('/v1.40/*', function (req, res) {
	console.log("@POST");

	request.post({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});
});

app.put('/v1.40/*', function (req, res) {
	console.log("@PUT");

	request.post({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});
});

app.listen(80, () => {
	console.log('==============================');
	console.log('Server is running at : 80 port');
	console.log('==============================');
});
