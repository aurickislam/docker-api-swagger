const express = require('express'),
	app = express(),
	colors = require('colors'),
	fetch = require('node-fetch');

let DOCKER_SERVER_IP,
	DOCKER_SERVER_PORT = 2375;

if (process.env.DOCKER_SERVER_IP && process.env.DOCKER_SERVER_IP != '')
	DOCKER_SERVER_IP = process.env.DOCKER_SERVER_IP;
else {
	console.log("@DOCKER_SERVER_IP is required".red);
	process.exit(1);
}

if (process.env.DOCKER_SERVER_PORT && process.env.DOCKER_SERVER_PORT != '')
	DOCKER_SERVER_PORT = process.env.DOCKER_SERVER_PORT;

const DOCKER_API_URL = `http://${DOCKER_SERVER_IP}:${DOCKER_SERVER_PORT}`;

console.log("@DOCKER_SERVER_IP: ".green, DOCKER_SERVER_IP.blue);
console.log("@DOCKER_SERVER_PORT: ".red, DOCKER_SERVER_PORT.toString().yellow);
console.log("@DOCKER_API_URL: ".green, DOCKER_API_URL);

app.use(express.json());

app.use(express.static('swagger-ui'));

/*const CWD = process.cwd();
app.get('/', (req, res) => {
	res.sendFile(`${CWD}/swagger-ui/index.html`);
});*/

app.get('/swagger.json', (req, res) => {
	console.log("@GET swagger JSON");
	res.send(require('./swagger'));
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
	console.log("@GET", req.originalUrl);

	fetch(`${DOCKER_API_URL}${req.originalUrl}`, {
		method: 'GET',
		headers: req.headers
	}).then(async response => {
		const body = await response.text(),
			headers = response.headers.raw(),
			cType = response.headers.get('content-type');

		console.log("@body", body)

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

		console.log("@headers", headers)
		console.log("@body", body)

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

console.log("\n@trying to connect to DOCKER server".cyan);
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
					console.log("Memory:".blue, `${(info.MemTotal / 1073753975.19).toFixed(2)} GB`.red); // 1073753975.19
				else
					console.log("Memory:".blue, `${(info.MemTotal / 1048584).toFixed(0)} MB`.red); // 1048583.96703

				// console.log("Memory:".blue, `${(info.MemTotal/1073741824).toFixed(2)} GB`.red);
				// console.log("Memory:".blue, `${(info.MemTotal/1000000000).toFixed(2)} GB`.red);
				console.log("Operating System:".blue, info.OperatingSystem.red);
				console.log("OS Version:".blue, info.OSVersion.red);
				console.log("OS Type:".blue, info.OSType.red);
				console.log("Kernel Version:".blue, info.KernelVersion.red);
				console.log("Architecture:".blue, info.Architecture.red);
				console.log("Arch:".blue, version.Arch.red);
				console.log("Images:".blue, info.Images.toString().red);
				console.log("Containers:".blue, info.Containers.toString().red);
				console.log("Containers Running:".blue, info.ContainersRunning.toString().red);

				console.log("\nDocker info:".green);
				console.log("Docker Version:".blue, version.Version.red);
				console.log("Api Version:".blue, version.ApiVersion.red);
				console.log("Min API Version:".blue, version.MinAPIVersion.red);

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