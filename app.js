const express = require('express'),
	app = express(),
	request = require('request');

app.use(express.json());

app.use(express.static('swagger-ui'));

app.get('/swaggerJSON/', function (request, response) {
	console.log("@swaggerJSON");
	response.send(require('./swagger'));
	// response.send(require('./swagger-ui/swagger.json'));
});

app.get('/v1.40/*', function (req, res) {
	console.log("@GET");

	console.log("@originalUrl", req.originalUrl);

	request.get({url: 'http://192.168.88.17:2376' + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			// res.setHeader('Content-Type', 'application/json');
			res.status(response.statusCode).send(body);
			// res.sendStatus(200);
			// res.body(body);
		}
	});
});

app.post('/v1.40/*', function (req, res) {
	console.log("@POST");

	console.log("@req body", req.body);

	request.post({url: 'http://192.168.88.17:2376' + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			console.log("@res body", body);
			// console.log("@response", response);
			console.log("@response", response.headers);

			res.set(response.headers);
			res.status(response.statusCode).send(body);
			// res.setHeader('Content-Type', 'application/json');
			// res.sendStatus(response.statusCode);
			// res.body(body);
		}
	});
	// res.sendStatus(202);
});

app.delete('/v1.40/*', function (req, res) {
	console.log("@DELETE");

	request.delete({url: 'http://192.168.88.17:2376' + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			// res.setHeader('Content-Type', 'application/json');
			res.status(response.statusCode).send(body);
			// res.sendStatus(200);
			// res.body(body);
		}
	});
});

app.listen(80, () => {
	console.log('==============================');
	console.log('Server is running at : 80 port');
	console.log('==============================');
});