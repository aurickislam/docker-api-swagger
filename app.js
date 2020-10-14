const express = require('express'),
	app = express(),
	colors = require('colors'),
	// request = require('request'),
	fetch = require('node-fetch');

let DOCKER_SERVER = 'docker',
	DOCKER_PORT = 2375;

if (process.env.DOCKER_SERVER && process.env.DOCKER_SERVER != '')
	DOCKER_SERVER = process.env.DOCKER_SERVER;

if (process.env.DOCKER_PORT && process.env.DOCKER_PORT != '')
	DOCKER_PORT = process.env.DOCKER_PORT;

const DOCKER_API_URL = `http://${DOCKER_SERVER}:${DOCKER_PORT}`;

console.log("@DOCKER_SERVER: ".green, DOCKER_SERVER.blue);
console.log("@DOCKER_PORT: ".red, DOCKER_PORT.toString().yellow);
console.log("@DOCKER_API_URL: ".green, DOCKER_API_URL);

app.use(express.json());

app.use(express.static('swagger-ui'));

app.get('/swagger-json/', (request, response) => {
	console.log("@GET swagger JSON");
	response.send(require('./swagger'));
});

app.head('/v1.40/*', (req, res) => {
	console.log("@HEAD");

	fetch(DOCKER_API_URL + req.originalUrl, {
		method: 'HEAD',
		headers: req.headers
	})
		.then(response => {
			const headers = response.headers.raw(),
				cType = response.headers.get('content-type');

			if (cType != null)
				headers['content-type'] = cType;

			res.set(headers);
			res.sendStatus(response.status);
		})
		.catch(err => {
			console.error("@err", err);
			res.status(500).send(err.toString());
		});

	/*request.head({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, (error, response) => {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.sendStatus(response.statusCode);
		}
	});*/
});

app.get('/v1.40*', (req, res) => {
	console.log("@GET");

	fetch(DOCKER_API_URL + req.originalUrl, {
		method: 'GET',
		headers: req.headers
	})
		.then(async response => {
			const body = await response.text(),
				headers = response.headers.raw(),
				cType = response.headers.get('content-type');

			if (cType != null)
				headers['content-type'] = cType;

			res.set(headers);
			res.status(response.status).send(body);
		})
		.catch(err => {
			console.error("@err", err);
			res.status(500).send(err.toString());
		});

	/*request.get({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, (error, response, body) => {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			// res.setHeader('Access-Control-Allow-Origin', '*');
			res.status(response.statusCode).send(body);
			// res.sendStatus(response.statusCode);
		}
	});*/
});

app.delete('/v1.40/*', (req, res) => {
	console.log("@DELETE");

	fetch(DOCKER_API_URL + req.originalUrl, {
		method: 'DELETE',
		headers: req.headers
	})
		.then(async response => {
			const body = await response.text(),
				headers = response.headers.raw(),
				cType = response.headers.get('content-type');

			if (cType != null)
				headers['content-type'] = cType;

			res.set(headers);
			res.status(response.status).send(body);
		})
		.catch(err => {
			console.error("@err", err);
			res.status(500).send(err.toString());
		});

	/*request.delete({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, (error, response, body) => {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});*/
});

app.post('/v1.40/*', (req, res) => {
	console.log("@POST");

	let body = null;
	if (Object.keys(req.body).length > 0)
		body = JSON.stringify(req.body);

	fetch(DOCKER_API_URL + req.originalUrl, {
		method: 'POST',
		body: body,
		headers: req.headers
	})
		.then(async response => {
			const body = await response.text(),
				headers = response.headers.raw(),
				cType = response.headers.get('content-type');

			if (cType != null)
				headers['content-type'] = cType;

			res.set(headers);
			res.status(response.status).send(body);
		})
		.catch(err => {
			console.error("@err", err);
			res.status(500).send(err.toString());
		});

	/*request.post({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, (error, response, body) => {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});*/
});

app.put('/v1.40/*', (req, res) => {
	console.log("@PUT");

	let body = null;
	if (Object.keys(req.body).length > 0)
		body = JSON.stringify(req.body);

	fetch(DOCKER_API_URL + req.originalUrl, {
		method: 'PUT',
		body: body,
		headers: req.headers
	})
		.then(async response => {
			const body = await response.text(),
				headers = response.headers.raw(),
				cType = response.headers.get('content-type');

			if (cType != null)
				headers['content-type'] = cType;

			res.set(headers);
			res.status(response.status).send(body);
		})
		.catch(err => {
			console.error("@err", err);
			res.status(500).send(err.toString());
		});

	/*request.post({url: DOCKER_API_URL + req.originalUrl, headers: req.headers}, function (error, response, body) {
		console.log('statusCode:', response && response.statusCode);
		if (error) {
			console.error('error:', error);
			res.status(500).send(error.toString());
		} else {
			res.set(response.headers);
			res.status(response.statusCode).send(body);
		}
	});*/
});

app.listen(8083, _ => {
	console.log('\n================================'.rainbow);
	console.log('Server is running at port:'.cyan + ' 8083'.red);
	console.log('================================\n'.rainbow);
});
