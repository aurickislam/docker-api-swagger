console.log(process.argv);
var contentType = process.argv[2];
var expectedRes = process.argv[3];
var heartbeat = process.argv[4];

if (heartbeat) {
	console.log("@heartbeat is defined");
	console.log("contentType", contentType);
	if (contentType == 'application/json') {
		console.log("JSON");
		try {
			var heartbeatJSON = JSON.parse(heartbeat);
			var expectedResJSON = JSON.parse(expectedRes);

			for (const key in heartbeatJSON) {
				if (heartbeatJSON[key] && expectedResJSON[key] && heartbeatJSON[key].toUpperCase() == expectedResJSON[key].toUpperCase())
					process.exit(0);
			}
		} catch (e) {
			process.exit(1);
		}
	} else if (heartbeat == expectedRes) process.exit(0);
}
process.exit(1);