const express = require('express'),
	app = express(),
	colors = require('colors'),
	fetch = require('node-fetch');

let DOCKER_IP,
	DOCKER_PORT = 2375;

if (process.env.DOCKER_SERVER && process.env.DOCKER_SERVER != '')
	DOCKER_IP = process.env.DOCKER_SERVER;
else {
	console.log("@DOCKER_IP is required".red);
	process.exit(1);
}

if (process.env.DOCKER_PORT && process.env.DOCKER_PORT != '')
	DOCKER_PORT = process.env.DOCKER_PORT;

const DOCKER_API_URL = `http://${DOCKER_IP}:${DOCKER_PORT}`;

console.log("@DOCKER_SERVER: ".green, DOCKER_IP.blue);
console.log("@DOCKER_PORT: ".red, DOCKER_PORT.toString().yellow);
console.log("@DOCKER_API_URL: ".green, DOCKER_API_URL);

app.use(express.json());

app.use(express.static('swagger-ui'));

app.get('/swagger-json/', (request, response) => {
	console.log("@GET swagger JSON");
	response.send(require('./swagger'));
});

// app.head('/v1.*', (req, res) => {
app.head('*', (req, res) => {
	console.log("@HEAD");

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'HEAD',
		headers: req.headers
	}).then(response => {
		const headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		if (cType != null)
			headers['content-type'] = cType;

		res.set(headers);
		res.sendStatus(response.status);
	}).catch(err => {
		console.error("@err", err);
		res.status(500).send(err.toString());
	});
});

app.get('*', (req, res) => {
	console.log("@GET");

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'GET',
		headers: req.headers
	}).then(async response => {
		const body = await response.text(),
			headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		if (cType != null)
			headers['content-type'] = cType;

		res.set(headers);
		res.status(response.status).send(body);
	}).catch(err => {
		console.error("@err", err);
		res.status(500).send(err.toString());
	});
});

app.delete('*', (req, res) => {
	console.log("@DELETE");

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'DELETE',
		headers: req.headers
	}).then(async response => {
		const body = await response.text(),
			headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		if (cType != null)
			headers['content-type'] = cType;

		res.set(headers);
		res.status(response.status).send(body);
	}).catch(err => {
		console.error("@err", err);
		res.status(500).send(err.toString());
	});
});

app.post('*', (req, res) => {
	console.log("@POST");

	let body = null;
	if (Object.keys(req.body).length > 0)
		body = JSON.stringify(req.body);

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'POST',
		body: body,
		headers: req.headers
	}).then(async response => {
		const body = await response.text(),
			headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		if (cType != null)
			headers['content-type'] = cType;

		res.set(headers);
		res.status(response.status).send(body);
	}).catch(err => {
		console.error("@err", err);
		res.status(500).send(err.toString());
	});
});

app.put('*', (req, res) => {
	console.log("@PUT");

	let body = null;
	if (Object.keys(req.body).length > 0)
		body = JSON.stringify(req.body);

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'PUT',
		body: body,
		headers: req.headers
	}).then(async response => {
		const body = await response.text(),
			headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		if (cType != null)
			headers['content-type'] = cType;

		res.set(headers);
		res.status(response.status).send(body);
	}).catch(err => {
		console.error("@err", err);
		res.status(500).send(err.toString());
	});
});

console.log("@trying to connect to DOCKER server");
// fetch(`${DOCKER_API_URL}/v1.41/_ping`, {
fetch(`${DOCKER_API_URL}/info`, {
	method: 'GET'
}).then(async response => {
	if (response.status === 200) {
		const info = await response.json();

		fetch(`${DOCKER_API_URL}/version`, {
			method: 'GET'
		}).then(async response => {
			if (response.status === 200) {
				const version = await response.json();

				console.log("\nServer info:".green);
				console.log("Name:".blue, info.Name.red);
				console.log("CPU core:".blue, info.NCPU.toString().red);

				if (info.MemTotal.toString().length > 9)
					console.log("Memory:".blue, `${(info.MemTotal/1073753975.19).toFixed(2)} GB`.red); // 1073753975.19
				else
					console.log("Memory:".blue, `${(info.MemTotal/1048584).toFixed(0)} MB`.red); // 1048583.96703

				// console.log("Memory:".blue, `${(info.MemTotal/1073741824).toFixed(2)} GB`.red);
				// console.log("Memory:".blue, `${(info.MemTotal/1000000000).toFixed(2)} GB`.red);
				console.log("Operating System:".blue, info.OperatingSystem.red);
				console.log("OSType:".blue, info.OSType.red);
				console.log("Architecture:".blue, info.Architecture.red);

				console.log("\nDocker info:".green);
				console.log("Docker Version:".blue, info.ServerVersion.red);
				console.log("ApiVersion:".blue, version.ApiVersion.red);
				console.log("MinAPIVersion:".blue, version.MinAPIVersion.red);

				app.listen(8083, _ => {
					console.log('\n==============================='.rainbow);
					console.log('Server is running at port:'.cyan + ' 8083'.red);
					console.log('===============================\n'.rainbow);
				});
			}
		}).catch(err => {
			console.error("@err", err);
			process.exit(1);
		});
	}
}).catch(err => {
	console.error("@err", err);
	process.exit(1);
});