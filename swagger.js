module.exports = {
	"swagger": "2.0",
	"schemes": [
		"http",
		"https"
	],
	"produces": [
		"application/json",
		"text/plain"
	],
	"consumes": [
		"application/json",
		"text/plain"
	],
	// "host": "192.168.88.18:2375",
	// "basePath": "/v1.41",
	"info": {
		"title": "Docker Engine API",
		"version": "1.41",
		"x-logo": {
			"url": "https://docs.docker.com/images/logo-docker-main.png"
		},
		"description": "The Engine API is an HTTP API served by Docker Engine. It is the API the\nDocker client uses to communicate with the Engine, so everything the Docker\nclient can do can be done with the API.\n\nMost of the client's commands map directly to API endpoints (e.g. `docker ps`\nis `GET /containers/json`). The notable exception is running containers,\nwhich consists of several API calls.\n\n# Errors\n\nThe API uses standard HTTP status codes to indicate the success or failure\nof the API call. The body of the response will be JSON in the following\nformat:\n\n```\n{\n  \"message\": \"page not found\"\n}\n```\n\n# Versioning\n\nThe API is usually changed in each release, so API calls are versioned to\nensure that clients don't break. To lock to a specific version of the API,\nyou prefix the URL with its version, for example, call `/v1.30/info` to use\nthe v1.30 version of the `/info` endpoint. If the API version specified in\nthe URL is not supported by the daemon, a HTTP `400 Bad Request` error message\nis returned.\n\nIf you omit the version-prefix, the current version of the API (v1.41) is used.\nFor example, calling `/info` is the same as calling `/v1.41/info`. Using the\nAPI without a version-prefix is deprecated and will be removed in a future release.\n\nEngine releases in the near future should support this version of the API,\nso your client will continue to work even if it is talking to a newer Engine.\n\nThe API uses an open schema model, which means server may add extra properties\nto responses. Likewise, the server will ignore any extra query parameters and\nrequest body properties. When you write clients, you need to ignore additional\nproperties in responses to ensure they do not break when talking to newer\ndaemons.\n\n\n# Authentication\n\nAuthentication for registries is handled client side. The client has to send\nauthentication details to various endpoints that need to communicate with\nregistries, such as `POST /images/(name)/push`. These are sent as\n`X-Registry-Auth` header as a [base64url encoded](https://tools.ietf.org/html/rfc4648#section-5)\n(JSON) string with the following structure:\n\n```\n{\n  \"username\": \"string\",\n  \"password\": \"string\",\n  \"email\": \"string\",\n  \"serveraddress\": \"string\"\n}\n```\n\nThe `serveraddress` is a domain/IP without a protocol. Throughout this\nstructure, double quotes are required.\n\nIf you have already got an identity token from the [`/auth` endpoint](#operation/SystemAuth),\nyou can just pass this instead of credentials:\n\n```\n{\n  \"identitytoken\": \"9cbaf023786cd7...\"\n}\n```\n"
	},
	"tags": [
		{
			"name": "Container",
			"x-displayName": "Containers",
			"description": "Create and manage containers.\n"
		},
		{
			"name": "Image",
			"x-displayName": "Images"
		},
		{
			"name": "Network",
			"x-displayName": "Networks",
			"description": "Networks are user-defined networks that containers can be attached to.\nSee the [networking documentation](https://docs.docker.com/network/)\nfor more information.\n"
		},
		{
			"name": "Volume",
			"x-displayName": "Volumes",
			"description": "Create and manage persistent storage that can be attached to containers.\n"
		},
		{
			"name": "Exec",
			"x-displayName": "Exec",
			"description": "Run new commands inside running containers. Refer to the\n[command-line reference](https://docs.docker.com/engine/reference/commandline/exec/)\nfor more information.\n\nTo exec a command in a container, you first need to create an exec instance,\nthen start it. These two API endpoints are wrapped up in a single command-line\ncommand, `docker exec`.\n"
		},
		{
			"name": "Swarm",
			"x-displayName": "Swarm",
			"description": "Engines can be clustered together in a swarm. Refer to the\n[swarm mode documentation](https://docs.docker.com/engine/swarm/)\nfor more information.\n"
		},
		{
			"name": "Node",
			"x-displayName": "Nodes",
			"description": "Nodes are instances of the Engine participating in a swarm. Swarm mode\nmust be enabled for these endpoints to work.\n"
		},
		{
			"name": "Service",
			"x-displayName": "Services",
			"description": "Services are the definitions of tasks to run on a swarm. Swarm mode must\nbe enabled for these endpoints to work.\n"
		},
		{
			"name": "Task",
			"x-displayName": "Tasks",
			"description": "A task is a container running on a swarm. It is the atomic scheduling unit\nof swarm. Swarm mode must be enabled for these endpoints to work.\n"
		},
		{
			"name": "Secret",
			"x-displayName": "Secrets",
			"description": "Secrets are sensitive data that can be used by services. Swarm mode must\nbe enabled for these endpoints to work.\n"
		},
		{
			"name": "Config",
			"x-displayName": "Configs",
			"description": "Configs are application configurations that can be used by services. Swarm\nmode must be enabled for these endpoints to work.\n"
		},
		{
			"name": "Plugin",
			"x-displayName": "Plugins"
		},
		{
			"name": "System",
			"x-displayName": "System"
		}
	],
	"definitions": {
		"Port": {
			"type": "object",
			"description": "An open port on a container",
			"required": [
				"PrivatePort",
				"Type"
			],
			"properties": {
				"IP": {
					"type": "string",
					"format": "ip-address",
					"description": "Host IP address that the container's port is mapped to"
				},
				"PrivatePort": {
					"type": "integer",
					"format": "uint16",
					"x-nullable": false,
					"description": "Port on the container"
				},
				"PublicPort": {
					"type": "integer",
					"format": "uint16",
					"description": "Port exposed on the host"
				},
				"Type": {
					"type": "string",
					"x-nullable": false,
					"enum": [
						"tcp",
						"udp",
						"sctp"
					]
				}
			},
			"example": {
				"PrivatePort": 8080,
				"PublicPort": 80,
				"Type": "tcp"
			}
		},
		"MountPoint": {
			"type": "object",
			"description": "A mount point inside a container",
			"properties": {
				"Type": {
					"type": "string"
				},
				"Name": {
					"type": "string"
				},
				"Source": {
					"type": "string"
				},
				"Destination": {
					"type": "string"
				},
				"Driver": {
					"type": "string"
				},
				"Mode": {
					"type": "string"
				},
				"RW": {
					"type": "boolean"
				},
				"Propagation": {
					"type": "string"
				}
			}
		},
		"DeviceMapping": {
			"type": "object",
			"description": "A device mapping between the host and container",
			"properties": {
				"PathOnHost": {
					"type": "string"
				},
				"PathInContainer": {
					"type": "string"
				},
				"CgroupPermissions": {
					"type": "string"
				}
			},
			"example": {
				"PathOnHost": "/dev/deviceName",
				"PathInContainer": "/dev/deviceName",
				"CgroupPermissions": "mrw"
			}
		},
		"DeviceRequest": {
			"type": "object",
			"description": "A request for devices to be sent to device drivers",
			"properties": {
				"Driver": {
					"type": "string",
					"example": "nvidia"
				},
				"Count": {
					"type": "integer",
					"example": -1
				},
				"DeviceIDs": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"0",
						"1",
						"GPU-fef8089b-4820-abfc-e83e-94318197576e"
					]
				},
				"Capabilities": {
					"description": "A list of capabilities; an OR list of AND lists of capabilities.\n",
					"type": "array",
					"items": {
						"type": "array",
						"items": {
							"type": "string"
						}
					},
					"example": [
						[
							"gpu",
							"nvidia",
							"compute"
						]
					]
				},
				"Options": {
					"description": "Driver-specific options, specified as a key/value pairs. These options\nare passed directly to the driver.\n",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				}
			}
		},
		"ThrottleDevice": {
			"type": "object",
			"properties": {
				"Path": {
					"description": "Device path",
					"type": "string"
				},
				"Rate": {
					"description": "Rate",
					"type": "integer",
					"format": "int64",
					"minimum": 0
				}
			}
		},
		"Mount": {
			"type": "object",
			"properties": {
				"Target": {
					"description": "Container path.",
					"type": "string"
				},
				"Source": {
					"description": "Mount source (e.g. a volume name, a host path).",
					"type": "string"
				},
				"Type": {
					"description": "The mount type. Available types:\n\n- `bind` Mounts a file or directory from the host into the container. Must exist prior to creating the container.\n- `volume` Creates a volume with the given name and options (or uses a pre-existing volume with the same name and options). These are **not** removed when the container is removed.\n- `tmpfs` Create a tmpfs with the given options. The mount source cannot be specified for tmpfs.\n- `npipe` Mounts a named pipe from the host into the container. Must exist prior to creating the container.\n",
					"type": "string",
					"enum": [
						"bind",
						"volume",
						"tmpfs",
						"npipe"
					]
				},
				"ReadOnly": {
					"description": "Whether the mount should be read-only.",
					"type": "boolean"
				},
				"Consistency": {
					"description": "The consistency requirement for the mount: `default`, `consistent`, `cached`, or `delegated`.",
					"type": "string"
				},
				"BindOptions": {
					"description": "Optional configuration for the `bind` type.",
					"type": "object",
					"properties": {
						"Propagation": {
							"description": "A propagation mode with the value `[r]private`, `[r]shared`, or `[r]slave`.",
							"type": "string",
							"enum": [
								"private",
								"rprivate",
								"shared",
								"rshared",
								"slave",
								"rslave"
							]
						},
						"NonRecursive": {
							"description": "Disable recursive bind mount.",
							"type": "boolean",
							"default": false
						}
					}
				},
				"VolumeOptions": {
					"description": "Optional configuration for the `volume` type.",
					"type": "object",
					"properties": {
						"NoCopy": {
							"description": "Populate volume with data from the target.",
							"type": "boolean",
							"default": false
						},
						"Labels": {
							"description": "User-defined key/value metadata.",
							"type": "object",
							"additionalProperties": {
								"type": "string"
							}
						},
						"DriverConfig": {
							"description": "Map of driver specific options",
							"type": "object",
							"properties": {
								"Name": {
									"description": "Name of the driver to use to create the volume.",
									"type": "string"
								},
								"Options": {
									"description": "key/value map of driver specific options.",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								}
							}
						}
					}
				},
				"TmpfsOptions": {
					"description": "Optional configuration for the `tmpfs` type.",
					"type": "object",
					"properties": {
						"SizeBytes": {
							"description": "The size for the tmpfs mount in bytes.",
							"type": "integer",
							"format": "int64"
						},
						"Mode": {
							"description": "The permission mode for the tmpfs mount in an integer.",
							"type": "integer"
						}
					}
				}
			}
		},
		"RestartPolicy": {
			"description": "The behavior to apply when the container exits. The default is not to\nrestart.\n\nAn ever increasing delay (double the previous delay, starting at 100ms) is\nadded before each restart to prevent flooding the server.\n",
			"type": "object",
			"properties": {
				"Name": {
					"type": "string",
					"description": "- Empty string means not to restart\n- `always` Always restart\n- `unless-stopped` Restart always except when the user has manually stopped the container\n- `on-failure` Restart only when the container exit code is non-zero\n",
					"enum": [
						"",
						"always",
						"unless-stopped",
						"on-failure"
					]
				},
				"MaximumRetryCount": {
					"type": "integer",
					"description": "If `on-failure` is used, the number of times to retry before giving up.\n"
				}
			}
		},
		"Resources": {
			"description": "A container's resources (cgroups config, ulimits, etc)",
			"type": "object",
			"properties": {
				"CpuShares": {
					"description": "An integer value representing this container's relative CPU weight\nversus other containers.\n",
					"type": "integer"
				},
				"Memory": {
					"description": "Memory limit in bytes.",
					"type": "integer",
					"format": "int64",
					"default": 0
				},
				"CgroupParent": {
					"description": "Path to `cgroups` under which the container's `cgroup` is created. If\nthe path is not absolute, the path is considered to be relative to the\n`cgroups` path of the init process. Cgroups are created if they do not\nalready exist.\n",
					"type": "string"
				},
				"BlkioWeight": {
					"description": "Block IO weight (relative weight).",
					"type": "integer",
					"minimum": 0,
					"maximum": 1000
				},
				"BlkioWeightDevice": {
					"description": "Block IO weight (relative device weight) in the form:\n\n```\n[{\"Path\": \"device_path\", \"Weight\": weight}]\n```\n",
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"Path": {
								"type": "string"
							},
							"Weight": {
								"type": "integer",
								"minimum": 0
							}
						}
					}
				},
				"BlkioDeviceReadBps": {
					"description": "Limit read rate (bytes per second) from a device, in the form:\n\n```\n[{\"Path\": \"device_path\", \"Rate\": rate}]\n```\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/ThrottleDevice"
					}
				},
				"BlkioDeviceWriteBps": {
					"description": "Limit write rate (bytes per second) to a device, in the form:\n\n```\n[{\"Path\": \"device_path\", \"Rate\": rate}]\n```\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/ThrottleDevice"
					}
				},
				"BlkioDeviceReadIOps": {
					"description": "Limit read rate (IO per second) from a device, in the form:\n\n```\n[{\"Path\": \"device_path\", \"Rate\": rate}]\n```\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/ThrottleDevice"
					}
				},
				"BlkioDeviceWriteIOps": {
					"description": "Limit write rate (IO per second) to a device, in the form:\n\n```\n[{\"Path\": \"device_path\", \"Rate\": rate}]\n```\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/ThrottleDevice"
					}
				},
				"CpuPeriod": {
					"description": "The length of a CPU period in microseconds.",
					"type": "integer",
					"format": "int64"
				},
				"CpuQuota": {
					"description": "Microseconds of CPU time that the container can get in a CPU period.\n",
					"type": "integer",
					"format": "int64"
				},
				"CpuRealtimePeriod": {
					"description": "The length of a CPU real-time period in microseconds. Set to 0 to\nallocate no time allocated to real-time tasks.\n",
					"type": "integer",
					"format": "int64"
				},
				"CpuRealtimeRuntime": {
					"description": "The length of a CPU real-time runtime in microseconds. Set to 0 to\nallocate no time allocated to real-time tasks.\n",
					"type": "integer",
					"format": "int64"
				},
				"CpusetCpus": {
					"description": "CPUs in which to allow execution (e.g., `0-3`, `0,1`).\n",
					"type": "string",
					"example": "0-3"
				},
				"CpusetMems": {
					"description": "Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only\neffective on NUMA systems.\n",
					"type": "string"
				},
				"Devices": {
					"description": "A list of devices to add to the container.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/DeviceMapping"
					}
				},
				"DeviceCgroupRules": {
					"description": "a list of cgroup rules to apply to the container",
					"type": "array",
					"items": {
						"type": "string",
						"example": "c 13:* rwm"
					}
				},
				"DeviceRequests": {
					"description": "A list of requests for devices to be sent to device drivers.\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/DeviceRequest"
					}
				},
				"KernelMemory": {
					"description": "Kernel memory limit in bytes.\n\n<p><br /></p>\n\n> **Deprecated**: This field is deprecated as the kernel 5.4 deprecated\n> `kmem.limit_in_bytes`.\n",
					"type": "integer",
					"format": "int64",
					"example": 209715200
				},
				"KernelMemoryTCP": {
					"description": "Hard limit for kernel TCP buffer memory (in bytes).",
					"type": "integer",
					"format": "int64"
				},
				"MemoryReservation": {
					"description": "Memory soft limit in bytes.",
					"type": "integer",
					"format": "int64"
				},
				"MemorySwap": {
					"description": "Total memory limit (memory + swap). Set as `-1` to enable unlimited\nswap.\n",
					"type": "integer",
					"format": "int64"
				},
				"MemorySwappiness": {
					"description": "Tune a container's memory swappiness behavior. Accepts an integer\nbetween 0 and 100.\n",
					"type": "integer",
					"format": "int64",
					"minimum": 0,
					"maximum": 100
				},
				"NanoCPUs": {
					"description": "CPU quota in units of 10<sup>-9</sup> CPUs.",
					"type": "integer",
					"format": "int64"
				},
				"OomKillDisable": {
					"description": "Disable OOM Killer for the container.",
					"type": "boolean"
				},
				"Init": {
					"description": "Run an init inside the container that forwards signals and reaps\nprocesses. This field is omitted if empty, and the default (as\nconfigured on the daemon) is used.\n",
					"type": "boolean",
					"x-nullable": true
				},
				"PidsLimit": {
					"description": "Tune a container's PIDs limit. Set `0` or `-1` for unlimited, or `null`\nto not change.\n",
					"type": "integer",
					"format": "int64",
					"x-nullable": true
				},
				"Ulimits": {
					"description": "A list of resource limits to set in the container. For example:\n\n```\n{\"Name\": \"nofile\", \"Soft\": 1024, \"Hard\": 2048}\n```\n",
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"Name": {
								"description": "Name of ulimit",
								"type": "string"
							},
							"Soft": {
								"description": "Soft limit",
								"type": "integer"
							},
							"Hard": {
								"description": "Hard limit",
								"type": "integer"
							}
						}
					}
				},
				"CpuCount": {
					"description": "The number of usable CPUs (Windows only).\n\nOn Windows Server containers, the processor resource controls are\nmutually exclusive. The order of precedence is `CPUCount` first, then\n`CPUShares`, and `CPUPercent` last.\n",
					"type": "integer",
					"format": "int64"
				},
				"CpuPercent": {
					"description": "The usable percentage of the available CPUs (Windows only).\n\nOn Windows Server containers, the processor resource controls are\nmutually exclusive. The order of precedence is `CPUCount` first, then\n`CPUShares`, and `CPUPercent` last.\n",
					"type": "integer",
					"format": "int64"
				},
				"IOMaximumIOps": {
					"description": "Maximum IOps for the container system drive (Windows only)",
					"type": "integer",
					"format": "int64"
				},
				"IOMaximumBandwidth": {
					"description": "Maximum IO in bytes per second for the container system drive\n(Windows only).\n",
					"type": "integer",
					"format": "int64"
				}
			}
		},
		"Limit": {
			"description": "An object describing a limit on resources which can be requested by a task.\n",
			"type": "object",
			"properties": {
				"NanoCPUs": {
					"type": "integer",
					"format": "int64",
					"example": 4000000000
				},
				"MemoryBytes": {
					"type": "integer",
					"format": "int64",
					"example": 8272408576
				},
				"Pids": {
					"description": "Limits the maximum number of PIDs in the container. Set `0` for unlimited.\n",
					"type": "integer",
					"format": "int64",
					"default": 0,
					"example": 100
				}
			}
		},
		"ResourceObject": {
			"description": "An object describing the resources which can be advertised by a node and\nrequested by a task.\n",
			"type": "object",
			"properties": {
				"NanoCPUs": {
					"type": "integer",
					"format": "int64",
					"example": 4000000000
				},
				"MemoryBytes": {
					"type": "integer",
					"format": "int64",
					"example": 8272408576
				},
				"GenericResources": {
					"$ref": "#/definitions/GenericResources"
				}
			}
		},
		"GenericResources": {
			"description": "User-defined resources can be either Integer resources (e.g, `SSD=3`) or\nString resources (e.g, `GPU=UUID1`).\n",
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"NamedResourceSpec": {
						"type": "object",
						"properties": {
							"Kind": {
								"type": "string"
							},
							"Value": {
								"type": "string"
							}
						}
					},
					"DiscreteResourceSpec": {
						"type": "object",
						"properties": {
							"Kind": {
								"type": "string"
							},
							"Value": {
								"type": "integer",
								"format": "int64"
							}
						}
					}
				}
			},
			"example": [
				{
					"DiscreteResourceSpec": {
						"Kind": "SSD",
						"Value": 3
					}
				},
				{
					"NamedResourceSpec": {
						"Kind": "GPU",
						"Value": "UUID1"
					}
				},
				{
					"NamedResourceSpec": {
						"Kind": "GPU",
						"Value": "UUID2"
					}
				}
			]
		},
		"HealthConfig": {
			"description": "A test to perform to check that the container is healthy.",
			"type": "object",
			"properties": {
				"Test": {
					"description": "The test to perform. Possible values are:\n\n- `[]` inherit healthcheck from image or parent image\n- `[\"NONE\"]` disable healthcheck\n- `[\"CMD\", args...]` exec arguments directly\n- `[\"CMD-SHELL\", command]` run command with system's default shell\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Interval": {
					"description": "The time to wait between checks in nanoseconds. It should be 0 or at\nleast 1000000 (1 ms). 0 means inherit.\n",
					"type": "integer"
				},
				"Timeout": {
					"description": "The time to wait before considering the check to have hung. It should\nbe 0 or at least 1000000 (1 ms). 0 means inherit.\n",
					"type": "integer"
				},
				"Retries": {
					"description": "The number of consecutive failures needed to consider a container as\nunhealthy. 0 means inherit.\n",
					"type": "integer"
				},
				"StartPeriod": {
					"description": "Start period for the container to initialize before starting\nhealth-retries countdown in nanoseconds. It should be 0 or at least\n1000000 (1 ms). 0 means inherit.\n",
					"type": "integer"
				}
			}
		},
		"Health": {
			"description": "Health stores information about the container's healthcheck results.\n",
			"type": "object",
			"properties": {
				"Status": {
					"description": "Status is one of `none`, `starting`, `healthy` or `unhealthy`\n\n- \"none\"      Indicates there is no healthcheck\n- \"starting\"  Starting indicates that the container is not yet ready\n- \"healthy\"   Healthy indicates that the container is running correctly\n- \"unhealthy\" Unhealthy indicates that the container has a problem\n",
					"type": "string",
					"enum": [
						"none",
						"starting",
						"healthy",
						"unhealthy"
					],
					"example": "healthy"
				},
				"FailingStreak": {
					"description": "FailingStreak is the number of consecutive failures",
					"type": "integer",
					"example": 0
				},
				"Log": {
					"type": "array",
					"description": "Log contains the last few results (oldest first)\n",
					"items": {
						"x-nullable": true,
						"$ref": "#/definitions/HealthcheckResult"
					}
				}
			}
		},
		"HealthcheckResult": {
			"description": "HealthcheckResult stores information about a single run of a healthcheck probe\n",
			"type": "object",
			"properties": {
				"Start": {
					"description": "Date and time at which this check started in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "date-time",
					"example": "2020-01-04T10:44:24.496525531Z"
				},
				"End": {
					"description": "Date and time at which this check ended in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2020-01-04T10:45:21.364524523Z"
				},
				"ExitCode": {
					"description": "ExitCode meanings:\n\n- `0` healthy\n- `1` unhealthy\n- `2` reserved (considered unhealthy)\n- other values: error running probe\n",
					"type": "integer",
					"example": 0
				},
				"Output": {
					"description": "Output from last check",
					"type": "string"
				}
			}
		},
		"HostConfig": {
			"description": "Container configuration that depends on the host we are running on",
			"allOf": [
				{
					"$ref": "#/definitions/Resources"
				},
				{
					"type": "object",
					"properties": {
						"Binds": {
							"type": "array",
							"description": "A list of volume bindings for this container. Each volume binding\nis a string in one of these forms:\n\n- `host-src:container-dest[:options]` to bind-mount a host path\n  into the container. Both `host-src`, and `container-dest` must\n  be an _absolute_ path.\n- `volume-name:container-dest[:options]` to bind-mount a volume\n  managed by a volume driver into the container. `container-dest`\n  must be an _absolute_ path.\n\n`options` is an optional, comma-delimited list of:\n\n- `nocopy` disables automatic copying of data from the container\n  path to the volume. The `nocopy` flag only applies to named volumes.\n- `[ro|rw]` mounts a volume read-only or read-write, respectively.\n  If omitted or set to `rw`, volumes are mounted read-write.\n- `[z|Z]` applies SELinux labels to allow or deny multiple containers\n  to read and write to the same volume.\n    - `z`: a _shared_ content label is applied to the content. This\n      label indicates that multiple containers can share the volume\n      content, for both reading and writing.\n    - `Z`: a _private unshared_ label is applied to the content.\n      This label indicates that only the current container can use\n      a private volume. Labeling systems such as SELinux require\n      proper labels to be placed on volume content that is mounted\n      into a container. Without a label, the security system can\n      prevent a container's processes from using the content. By\n      default, the labels set by the host operating system are not\n      modified.\n- `[[r]shared|[r]slave|[r]private]` specifies mount\n  [propagation behavior](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt).\n  This only applies to bind-mounted volumes, not internal volumes\n  or named volumes. Mount propagation requires the source mount\n  point (the location where the source directory is mounted in the\n  host operating system) to have the correct propagation properties.\n  For shared volumes, the source mount point must be set to `shared`.\n  For slave volumes, the mount must be set to either `shared` or\n  `slave`.\n",
							"items": {
								"type": "string"
							}
						},
						"ContainerIDFile": {
							"type": "string",
							"description": "Path to a file where the container ID is written"
						},
						"LogConfig": {
							"type": "object",
							"description": "The logging configuration for this container",
							"properties": {
								"Type": {
									"type": "string",
									"enum": [
										"json-file",
										"syslog",
										"journald",
										"gelf",
										"fluentd",
										"awslogs",
										"splunk",
										"etwlogs",
										"none"
									]
								},
								"Config": {
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								}
							}
						},
						"NetworkMode": {
							"type": "string",
							"description": "Network mode to use for this container. Supported standard values\nare: `bridge`, `host`, `none`, and `container:<name|id>`. Any\nother value is taken as a custom network's name to which this\ncontainer should connect to.\n"
						},
						"PortBindings": {
							"$ref": "#/definitions/PortMap"
						},
						"RestartPolicy": {
							"$ref": "#/definitions/RestartPolicy"
						},
						"AutoRemove": {
							"type": "boolean",
							"description": "Automatically remove the container when the container's process\nexits. This has no effect if `RestartPolicy` is set.\n"
						},
						"VolumeDriver": {
							"type": "string",
							"description": "Driver that this container uses to mount volumes."
						},
						"VolumesFrom": {
							"type": "array",
							"description": "A list of volumes to inherit from another container, specified in\nthe form `<container name>[:<ro|rw>]`.\n",
							"items": {
								"type": "string"
							}
						},
						"Mounts": {
							"description": "Specification for mounts to be added to the container.\n",
							"type": "array",
							"items": {
								"$ref": "#/definitions/Mount"
							}
						},
						"CapAdd": {
							"type": "array",
							"description": "A list of kernel capabilities to add to the container. Conflicts\nwith option 'Capabilities'.\n",
							"items": {
								"type": "string"
							}
						},
						"CapDrop": {
							"type": "array",
							"description": "A list of kernel capabilities to drop from the container. Conflicts\nwith option 'Capabilities'.\n",
							"items": {
								"type": "string"
							}
						},
						"CgroupnsMode": {
							"type": "string",
							"enum": [
								"private",
								"host"
							],
							"description": "cgroup namespace mode for the container. Possible values are:\n\n- `\"private\"`: the container runs in its own private cgroup namespace\n- `\"host\"`: use the host system's cgroup namespace\n\nIf not specified, the daemon default is used, which can either be `\"private\"`\nor `\"host\"`, depending on daemon version, kernel support and configuration.\n"
						},
						"Dns": {
							"type": "array",
							"description": "A list of DNS servers for the container to use.",
							"items": {
								"type": "string"
							}
						},
						"DnsOptions": {
							"type": "array",
							"description": "A list of DNS options.",
							"items": {
								"type": "string"
							}
						},
						"DnsSearch": {
							"type": "array",
							"description": "A list of DNS search domains.",
							"items": {
								"type": "string"
							}
						},
						"ExtraHosts": {
							"type": "array",
							"description": "A list of hostnames/IP mappings to add to the container's `/etc/hosts`\nfile. Specified in the form `[\"hostname:IP\"]`.\n",
							"items": {
								"type": "string"
							}
						},
						"GroupAdd": {
							"type": "array",
							"description": "A list of additional groups that the container process will run as.\n",
							"items": {
								"type": "string"
							}
						},
						"IpcMode": {
							"type": "string",
							"description": "IPC sharing mode for the container. Possible values are:\n\n- `\"none\"`: own private IPC namespace, with /dev/shm not mounted\n- `\"private\"`: own private IPC namespace\n- `\"shareable\"`: own private IPC namespace, with a possibility to share it with other containers\n- `\"container:<name|id>\"`: join another (shareable) container's IPC namespace\n- `\"host\"`: use the host system's IPC namespace\n\nIf not specified, daemon default is used, which can either be `\"private\"`\nor `\"shareable\"`, depending on daemon version and configuration.\n"
						},
						"Cgroup": {
							"type": "string",
							"description": "Cgroup to use for the container."
						},
						"Links": {
							"type": "array",
							"description": "A list of links for the container in the form `container_name:alias`.\n",
							"items": {
								"type": "string"
							}
						},
						"OomScoreAdj": {
							"type": "integer",
							"description": "An integer value containing the score given to the container in\norder to tune OOM killer preferences.\n",
							"example": 500
						},
						"PidMode": {
							"type": "string",
							"description": "Set the PID (Process) Namespace mode for the container. It can be\neither:\n\n- `\"container:<name|id>\"`: joins another container's PID namespace\n- `\"host\"`: use the host's PID namespace inside the container\n"
						},
						"Privileged": {
							"type": "boolean",
							"description": "Gives the container full access to the host."
						},
						"PublishAllPorts": {
							"type": "boolean",
							"description": "Allocates an ephemeral host port for all of a container's\nexposed ports.\n\nPorts are de-allocated when the container stops and allocated when\nthe container starts. The allocated port might be changed when\nrestarting the container.\n\nThe port is selected from the ephemeral port range that depends on\nthe kernel. For example, on Linux the range is defined by\n`/proc/sys/net/ipv4/ip_local_port_range`.\n"
						},
						"ReadonlyRootfs": {
							"type": "boolean",
							"description": "Mount the container's root filesystem as read only."
						},
						"SecurityOpt": {
							"type": "array",
							"description": "A list of string values to customize labels for MLS systems, such as SELinux.",
							"items": {
								"type": "string"
							}
						},
						"StorageOpt": {
							"type": "object",
							"description": "Storage driver options for this container, in the form `{\"size\": \"120G\"}`.\n",
							"additionalProperties": {
								"type": "string"
							}
						},
						"Tmpfs": {
							"type": "object",
							"description": "A map of container directories which should be replaced by tmpfs\nmounts, and their corresponding mount options. For example:\n\n```\n{ \"/run\": \"rw,noexec,nosuid,size=65536k\" }\n```\n",
							"additionalProperties": {
								"type": "string"
							}
						},
						"UTSMode": {
							"type": "string",
							"description": "UTS namespace to use for the container."
						},
						"UsernsMode": {
							"type": "string",
							"description": "Sets the usernamespace mode for the container when usernamespace\nremapping option is enabled.\n"
						},
						"ShmSize": {
							"type": "integer",
							"description": "Size of `/dev/shm` in bytes. If omitted, the system uses 64MB.\n",
							"minimum": 0
						},
						"Sysctls": {
							"type": "object",
							"description": "A list of kernel parameters (sysctls) to set in the container.\nFor example:\n\n```\n{\"net.ipv4.ip_forward\": \"1\"}\n```\n",
							"additionalProperties": {
								"type": "string"
							}
						},
						"Runtime": {
							"type": "string",
							"description": "Runtime to use with this container."
						},
						"ConsoleSize": {
							"type": "array",
							"description": "Initial console size, as an `[height, width]` array. (Windows only)\n",
							"minItems": 2,
							"maxItems": 2,
							"items": {
								"type": "integer",
								"minimum": 0
							}
						},
						"Isolation": {
							"type": "string",
							"description": "Isolation technology of the container. (Windows only)\n",
							"enum": [
								"default",
								"process",
								"hyperv"
							]
						},
						"MaskedPaths": {
							"type": "array",
							"description": "The list of paths to be masked inside the container (this overrides\nthe default set of paths).\n",
							"items": {
								"type": "string"
							}
						},
						"ReadonlyPaths": {
							"type": "array",
							"description": "The list of paths to be set as read-only inside the container\n(this overrides the default set of paths).\n",
							"items": {
								"type": "string"
							}
						}
					}
				}
			]
		},
		"ContainerConfig": {
			"description": "Configuration for a container that is portable between hosts",
			"type": "object",
			"properties": {
				"Hostname": {
					"description": "The hostname to use for the container, as a valid RFC 1123 hostname.",
					"type": "string"
				},
				"Domainname": {
					"description": "The domain name to use for the container.",
					"type": "string"
				},
				"User": {
					"description": "The user that commands are run as inside the container.",
					"type": "string"
				},
				"AttachStdin": {
					"description": "Whether to attach to `stdin`.",
					"type": "boolean",
					"default": false
				},
				"AttachStdout": {
					"description": "Whether to attach to `stdout`.",
					"type": "boolean",
					"default": true
				},
				"AttachStderr": {
					"description": "Whether to attach to `stderr`.",
					"type": "boolean",
					"default": true
				},
				"ExposedPorts": {
					"description": "An object mapping ports to an empty object in the form:\n\n`{\"<port>/<tcp|udp|sctp>\": {}}`\n",
					"type": "object",
					"additionalProperties": {
						"type": "object",
						"enum": [
							{}
						],
						"default": {}
					}
				},
				"Tty": {
					"description": "Attach standard streams to a TTY, including `stdin` if it is not closed.\n",
					"type": "boolean",
					"default": false
				},
				"OpenStdin": {
					"description": "Open `stdin`",
					"type": "boolean",
					"default": false
				},
				"StdinOnce": {
					"description": "Close `stdin` after one attached client disconnects",
					"type": "boolean",
					"default": false
				},
				"Env": {
					"description": "A list of environment variables to set inside the container in the\nform `[\"VAR=value\", ...]`. A variable without `=` is removed from the\nenvironment, rather than to have an empty value.\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Cmd": {
					"description": "Command to run specified as a string or an array of strings.\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Healthcheck": {
					"$ref": "#/definitions/HealthConfig"
				},
				"ArgsEscaped": {
					"description": "Command is already escaped (Windows only)",
					"type": "boolean"
				},
				"Image": {
					"description": "The name of the image to use when creating the container/\n",
					"type": "string"
				},
				"Volumes": {
					"description": "An object mapping mount point paths inside the container to empty\nobjects.\n",
					"type": "object",
					"additionalProperties": {
						"type": "object",
						"enum": [
							{}
						],
						"default": {}
					}
				},
				"WorkingDir": {
					"description": "The working directory for commands to run in.",
					"type": "string"
				},
				"Entrypoint": {
					"description": "The entry point for the container as a string or an array of strings.\n\nIf the array consists of exactly one empty string (`[\"\"]`) then the\nentry point is reset to system default (i.e., the entry point used by\ndocker when there is no `ENTRYPOINT` instruction in the `Dockerfile`).\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"NetworkDisabled": {
					"description": "Disable networking for the container.",
					"type": "boolean"
				},
				"MacAddress": {
					"description": "MAC address of the container.",
					"type": "string"
				},
				"OnBuild": {
					"description": "`ONBUILD` metadata that were defined in the image's `Dockerfile`.\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"StopSignal": {
					"description": "Signal to stop a container as a string or unsigned integer.\n",
					"type": "string",
					"default": "SIGTERM"
				},
				"StopTimeout": {
					"description": "Timeout to stop a container in seconds.",
					"type": "integer",
					"default": 10
				},
				"Shell": {
					"description": "Shell for when `RUN`, `CMD`, and `ENTRYPOINT` uses a shell.\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				}
			}
		},
		"NetworkingConfig": {
			"description": "NetworkingConfig represents the container's networking configuration for\neach of its interfaces.\nIt is used for the networking configs specified in the `docker create`\nand `docker network connect` commands.\n",
			"type": "object",
			"properties": {
				"EndpointsConfig": {
					"description": "A mapping of network name to endpoint configuration for that network.\n",
					"type": "object",
					"additionalProperties": {
						"$ref": "#/definitions/EndpointSettings"
					}
				}
			},
			"example": {
				"EndpointsConfig": {
					"isolated_nw": {
						"IPAMConfig": {
							"IPv4Address": "172.20.30.33",
							"IPv6Address": "2001:db8:abcd::3033",
							"LinkLocalIPs": [
								"169.254.34.68",
								"fe80::3468"
							]
						},
						"Links": [
							"container_1",
							"container_2"
						],
						"Aliases": [
							"server_x",
							"server_y"
						]
					}
				}
			}
		},
		"NetworkSettings": {
			"description": "NetworkSettings exposes the network settings in the API",
			"type": "object",
			"properties": {
				"Bridge": {
					"description": "Name of the network'a bridge (for example, `docker0`).",
					"type": "string",
					"example": "docker0"
				},
				"SandboxID": {
					"description": "SandboxID uniquely represents a container's network stack.",
					"type": "string",
					"example": "9d12daf2c33f5959c8bf90aa513e4f65b561738661003029ec84830cd503a0c3"
				},
				"HairpinMode": {
					"description": "Indicates if hairpin NAT should be enabled on the virtual interface.\n",
					"type": "boolean",
					"example": false
				},
				"LinkLocalIPv6Address": {
					"description": "IPv6 unicast address using the link-local prefix.",
					"type": "string",
					"example": "fe80::42:acff:fe11:1"
				},
				"LinkLocalIPv6PrefixLen": {
					"description": "Prefix length of the IPv6 unicast address.",
					"type": "integer",
					"example": "64"
				},
				"Ports": {
					"$ref": "#/definitions/PortMap"
				},
				"SandboxKey": {
					"description": "SandboxKey identifies the sandbox",
					"type": "string",
					"example": "/var/run/docker/netns/8ab54b426c38"
				},
				"SecondaryIPAddresses": {
					"description": "",
					"type": "array",
					"items": {
						"$ref": "#/definitions/Address"
					},
					"x-nullable": true
				},
				"SecondaryIPv6Addresses": {
					"description": "",
					"type": "array",
					"items": {
						"$ref": "#/definitions/Address"
					},
					"x-nullable": true
				},
				"EndpointID": {
					"description": "EndpointID uniquely represents a service endpoint in a Sandbox.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "b88f5b905aabf2893f3cbc4ee42d1ea7980bbc0a92e2c8922b1e1795298afb0b"
				},
				"Gateway": {
					"description": "Gateway address for the default \"bridge\" network.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "172.17.0.1"
				},
				"GlobalIPv6Address": {
					"description": "Global IPv6 address for the default \"bridge\" network.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "2001:db8::5689"
				},
				"GlobalIPv6PrefixLen": {
					"description": "Mask length of the global IPv6 address.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "integer",
					"example": 64
				},
				"IPAddress": {
					"description": "IPv4 address for the default \"bridge\" network.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "172.17.0.4"
				},
				"IPPrefixLen": {
					"description": "Mask length of the IPv4 address.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "integer",
					"example": 16
				},
				"IPv6Gateway": {
					"description": "IPv6 gateway address for this network.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "2001:db8:2::100"
				},
				"MacAddress": {
					"description": "MAC address for the container on the default \"bridge\" network.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when attached to the\n> default \"bridge\" network. Use the information from the \"bridge\"\n> network inside the `Networks` map instead, which contains the same\n> information. This field was deprecated in Docker 1.9 and is scheduled\n> to be removed in Docker 17.12.0\n",
					"type": "string",
					"example": "02:42:ac:11:00:04"
				},
				"Networks": {
					"description": "Information about all networks that the container is connected to.\n",
					"type": "object",
					"additionalProperties": {
						"$ref": "#/definitions/EndpointSettings"
					}
				}
			}
		},
		"Address": {
			"description": "Address represents an IPv4 or IPv6 IP address.",
			"type": "object",
			"properties": {
				"Addr": {
					"description": "IP address.",
					"type": "string"
				},
				"PrefixLen": {
					"description": "Mask length of the IP address.",
					"type": "integer"
				}
			}
		},
		"PortMap": {
			"description": "PortMap describes the mapping of container ports to host ports, using the\ncontainer's port-number and protocol as key in the format `<port>/<protocol>`,\nfor example, `80/udp`.\n\nIf a container's port is mapped for multiple protocols, separate entries\nare added to the mapping table.\n",
			"type": "object",
			"additionalProperties": {
				"type": "array",
				"x-nullable": true,
				"items": {
					"$ref": "#/definitions/PortBinding"
				}
			},
			"example": {
				"443/tcp": [
					{
						"HostIp": "127.0.0.1",
						"HostPort": "4443"
					}
				],
				"80/tcp": [
					{
						"HostIp": "0.0.0.0",
						"HostPort": "80"
					},
					{
						"HostIp": "0.0.0.0",
						"HostPort": "8080"
					}
				],
				"80/udp": [
					{
						"HostIp": "0.0.0.0",
						"HostPort": "80"
					}
				],
				"53/udp": [
					{
						"HostIp": "0.0.0.0",
						"HostPort": "53"
					}
				],
				"2377/tcp": null
			}
		},
		"PortBinding": {
			"description": "PortBinding represents a binding between a host IP address and a host\nport.\n",
			"type": "object",
			"properties": {
				"HostIp": {
					"description": "Host IP address that the container's port is mapped to.",
					"type": "string",
					"example": "127.0.0.1"
				},
				"HostPort": {
					"description": "Host port number that the container's port is mapped to.",
					"type": "string",
					"example": "4443"
				}
			}
		},
		"GraphDriverData": {
			"description": "Information about a container's graph driver.",
			"type": "object",
			"required": [
				"Name",
				"Data"
			],
			"properties": {
				"Name": {
					"type": "string",
					"x-nullable": false
				},
				"Data": {
					"type": "object",
					"x-nullable": false,
					"additionalProperties": {
						"type": "string"
					}
				}
			}
		},
		"Image": {
			"type": "object",
			"required": [
				"Id",
				"Parent",
				"Comment",
				"Created",
				"Container",
				"DockerVersion",
				"Author",
				"Architecture",
				"Os",
				"Size",
				"VirtualSize",
				"GraphDriver",
				"RootFS"
			],
			"properties": {
				"Id": {
					"type": "string",
					"x-nullable": false
				},
				"RepoTags": {
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"RepoDigests": {
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Parent": {
					"type": "string",
					"x-nullable": false
				},
				"Comment": {
					"type": "string",
					"x-nullable": false
				},
				"Created": {
					"type": "string",
					"x-nullable": false
				},
				"Container": {
					"type": "string",
					"x-nullable": false
				},
				"ContainerConfig": {
					"$ref": "#/definitions/ContainerConfig"
				},
				"DockerVersion": {
					"type": "string",
					"x-nullable": false
				},
				"Author": {
					"type": "string",
					"x-nullable": false
				},
				"Config": {
					"$ref": "#/definitions/ContainerConfig"
				},
				"Architecture": {
					"type": "string",
					"x-nullable": false
				},
				"Os": {
					"type": "string",
					"x-nullable": false
				},
				"OsVersion": {
					"type": "string"
				},
				"Size": {
					"type": "integer",
					"format": "int64",
					"x-nullable": false
				},
				"VirtualSize": {
					"type": "integer",
					"format": "int64",
					"x-nullable": false
				},
				"GraphDriver": {
					"$ref": "#/definitions/GraphDriverData"
				},
				"RootFS": {
					"type": "object",
					"required": [
						"Type"
					],
					"properties": {
						"Type": {
							"type": "string",
							"x-nullable": false
						},
						"Layers": {
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						"BaseLayer": {
							"type": "string"
						}
					}
				},
				"Metadata": {
					"type": "object",
					"properties": {
						"LastTagTime": {
							"type": "string",
							"format": "dateTime"
						}
					}
				}
			}
		},
		"ImageSummary": {
			"type": "object",
			"required": [
				"Id",
				"ParentId",
				"RepoTags",
				"RepoDigests",
				"Created",
				"Size",
				"SharedSize",
				"VirtualSize",
				"Labels",
				"Containers"
			],
			"properties": {
				"Id": {
					"type": "string",
					"x-nullable": false
				},
				"ParentId": {
					"type": "string",
					"x-nullable": false
				},
				"RepoTags": {
					"type": "array",
					"x-nullable": false,
					"items": {
						"type": "string"
					}
				},
				"RepoDigests": {
					"type": "array",
					"x-nullable": false,
					"items": {
						"type": "string"
					}
				},
				"Created": {
					"type": "integer",
					"x-nullable": false
				},
				"Size": {
					"type": "integer",
					"x-nullable": false
				},
				"SharedSize": {
					"type": "integer",
					"x-nullable": false
				},
				"VirtualSize": {
					"type": "integer",
					"x-nullable": false
				},
				"Labels": {
					"type": "object",
					"x-nullable": false,
					"additionalProperties": {
						"type": "string"
					}
				},
				"Containers": {
					"x-nullable": false,
					"type": "integer"
				}
			}
		},
		"AuthConfig": {
			"type": "object",
			"properties": {
				"username": {
					"type": "string"
				},
				"password": {
					"type": "string"
				},
				"email": {
					"type": "string"
				},
				"serveraddress": {
					"type": "string"
				}
			},
			"example": {
				"username": "hannibal",
				"password": "xxxx",
				"serveraddress": "https://index.docker.io/v1/"
			}
		},
		"ProcessConfig": {
			"type": "object",
			"properties": {
				"privileged": {
					"type": "boolean"
				},
				"user": {
					"type": "string"
				},
				"tty": {
					"type": "boolean"
				},
				"entrypoint": {
					"type": "string"
				},
				"arguments": {
					"type": "array",
					"items": {
						"type": "string"
					}
				}
			}
		},
		"Volume": {
			"type": "object",
			"required": [
				"Name",
				"Driver",
				"Mountpoint",
				"Labels",
				"Scope",
				"Options"
			],
			"properties": {
				"Name": {
					"type": "string",
					"description": "Name of the volume.",
					"x-nullable": false
				},
				"Driver": {
					"type": "string",
					"description": "Name of the volume driver used by the volume.",
					"x-nullable": false
				},
				"Mountpoint": {
					"type": "string",
					"description": "Mount path of the volume on the host.",
					"x-nullable": false
				},
				"CreatedAt": {
					"type": "string",
					"format": "dateTime",
					"description": "Date/Time the volume was created."
				},
				"Status": {
					"type": "object",
					"description": "Low-level details about the volume, provided by the volume driver.\nDetails are returned as a map with key/value pairs:\n`{\"key\":\"value\",\"key2\":\"value2\"}`.\n\nThe `Status` field is optional, and is omitted if the volume driver\ndoes not support this feature.\n",
					"additionalProperties": {
						"type": "object"
					}
				},
				"Labels": {
					"type": "object",
					"description": "User-defined key/value metadata.",
					"x-nullable": false,
					"additionalProperties": {
						"type": "string"
					}
				},
				"Scope": {
					"type": "string",
					"description": "The level at which the volume exists. Either `global` for cluster-wide,\nor `local` for machine level.\n",
					"default": "local",
					"x-nullable": false,
					"enum": [
						"local",
						"global"
					]
				},
				"Options": {
					"type": "object",
					"description": "The driver specific options used when creating the volume.\n",
					"additionalProperties": {
						"type": "string"
					}
				},
				"UsageData": {
					"type": "object",
					"x-nullable": true,
					"required": [
						"Size",
						"RefCount"
					],
					"description": "Usage details about the volume. This information is used by the\n`GET /system/df` endpoint, and omitted in other endpoints.\n",
					"properties": {
						"Size": {
							"type": "integer",
							"default": -1,
							"description": "Amount of disk space used by the volume (in bytes). This information\nis only available for volumes created with the `\"local\"` volume\ndriver. For volumes created with other volume drivers, this field\nis set to `-1` (\"not available\")\n",
							"x-nullable": false
						},
						"RefCount": {
							"type": "integer",
							"default": -1,
							"description": "The number of containers referencing this volume. This field\nis set to `-1` if the reference-count is not available.\n",
							"x-nullable": false
						}
					}
				}
			},
			"example": {
				"Name": "tardis",
				"Driver": "custom",
				"Mountpoint": "/var/lib/docker/volumes/tardis",
				"Status": {
					"hello": "world"
				},
				"Labels": {
					"com.example.some-label": "some-value",
					"com.example.some-other-label": "some-other-value"
				},
				"Scope": "local",
				"CreatedAt": "2016-06-07T20:31:11.853781916Z"
			}
		},
		"Network": {
			"type": "object",
			"properties": {
				"Name": {
					"type": "string"
				},
				"Id": {
					"type": "string"
				},
				"Created": {
					"type": "string",
					"format": "dateTime"
				},
				"Scope": {
					"type": "string"
				},
				"Driver": {
					"type": "string"
				},
				"EnableIPv6": {
					"type": "boolean"
				},
				"IPAM": {
					"$ref": "#/definitions/IPAM"
				},
				"Internal": {
					"type": "boolean"
				},
				"Attachable": {
					"type": "boolean"
				},
				"Ingress": {
					"type": "boolean"
				},
				"Containers": {
					"type": "object",
					"additionalProperties": {
						"$ref": "#/definitions/NetworkContainer"
					}
				},
				"Options": {
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"Labels": {
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				}
			},
			"example": {
				"Name": "net01",
				"Id": "7d86d31b1478e7cca9ebed7e73aa0fdeec46c5ca29497431d3007d2d9e15ed99",
				"Created": "2016-10-19T04:33:30.360899459Z",
				"Scope": "local",
				"Driver": "bridge",
				"EnableIPv6": false,
				"IPAM": {
					"Driver": "default",
					"Config": [
						{
							"Subnet": "172.19.0.0/16",
							"Gateway": "172.19.0.1"
						}
					],
					"Options": {
						"foo": "bar"
					}
				},
				"Internal": false,
				"Attachable": false,
				"Ingress": false,
				"Containers": {
					"19a4d5d687db25203351ed79d478946f861258f018fe384f229f2efa4b23513c": {
						"Name": "test",
						"EndpointID": "628cadb8bcb92de107b2a1e516cbffe463e321f548feb37697cce00ad694f21a",
						"MacAddress": "02:42:ac:13:00:02",
						"IPv4Address": "172.19.0.2/16",
						"IPv6Address": ""
					}
				},
				"Options": {
					"com.docker.network.bridge.default_bridge": "true",
					"com.docker.network.bridge.enable_icc": "true",
					"com.docker.network.bridge.enable_ip_masquerade": "true",
					"com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
					"com.docker.network.bridge.name": "docker0",
					"com.docker.network.driver.mtu": "1500"
				},
				"Labels": {
					"com.example.some-label": "some-value",
					"com.example.some-other-label": "some-other-value"
				}
			}
		},
		"IPAM": {
			"type": "object",
			"properties": {
				"Driver": {
					"description": "Name of the IPAM driver to use.",
					"type": "string",
					"default": "default"
				},
				"Config": {
					"description": "List of IPAM configuration options, specified as a map:\n\n```\n{\"Subnet\": <CIDR>, \"IPRange\": <CIDR>, \"Gateway\": <IP address>, \"AuxAddress\": <device_name:IP address>}\n```\n",
					"type": "array",
					"items": {
						"type": "object",
						"additionalProperties": {
							"type": "string"
						}
					}
				},
				"Options": {
					"description": "Driver-specific options, specified as a map.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				}
			}
		},
		"NetworkContainer": {
			"type": "object",
			"properties": {
				"Name": {
					"type": "string"
				},
				"EndpointID": {
					"type": "string"
				},
				"MacAddress": {
					"type": "string"
				},
				"IPv4Address": {
					"type": "string"
				},
				"IPv6Address": {
					"type": "string"
				}
			}
		},
		"BuildInfo": {
			"type": "object",
			"properties": {
				"id": {
					"type": "string"
				},
				"stream": {
					"type": "string"
				},
				"error": {
					"type": "string"
				},
				"errorDetail": {
					"$ref": "#/definitions/ErrorDetail"
				},
				"status": {
					"type": "string"
				},
				"progress": {
					"type": "string"
				},
				"progressDetail": {
					"$ref": "#/definitions/ProgressDetail"
				},
				"aux": {
					"$ref": "#/definitions/ImageID"
				}
			}
		},
		"BuildCache": {
			"type": "object",
			"properties": {
				"ID": {
					"type": "string"
				},
				"Parent": {
					"type": "string"
				},
				"Type": {
					"type": "string"
				},
				"Description": {
					"type": "string"
				},
				"InUse": {
					"type": "boolean"
				},
				"Shared": {
					"type": "boolean"
				},
				"Size": {
					"description": "Amount of disk space used by the build cache (in bytes).\n",
					"type": "integer"
				},
				"CreatedAt": {
					"description": "Date and time at which the build cache was created in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2016-08-18T10:44:24.496525531Z"
				},
				"LastUsedAt": {
					"description": "Date and time at which the build cache was last used in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"x-nullable": true,
					"example": "2017-08-09T07:09:37.632105588Z"
				},
				"UsageCount": {
					"type": "integer"
				}
			}
		},
		"ImageID": {
			"type": "object",
			"description": "Image ID or Digest",
			"properties": {
				"ID": {
					"type": "string"
				}
			},
			"example": {
				"ID": "sha256:85f05633ddc1c50679be2b16a0479ab6f7637f8884e0cfe0f4d20e1ebb3d6e7c"
			}
		},
		"CreateImageInfo": {
			"type": "object",
			"properties": {
				"id": {
					"type": "string"
				},
				"error": {
					"type": "string"
				},
				"status": {
					"type": "string"
				},
				"progress": {
					"type": "string"
				},
				"progressDetail": {
					"$ref": "#/definitions/ProgressDetail"
				}
			}
		},
		"PushImageInfo": {
			"type": "object",
			"properties": {
				"error": {
					"type": "string"
				},
				"status": {
					"type": "string"
				},
				"progress": {
					"type": "string"
				},
				"progressDetail": {
					"$ref": "#/definitions/ProgressDetail"
				}
			}
		},
		"ErrorDetail": {
			"type": "object",
			"properties": {
				"code": {
					"type": "integer"
				},
				"message": {
					"type": "string"
				}
			}
		},
		"ProgressDetail": {
			"type": "object",
			"properties": {
				"current": {
					"type": "integer"
				},
				"total": {
					"type": "integer"
				}
			}
		},
		"ErrorResponse": {
			"description": "Represents an error.",
			"type": "object",
			"required": [
				"message"
			],
			"properties": {
				"message": {
					"description": "The error message.",
					"type": "string",
					"x-nullable": false
				}
			},
			"example": {
				"message": "Something went wrong."
			}
		},
		"IdResponse": {
			"description": "Response to an API call that returns just an Id",
			"type": "object",
			"required": [
				"Id"
			],
			"properties": {
				"Id": {
					"description": "The id of the newly created object.",
					"type": "string",
					"x-nullable": false
				}
			}
		},
		"EndpointSettings": {
			"description": "Configuration for a network endpoint.",
			"type": "object",
			"properties": {
				"IPAMConfig": {
					"$ref": "#/definitions/EndpointIPAMConfig"
				},
				"Links": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"container_1",
						"container_2"
					]
				},
				"Aliases": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"server_x",
						"server_y"
					]
				},
				"NetworkID": {
					"description": "Unique ID of the network.\n",
					"type": "string",
					"example": "08754567f1f40222263eab4102e1c733ae697e8e354aa9cd6e18d7402835292a"
				},
				"EndpointID": {
					"description": "Unique ID for the service endpoint in a Sandbox.\n",
					"type": "string",
					"example": "b88f5b905aabf2893f3cbc4ee42d1ea7980bbc0a92e2c8922b1e1795298afb0b"
				},
				"Gateway": {
					"description": "Gateway address for this network.\n",
					"type": "string",
					"example": "172.17.0.1"
				},
				"IPAddress": {
					"description": "IPv4 address.\n",
					"type": "string",
					"example": "172.17.0.4"
				},
				"IPPrefixLen": {
					"description": "Mask length of the IPv4 address.\n",
					"type": "integer",
					"example": 16
				},
				"IPv6Gateway": {
					"description": "IPv6 gateway address.\n",
					"type": "string",
					"example": "2001:db8:2::100"
				},
				"GlobalIPv6Address": {
					"description": "Global IPv6 address.\n",
					"type": "string",
					"example": "2001:db8::5689"
				},
				"GlobalIPv6PrefixLen": {
					"description": "Mask length of the global IPv6 address.\n",
					"type": "integer",
					"format": "int64",
					"example": 64
				},
				"MacAddress": {
					"description": "MAC address for the endpoint on this network.\n",
					"type": "string",
					"example": "02:42:ac:11:00:04"
				},
				"DriverOpts": {
					"description": "DriverOpts is a mapping of driver options and values. These options\nare passed directly to the driver and are driver specific.\n",
					"type": "object",
					"x-nullable": true,
					"additionalProperties": {
						"type": "string"
					},
					"example": {
						"com.example.some-label": "some-value",
						"com.example.some-other-label": "some-other-value"
					}
				}
			}
		},
		"EndpointIPAMConfig": {
			"description": "EndpointIPAMConfig represents an endpoint's IPAM configuration.\n",
			"type": "object",
			"x-nullable": true,
			"properties": {
				"IPv4Address": {
					"type": "string",
					"example": "172.20.30.33"
				},
				"IPv6Address": {
					"type": "string",
					"example": "2001:db8:abcd::3033"
				},
				"LinkLocalIPs": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"169.254.34.68",
						"fe80::3468"
					]
				}
			}
		},
		"PluginMount": {
			"type": "object",
			"x-nullable": false,
			"required": [
				"Name",
				"Description",
				"Settable",
				"Source",
				"Destination",
				"Type",
				"Options"
			],
			"properties": {
				"Name": {
					"type": "string",
					"x-nullable": false,
					"example": "some-mount"
				},
				"Description": {
					"type": "string",
					"x-nullable": false,
					"example": "This is a mount that's used by the plugin."
				},
				"Settable": {
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Source": {
					"type": "string",
					"example": "/var/lib/docker/plugins/"
				},
				"Destination": {
					"type": "string",
					"x-nullable": false,
					"example": "/mnt/state"
				},
				"Type": {
					"type": "string",
					"x-nullable": false,
					"example": "bind"
				},
				"Options": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"rbind",
						"rw"
					]
				}
			}
		},
		"PluginDevice": {
			"type": "object",
			"required": [
				"Name",
				"Description",
				"Settable",
				"Path"
			],
			"x-nullable": false,
			"properties": {
				"Name": {
					"type": "string",
					"x-nullable": false
				},
				"Description": {
					"type": "string",
					"x-nullable": false
				},
				"Settable": {
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Path": {
					"type": "string",
					"example": "/dev/fuse"
				}
			}
		},
		"PluginEnv": {
			"type": "object",
			"x-nullable": false,
			"required": [
				"Name",
				"Description",
				"Settable",
				"Value"
			],
			"properties": {
				"Name": {
					"x-nullable": false,
					"type": "string"
				},
				"Description": {
					"x-nullable": false,
					"type": "string"
				},
				"Settable": {
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"Value": {
					"type": "string"
				}
			}
		},
		"PluginInterfaceType": {
			"type": "object",
			"x-nullable": false,
			"required": [
				"Prefix",
				"Capability",
				"Version"
			],
			"properties": {
				"Prefix": {
					"type": "string",
					"x-nullable": false
				},
				"Capability": {
					"type": "string",
					"x-nullable": false
				},
				"Version": {
					"type": "string",
					"x-nullable": false
				}
			}
		},
		"Plugin": {
			"description": "A plugin for the Engine API",
			"type": "object",
			"required": [
				"Settings",
				"Enabled",
				"Config",
				"Name"
			],
			"properties": {
				"Id": {
					"type": "string",
					"example": "5724e2c8652da337ab2eedd19fc6fc0ec908e4bd907c7421bf6a8dfc70c4c078"
				},
				"Name": {
					"type": "string",
					"x-nullable": false,
					"example": "tiborvass/sample-volume-plugin"
				},
				"Enabled": {
					"description": "True if the plugin is running. False if the plugin is not running, only installed.",
					"type": "boolean",
					"x-nullable": false,
					"example": true
				},
				"Settings": {
					"description": "Settings that can be modified by users.",
					"type": "object",
					"x-nullable": false,
					"required": [
						"Args",
						"Devices",
						"Env",
						"Mounts"
					],
					"properties": {
						"Mounts": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/PluginMount"
							}
						},
						"Env": {
							"type": "array",
							"items": {
								"type": "string"
							},
							"example": [
								"DEBUG=0"
							]
						},
						"Args": {
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						"Devices": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/PluginDevice"
							}
						}
					}
				},
				"PluginReference": {
					"description": "plugin remote reference used to push/pull the plugin",
					"type": "string",
					"x-nullable": false,
					"example": "localhost:5000/tiborvass/sample-volume-plugin:latest"
				},
				"Config": {
					"description": "The config of a plugin.",
					"type": "object",
					"x-nullable": false,
					"required": [
						"Description",
						"Documentation",
						"Interface",
						"Entrypoint",
						"WorkDir",
						"Network",
						"Linux",
						"PidHost",
						"PropagatedMount",
						"IpcHost",
						"Mounts",
						"Env",
						"Args"
					],
					"properties": {
						"DockerVersion": {
							"description": "Docker Version used to create the plugin",
							"type": "string",
							"x-nullable": false,
							"example": "17.06.0-ce"
						},
						"Description": {
							"type": "string",
							"x-nullable": false,
							"example": "A sample volume plugin for Docker"
						},
						"Documentation": {
							"type": "string",
							"x-nullable": false,
							"example": "https://docs.docker.com/engine/extend/plugins/"
						},
						"Interface": {
							"description": "The interface between Docker and the plugin",
							"x-nullable": false,
							"type": "object",
							"required": [
								"Types",
								"Socket"
							],
							"properties": {
								"Types": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/PluginInterfaceType"
									},
									"example": [
										"docker.volumedriver/1.0"
									]
								},
								"Socket": {
									"type": "string",
									"x-nullable": false,
									"example": "plugins.sock"
								},
								"ProtocolScheme": {
									"type": "string",
									"example": "some.protocol/v1.0",
									"description": "Protocol to use for clients connecting to the plugin.",
									"enum": [
										"",
										"moby.plugins.http/v1"
									]
								}
							}
						},
						"Entrypoint": {
							"type": "array",
							"items": {
								"type": "string"
							},
							"example": [
								"/usr/bin/sample-volume-plugin",
								"/data"
							]
						},
						"WorkDir": {
							"type": "string",
							"x-nullable": false,
							"example": "/bin/"
						},
						"User": {
							"type": "object",
							"x-nullable": false,
							"properties": {
								"UID": {
									"type": "integer",
									"format": "uint32",
									"example": 1000
								},
								"GID": {
									"type": "integer",
									"format": "uint32",
									"example": 1000
								}
							}
						},
						"Network": {
							"type": "object",
							"x-nullable": false,
							"required": [
								"Type"
							],
							"properties": {
								"Type": {
									"x-nullable": false,
									"type": "string",
									"example": "host"
								}
							}
						},
						"Linux": {
							"type": "object",
							"x-nullable": false,
							"required": [
								"Capabilities",
								"AllowAllDevices",
								"Devices"
							],
							"properties": {
								"Capabilities": {
									"type": "array",
									"items": {
										"type": "string"
									},
									"example": [
										"CAP_SYS_ADMIN",
										"CAP_SYSLOG"
									]
								},
								"AllowAllDevices": {
									"type": "boolean",
									"x-nullable": false,
									"example": false
								},
								"Devices": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/PluginDevice"
									}
								}
							}
						},
						"PropagatedMount": {
							"type": "string",
							"x-nullable": false,
							"example": "/mnt/volumes"
						},
						"IpcHost": {
							"type": "boolean",
							"x-nullable": false,
							"example": false
						},
						"PidHost": {
							"type": "boolean",
							"x-nullable": false,
							"example": false
						},
						"Mounts": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/PluginMount"
							}
						},
						"Env": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/PluginEnv"
							},
							"example": [
								{
									"Name": "DEBUG",
									"Description": "If set, prints debug messages",
									"Settable": null,
									"Value": "0"
								}
							]
						},
						"Args": {
							"type": "object",
							"x-nullable": false,
							"required": [
								"Name",
								"Description",
								"Settable",
								"Value"
							],
							"properties": {
								"Name": {
									"x-nullable": false,
									"type": "string",
									"example": "args"
								},
								"Description": {
									"x-nullable": false,
									"type": "string",
									"example": "command line arguments"
								},
								"Settable": {
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"Value": {
									"type": "array",
									"items": {
										"type": "string"
									}
								}
							}
						},
						"rootfs": {
							"type": "object",
							"properties": {
								"type": {
									"type": "string",
									"example": "layers"
								},
								"diff_ids": {
									"type": "array",
									"items": {
										"type": "string"
									},
									"example": [
										"sha256:675532206fbf3030b8458f88d6e26d4eb1577688a25efec97154c94e8b6b4887",
										"sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8"
									]
								}
							}
						}
					}
				}
			}
		},
		"ObjectVersion": {
			"description": "The version number of the object such as node, service, etc. This is needed\nto avoid conflicting writes. The client must send the version number along\nwith the modified specification when updating these objects.\n\nThis approach ensures safe concurrency and determinism in that the change\non the object may not be applied if the version number has changed from the\nlast read. In other words, if two update requests specify the same base\nversion, only one of the requests can succeed. As a result, two separate\nupdate requests that happen at the same time will not unintentionally\noverwrite each other.\n",
			"type": "object",
			"properties": {
				"Index": {
					"type": "integer",
					"format": "uint64",
					"example": 373531
				}
			}
		},
		"NodeSpec": {
			"type": "object",
			"properties": {
				"Name": {
					"description": "Name for the node.",
					"type": "string",
					"example": "my-node"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"Role": {
					"description": "Role of the node.",
					"type": "string",
					"enum": [
						"worker",
						"manager"
					],
					"example": "manager"
				},
				"Availability": {
					"description": "Availability of the node.",
					"type": "string",
					"enum": [
						"active",
						"pause",
						"drain"
					],
					"example": "active"
				}
			},
			"example": {
				"Availability": "active",
				"Name": "node-name",
				"Role": "manager",
				"Labels": {
					"foo": "bar"
				}
			}
		},
		"Node": {
			"type": "object",
			"properties": {
				"ID": {
					"type": "string",
					"example": "24ifsmvkjbyhk"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"description": "Date and time at which the node was added to the swarm in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2016-08-18T10:44:24.496525531Z"
				},
				"UpdatedAt": {
					"description": "Date and time at which the node was last updated in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2017-08-09T07:09:37.632105588Z"
				},
				"Spec": {
					"$ref": "#/definitions/NodeSpec"
				},
				"Description": {
					"$ref": "#/definitions/NodeDescription"
				},
				"Status": {
					"$ref": "#/definitions/NodeStatus"
				},
				"ManagerStatus": {
					"$ref": "#/definitions/ManagerStatus"
				}
			}
		},
		"NodeDescription": {
			"description": "NodeDescription encapsulates the properties of the Node as reported by the\nagent.\n",
			"type": "object",
			"properties": {
				"Hostname": {
					"type": "string",
					"example": "bf3067039e47"
				},
				"Platform": {
					"$ref": "#/definitions/Platform"
				},
				"Resources": {
					"$ref": "#/definitions/ResourceObject"
				},
				"Engine": {
					"$ref": "#/definitions/EngineDescription"
				},
				"TLSInfo": {
					"$ref": "#/definitions/TLSInfo"
				}
			}
		},
		"Platform": {
			"description": "Platform represents the platform (Arch/OS).\n",
			"type": "object",
			"properties": {
				"Architecture": {
					"description": "Architecture represents the hardware architecture (for example,\n`x86_64`).\n",
					"type": "string",
					"example": "x86_64"
				},
				"OS": {
					"description": "OS represents the Operating System (for example, `linux` or `windows`).\n",
					"type": "string",
					"example": "linux"
				}
			}
		},
		"EngineDescription": {
			"description": "EngineDescription provides information about an engine.",
			"type": "object",
			"properties": {
				"EngineVersion": {
					"type": "string",
					"example": "17.06.0"
				},
				"Labels": {
					"type": "object",
					"additionalProperties": {
						"type": "string"
					},
					"example": {
						"foo": "bar"
					}
				},
				"Plugins": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"Type": {
								"type": "string"
							},
							"Name": {
								"type": "string"
							}
						}
					},
					"example": [
						{
							"Type": "Log",
							"Name": "awslogs"
						},
						{
							"Type": "Log",
							"Name": "fluentd"
						},
						{
							"Type": "Log",
							"Name": "gcplogs"
						},
						{
							"Type": "Log",
							"Name": "gelf"
						},
						{
							"Type": "Log",
							"Name": "journald"
						},
						{
							"Type": "Log",
							"Name": "json-file"
						},
						{
							"Type": "Log",
							"Name": "logentries"
						},
						{
							"Type": "Log",
							"Name": "splunk"
						},
						{
							"Type": "Log",
							"Name": "syslog"
						},
						{
							"Type": "Network",
							"Name": "bridge"
						},
						{
							"Type": "Network",
							"Name": "host"
						},
						{
							"Type": "Network",
							"Name": "ipvlan"
						},
						{
							"Type": "Network",
							"Name": "macvlan"
						},
						{
							"Type": "Network",
							"Name": "null"
						},
						{
							"Type": "Network",
							"Name": "overlay"
						},
						{
							"Type": "Volume",
							"Name": "local"
						},
						{
							"Type": "Volume",
							"Name": "localhost:5000/vieux/sshfs:latest"
						},
						{
							"Type": "Volume",
							"Name": "vieux/sshfs:latest"
						}
					]
				}
			}
		},
		"TLSInfo": {
			"description": "Information about the issuer of leaf TLS certificates and the trusted root\nCA certificate.\n",
			"type": "object",
			"properties": {
				"TrustRoot": {
					"description": "The root CA certificate(s) that are used to validate leaf TLS\ncertificates.\n",
					"type": "string"
				},
				"CertIssuerSubject": {
					"description": "The base64-url-safe-encoded raw subject bytes of the issuer.",
					"type": "string"
				},
				"CertIssuerPublicKey": {
					"description": "The base64-url-safe-encoded raw public key bytes of the issuer.\n",
					"type": "string"
				}
			},
			"example": {
				"TrustRoot": "-----BEGIN CERTIFICATE-----\nMIIBajCCARCgAwIBAgIUbYqrLSOSQHoxD8CwG6Bi2PJi9c8wCgYIKoZIzj0EAwIw\nEzERMA8GA1UEAxMIc3dhcm0tY2EwHhcNMTcwNDI0MjE0MzAwWhcNMzcwNDE5MjE0\nMzAwWjATMREwDwYDVQQDEwhzd2FybS1jYTBZMBMGByqGSM49AgEGCCqGSM49AwEH\nA0IABJk/VyMPYdaqDXJb/VXh5n/1Yuv7iNrxV3Qb3l06XD46seovcDWs3IZNV1lf\n3Skyr0ofcchipoiHkXBODojJydSjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMB\nAf8EBTADAQH/MB0GA1UdDgQWBBRUXxuRcnFjDfR/RIAUQab8ZV/n4jAKBggqhkjO\nPQQDAgNIADBFAiAy+JTe6Uc3KyLCMiqGl2GyWGQqQDEcO3/YG36x7om65AIhAJvz\npxv6zFeVEkAEEkqIYi0omA9+CjanB/6Bz4n1uw8H\n-----END CERTIFICATE-----\n",
				"CertIssuerSubject": "MBMxETAPBgNVBAMTCHN3YXJtLWNh",
				"CertIssuerPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEmT9XIw9h1qoNclv9VeHmf/Vi6/uI2vFXdBveXTpcPjqx6i9wNazchk1XWV/dKTKvSh9xyGKmiIeRcE4OiMnJ1A=="
			}
		},
		"NodeStatus": {
			"description": "NodeStatus represents the status of a node.\n\nIt provides the current status of the node, as seen by the manager.\n",
			"type": "object",
			"properties": {
				"State": {
					"$ref": "#/definitions/NodeState"
				},
				"Message": {
					"type": "string",
					"example": ""
				},
				"Addr": {
					"description": "IP address of the node.",
					"type": "string",
					"example": "172.17.0.2"
				}
			}
		},
		"NodeState": {
			"description": "NodeState represents the state of a node.",
			"type": "string",
			"enum": [
				"unknown",
				"down",
				"ready",
				"disconnected"
			],
			"example": "ready"
		},
		"ManagerStatus": {
			"description": "ManagerStatus represents the status of a manager.\n\nIt provides the current status of a node's manager component, if the node\nis a manager.\n",
			"x-nullable": true,
			"type": "object",
			"properties": {
				"Leader": {
					"type": "boolean",
					"default": false,
					"example": true
				},
				"Reachability": {
					"$ref": "#/definitions/Reachability"
				},
				"Addr": {
					"description": "The IP address and port at which the manager is reachable.\n",
					"type": "string",
					"example": "10.0.0.46:2377"
				}
			}
		},
		"Reachability": {
			"description": "Reachability represents the reachability of a node.",
			"type": "string",
			"enum": [
				"unknown",
				"unreachable",
				"reachable"
			],
			"example": "reachable"
		},
		"SwarmSpec": {
			"description": "User modifiable swarm configuration.",
			"type": "object",
			"properties": {
				"Name": {
					"description": "Name of the swarm.",
					"type": "string",
					"example": "default"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					},
					"example": {
						"com.example.corp.type": "production",
						"com.example.corp.department": "engineering"
					}
				},
				"Orchestration": {
					"description": "Orchestration configuration.",
					"type": "object",
					"x-nullable": true,
					"properties": {
						"TaskHistoryRetentionLimit": {
							"description": "The number of historic tasks to keep per instance or node. If\nnegative, never remove completed or failed tasks.\n",
							"type": "integer",
							"format": "int64",
							"example": 10
						}
					}
				},
				"Raft": {
					"description": "Raft configuration.",
					"type": "object",
					"properties": {
						"SnapshotInterval": {
							"description": "The number of log entries between snapshots.",
							"type": "integer",
							"format": "uint64",
							"example": 10000
						},
						"KeepOldSnapshots": {
							"description": "The number of snapshots to keep beyond the current snapshot.\n",
							"type": "integer",
							"format": "uint64"
						},
						"LogEntriesForSlowFollowers": {
							"description": "The number of log entries to keep around to sync up slow followers\nafter a snapshot is created.\n",
							"type": "integer",
							"format": "uint64",
							"example": 500
						},
						"ElectionTick": {
							"description": "The number of ticks that a follower will wait for a message from\nthe leader before becoming a candidate and starting an election.\n`ElectionTick` must be greater than `HeartbeatTick`.\n\nA tick currently defaults to one second, so these translate\ndirectly to seconds currently, but this is NOT guaranteed.\n",
							"type": "integer",
							"example": 3
						},
						"HeartbeatTick": {
							"description": "The number of ticks between heartbeats. Every HeartbeatTick ticks,\nthe leader will send a heartbeat to the followers.\n\nA tick currently defaults to one second, so these translate\ndirectly to seconds currently, but this is NOT guaranteed.\n",
							"type": "integer",
							"example": 1
						}
					}
				},
				"Dispatcher": {
					"description": "Dispatcher configuration.",
					"type": "object",
					"x-nullable": true,
					"properties": {
						"HeartbeatPeriod": {
							"description": "The delay for an agent to send a heartbeat to the dispatcher.\n",
							"type": "integer",
							"format": "int64",
							"example": 5000000000
						}
					}
				},
				"CAConfig": {
					"description": "CA configuration.",
					"type": "object",
					"x-nullable": true,
					"properties": {
						"NodeCertExpiry": {
							"description": "The duration node certificates are issued for.",
							"type": "integer",
							"format": "int64",
							"example": 7776000000000000
						},
						"ExternalCAs": {
							"description": "Configuration for forwarding signing requests to an external\ncertificate authority.\n",
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"Protocol": {
										"description": "Protocol for communication with the external CA (currently\nonly `cfssl` is supported).\n",
										"type": "string",
										"enum": [
											"cfssl"
										],
										"default": "cfssl"
									},
									"URL": {
										"description": "URL where certificate signing requests should be sent.\n",
										"type": "string"
									},
									"Options": {
										"description": "An object with key/value pairs that are interpreted as\nprotocol-specific options for the external CA driver.\n",
										"type": "object",
										"additionalProperties": {
											"type": "string"
										}
									},
									"CACert": {
										"description": "The root CA certificate (in PEM format) this external CA uses\nto issue TLS certificates (assumed to be to the current swarm\nroot CA certificate if not provided).\n",
										"type": "string"
									}
								}
							}
						},
						"SigningCACert": {
							"description": "The desired signing CA certificate for all swarm node TLS leaf\ncertificates, in PEM format.\n",
							"type": "string"
						},
						"SigningCAKey": {
							"description": "The desired signing CA key for all swarm node TLS leaf certificates,\nin PEM format.\n",
							"type": "string"
						},
						"ForceRotate": {
							"description": "An integer whose purpose is to force swarm to generate a new\nsigning CA certificate and key, if none have been specified in\n`SigningCACert` and `SigningCAKey`\n",
							"format": "uint64",
							"type": "integer"
						}
					}
				},
				"EncryptionConfig": {
					"description": "Parameters related to encryption-at-rest.",
					"type": "object",
					"properties": {
						"AutoLockManagers": {
							"description": "If set, generate a key and use it to lock data stored on the\nmanagers.\n",
							"type": "boolean",
							"example": false
						}
					}
				},
				"TaskDefaults": {
					"description": "Defaults for creating tasks in this cluster.",
					"type": "object",
					"properties": {
						"LogDriver": {
							"description": "The log driver to use for tasks created in the orchestrator if\nunspecified by a service.\n\nUpdating this value only affects new tasks. Existing tasks continue\nto use their previously configured log driver until recreated.\n",
							"type": "object",
							"properties": {
								"Name": {
									"description": "The log driver to use as a default for new tasks.\n",
									"type": "string",
									"example": "json-file"
								},
								"Options": {
									"description": "Driver-specific options for the selectd log driver, specified\nas key/value pairs.\n",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									},
									"example": {
										"max-file": "10",
										"max-size": "100m"
									}
								}
							}
						}
					}
				}
			}
		},
		"ClusterInfo": {
			"description": "ClusterInfo represents information about the swarm as is returned by the\n\"/info\" endpoint. Join-tokens are not included.\n",
			"x-nullable": true,
			"type": "object",
			"properties": {
				"ID": {
					"description": "The ID of the swarm.",
					"type": "string",
					"example": "abajmipo7b4xz5ip2nrla6b11"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"description": "Date and time at which the swarm was initialised in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2016-08-18T10:44:24.496525531Z"
				},
				"UpdatedAt": {
					"description": "Date and time at which the swarm was last updated in\n[RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.\n",
					"type": "string",
					"format": "dateTime",
					"example": "2017-08-09T07:09:37.632105588Z"
				},
				"Spec": {
					"$ref": "#/definitions/SwarmSpec"
				},
				"TLSInfo": {
					"$ref": "#/definitions/TLSInfo"
				},
				"RootRotationInProgress": {
					"description": "Whether there is currently a root CA rotation in progress for the swarm\n",
					"type": "boolean",
					"example": false
				},
				"DataPathPort": {
					"description": "DataPathPort specifies the data path port number for data traffic.\nAcceptable port range is 1024 to 49151.\nIf no port is set or is set to 0, the default port (4789) is used.\n",
					"type": "integer",
					"format": "uint32",
					"default": 4789,
					"example": 4789
				},
				"DefaultAddrPool": {
					"description": "Default Address Pool specifies default subnet pools for global scope\nnetworks.\n",
					"type": "array",
					"items": {
						"type": "string",
						"format": "CIDR",
						"example": [
							"10.10.0.0/16",
							"20.20.0.0/16"
						]
					}
				},
				"SubnetSize": {
					"description": "SubnetSize specifies the subnet size of the networks created from the\ndefault subnet pool.\n",
					"type": "integer",
					"format": "uint32",
					"maximum": 29,
					"default": 24,
					"example": 24
				}
			}
		},
		"JoinTokens": {
			"description": "JoinTokens contains the tokens workers and managers need to join the swarm.\n",
			"type": "object",
			"properties": {
				"Worker": {
					"description": "The token workers can use to join the swarm.\n",
					"type": "string",
					"example": "SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-1awxwuwd3z9j1z3puu7rcgdbx"
				},
				"Manager": {
					"description": "The token managers can use to join the swarm.\n",
					"type": "string",
					"example": "SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-7p73s1dx5in4tatdymyhg9hu2"
				}
			}
		},
		"Swarm": {
			"type": "object",
			"allOf": [
				{
					"$ref": "#/definitions/ClusterInfo"
				},
				{
					"type": "object",
					"properties": {
						"JoinTokens": {
							"$ref": "#/definitions/JoinTokens"
						}
					}
				}
			]
		},
		"TaskSpec": {
			"description": "User modifiable task configuration.",
			"type": "object",
			"properties": {
				"PluginSpec": {
					"type": "object",
					"description": "Plugin spec for the service.  *(Experimental release only.)*\n\n<p><br /></p>\n\n> **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are\n> mutually exclusive. PluginSpec is only used when the Runtime field\n> is set to `plugin`. NetworkAttachmentSpec is used when the Runtime\n> field is set to `attachment`.\n",
					"properties": {
						"Name": {
							"description": "The name or 'alias' to use for the plugin.",
							"type": "string"
						},
						"Remote": {
							"description": "The plugin image reference to use.",
							"type": "string"
						},
						"Disabled": {
							"description": "Disable the plugin once scheduled.",
							"type": "boolean"
						},
						"PluginPrivilege": {
							"type": "array",
							"items": {
								"description": "Describes a permission accepted by the user upon installing the\nplugin.\n",
								"type": "object",
								"properties": {
									"Name": {
										"type": "string"
									},
									"Description": {
										"type": "string"
									},
									"Value": {
										"type": "array",
										"items": {
											"type": "string"
										}
									}
								}
							}
						}
					}
				},
				"ContainerSpec": {
					"type": "object",
					"description": "Container spec for the service.\n\n<p><br /></p>\n\n> **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are\n> mutually exclusive. PluginSpec is only used when the Runtime field\n> is set to `plugin`. NetworkAttachmentSpec is used when the Runtime\n> field is set to `attachment`.\n",
					"properties": {
						"Image": {
							"description": "The image name to use for the container",
							"type": "string"
						},
						"Labels": {
							"description": "User-defined key/value data.",
							"type": "object",
							"additionalProperties": {
								"type": "string"
							}
						},
						"Command": {
							"description": "The command to be run in the image.",
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						"Args": {
							"description": "Arguments to the command.",
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						"Hostname": {
							"description": "The hostname to use for the container, as a valid\n[RFC 1123](https://tools.ietf.org/html/rfc1123) hostname.\n",
							"type": "string"
						},
						"Env": {
							"description": "A list of environment variables in the form `VAR=value`.\n",
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						"Dir": {
							"description": "The working directory for commands to run in.",
							"type": "string"
						},
						"User": {
							"description": "The user inside the container.",
							"type": "string"
						},
						"Groups": {
							"type": "array",
							"description": "A list of additional groups that the container process will run as.\n",
							"items": {
								"type": "string"
							}
						},
						"Privileges": {
							"type": "object",
							"description": "Security options for the container",
							"properties": {
								"CredentialSpec": {
									"type": "object",
									"description": "CredentialSpec for managed service account (Windows only)",
									"properties": {
										"Config": {
											"type": "string",
											"example": "0bt9dmxjvjiqermk6xrop3ekq",
											"description": "Load credential spec from a Swarm Config with the given ID.\nThe specified config must also be present in the Configs\nfield with the Runtime property set.\n\n<p><br /></p>\n\n\n> **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,\n> and `CredentialSpec.Config` are mutually exclusive.\n"
										},
										"File": {
											"type": "string",
											"example": "spec.json",
											"description": "Load credential spec from this file. The file is read by\nthe daemon, and must be present in the `CredentialSpecs`\nsubdirectory in the docker data directory, which defaults\nto `C:\\ProgramData\\Docker\\` on Windows.\n\nFor example, specifying `spec.json` loads\n`C:\\ProgramData\\Docker\\CredentialSpecs\\spec.json`.\n\n<p><br /></p>\n\n> **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,\n> and `CredentialSpec.Config` are mutually exclusive.\n"
										},
										"Registry": {
											"type": "string",
											"description": "Load credential spec from this value in the Windows\nregistry. The specified registry value must be located in:\n\n`HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Virtualization\\Containers\\CredentialSpecs`\n\n<p><br /></p>\n\n\n> **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,\n> and `CredentialSpec.Config` are mutually exclusive.\n"
										}
									}
								},
								"SELinuxContext": {
									"type": "object",
									"description": "SELinux labels of the container",
									"properties": {
										"Disable": {
											"type": "boolean",
											"description": "Disable SELinux"
										},
										"User": {
											"type": "string",
											"description": "SELinux user label"
										},
										"Role": {
											"type": "string",
											"description": "SELinux role label"
										},
										"Type": {
											"type": "string",
											"description": "SELinux type label"
										},
										"Level": {
											"type": "string",
											"description": "SELinux level label"
										}
									}
								}
							}
						},
						"TTY": {
							"description": "Whether a pseudo-TTY should be allocated.",
							"type": "boolean"
						},
						"OpenStdin": {
							"description": "Open `stdin`",
							"type": "boolean"
						},
						"ReadOnly": {
							"description": "Mount the container's root filesystem as read only.",
							"type": "boolean"
						},
						"Mounts": {
							"description": "Specification for mounts to be added to containers created as part\nof the service.\n",
							"type": "array",
							"items": {
								"$ref": "#/definitions/Mount"
							}
						},
						"StopSignal": {
							"description": "Signal to stop the container.",
							"type": "string"
						},
						"StopGracePeriod": {
							"description": "Amount of time to wait for the container to terminate before\nforcefully killing it.\n",
							"type": "integer",
							"format": "int64"
						},
						"HealthCheck": {
							"$ref": "#/definitions/HealthConfig"
						},
						"Hosts": {
							"type": "array",
							"description": "A list of hostname/IP mappings to add to the container's `hosts`\nfile. The format of extra hosts is specified in the\n[hosts(5)](http://man7.org/linux/man-pages/man5/hosts.5.html)\nman page:\n\n    IP_address canonical_hostname [aliases...]\n",
							"items": {
								"type": "string"
							}
						},
						"DNSConfig": {
							"description": "Specification for DNS related configurations in resolver configuration\nfile (`resolv.conf`).\n",
							"type": "object",
							"properties": {
								"Nameservers": {
									"description": "The IP addresses of the name servers.",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"Search": {
									"description": "A search list for host-name lookup.",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"Options": {
									"description": "A list of internal resolver variables to be modified (e.g.,\n`debug`, `ndots:3`, etc.).\n",
									"type": "array",
									"items": {
										"type": "string"
									}
								}
							}
						},
						"Secrets": {
							"description": "Secrets contains references to zero or more secrets that will be\nexposed to the service.\n",
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"File": {
										"description": "File represents a specific target that is backed by a file.\n",
										"type": "object",
										"properties": {
											"Name": {
												"description": "Name represents the final filename in the filesystem.\n",
												"type": "string"
											},
											"UID": {
												"description": "UID represents the file UID.",
												"type": "string"
											},
											"GID": {
												"description": "GID represents the file GID.",
												"type": "string"
											},
											"Mode": {
												"description": "Mode represents the FileMode of the file.",
												"type": "integer",
												"format": "uint32"
											}
										}
									},
									"SecretID": {
										"description": "SecretID represents the ID of the specific secret that we're\nreferencing.\n",
										"type": "string"
									},
									"SecretName": {
										"description": "SecretName is the name of the secret that this references,\nbut this is just provided for lookup/display purposes. The\nsecret in the reference will be identified by its ID.\n",
										"type": "string"
									}
								}
							}
						},
						"Configs": {
							"description": "Configs contains references to zero or more configs that will be\nexposed to the service.\n",
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"File": {
										"description": "File represents a specific target that is backed by a file.\n\n<p><br /><p>\n\n> **Note**: `Configs.File` and `Configs.Runtime` are mutually exclusive\n",
										"type": "object",
										"properties": {
											"Name": {
												"description": "Name represents the final filename in the filesystem.\n",
												"type": "string"
											},
											"UID": {
												"description": "UID represents the file UID.",
												"type": "string"
											},
											"GID": {
												"description": "GID represents the file GID.",
												"type": "string"
											},
											"Mode": {
												"description": "Mode represents the FileMode of the file.",
												"type": "integer",
												"format": "uint32"
											}
										}
									},
									"Runtime": {
										"description": "Runtime represents a target that is not mounted into the\ncontainer but is used by the task\n\n<p><br /><p>\n\n> **Note**: `Configs.File` and `Configs.Runtime` are mutually\n> exclusive\n",
										"type": "object"
									},
									"ConfigID": {
										"description": "ConfigID represents the ID of the specific config that we're\nreferencing.\n",
										"type": "string"
									},
									"ConfigName": {
										"description": "ConfigName is the name of the config that this references,\nbut this is just provided for lookup/display purposes. The\nconfig in the reference will be identified by its ID.\n",
										"type": "string"
									}
								}
							}
						},
						"Isolation": {
							"type": "string",
							"description": "Isolation technology of the containers running the service.\n(Windows only)\n",
							"enum": [
								"default",
								"process",
								"hyperv"
							]
						},
						"Init": {
							"description": "Run an init inside the container that forwards signals and reaps\nprocesses. This field is omitted if empty, and the default (as\nconfigured on the daemon) is used.\n",
							"type": "boolean",
							"x-nullable": true
						},
						"Sysctls": {
							"description": "Set kernel namedspaced parameters (sysctls) in the container.\nThe Sysctls option on services accepts the same sysctls as the\nare supported on containers. Note that while the same sysctls are\nsupported, no guarantees or checks are made about their\nsuitability for a clustered environment, and it's up to the user\nto determine whether a given sysctl will work properly in a\nService.\n",
							"type": "object",
							"additionalProperties": {
								"type": "string"
							}
						},
						"CapabilityAdd": {
							"type": "array",
							"description": "A list of kernel capabilities to add to the default set\nfor the container.\n",
							"items": {
								"type": "string"
							},
							"example": [
								"CAP_NET_RAW",
								"CAP_SYS_ADMIN",
								"CAP_SYS_CHROOT",
								"CAP_SYSLOG"
							]
						},
						"CapabilityDrop": {
							"type": "array",
							"description": "A list of kernel capabilities to drop from the default set\nfor the container.\n",
							"items": {
								"type": "string"
							},
							"example": [
								"CAP_NET_RAW"
							]
						},
						"Ulimits": {
							"description": "A list of resource limits to set in the container. For example: `{\"Name\": \"nofile\", \"Soft\": 1024, \"Hard\": 2048}`\"\n",
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"Name": {
										"description": "Name of ulimit",
										"type": "string"
									},
									"Soft": {
										"description": "Soft limit",
										"type": "integer"
									},
									"Hard": {
										"description": "Hard limit",
										"type": "integer"
									}
								}
							}
						}
					}
				},
				"NetworkAttachmentSpec": {
					"description": "Read-only spec type for non-swarm containers attached to swarm overlay\nnetworks.\n\n<p><br /></p>\n\n> **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are\n> mutually exclusive. PluginSpec is only used when the Runtime field\n> is set to `plugin`. NetworkAttachmentSpec is used when the Runtime\n> field is set to `attachment`.\n",
					"type": "object",
					"properties": {
						"ContainerID": {
							"description": "ID of the container represented by this task",
							"type": "string"
						}
					}
				},
				"Resources": {
					"description": "Resource requirements which apply to each individual container created\nas part of the service.\n",
					"type": "object",
					"properties": {
						"Limits": {
							"description": "Define resources limits.",
							"$ref": "#/definitions/Limit"
						},
						"Reservation": {
							"description": "Define resources reservation.",
							"$ref": "#/definitions/ResourceObject"
						}
					}
				},
				"RestartPolicy": {
					"description": "Specification for the restart policy which applies to containers\ncreated as part of this service.\n",
					"type": "object",
					"properties": {
						"Condition": {
							"description": "Condition for restart.",
							"type": "string",
							"enum": [
								"none",
								"on-failure",
								"any"
							]
						},
						"Delay": {
							"description": "Delay between restart attempts.",
							"type": "integer",
							"format": "int64"
						},
						"MaxAttempts": {
							"description": "Maximum attempts to restart a given container before giving up\n(default value is 0, which is ignored).\n",
							"type": "integer",
							"format": "int64",
							"default": 0
						},
						"Window": {
							"description": "Windows is the time window used to evaluate the restart policy\n(default value is 0, which is unbounded).\n",
							"type": "integer",
							"format": "int64",
							"default": 0
						}
					}
				},
				"Placement": {
					"type": "object",
					"properties": {
						"Constraints": {
							"description": "An array of constraint expressions to limit the set of nodes where\na task can be scheduled. Constraint expressions can either use a\n_match_ (`==`) or _exclude_ (`!=`) rule. Multiple constraints find\nnodes that satisfy every expression (AND match). Constraints can\nmatch node or Docker Engine labels as follows:\n\nnode attribute       | matches                        | example\n---------------------|--------------------------------|-----------------------------------------------\n`node.id`            | Node ID                        | `node.id==2ivku8v2gvtg4`\n`node.hostname`      | Node hostname                  | `node.hostname!=node-2`\n`node.role`          | Node role (`manager`/`worker`) | `node.role==manager`\n`node.platform.os`   | Node operating system          | `node.platform.os==windows`\n`node.platform.arch` | Node architecture              | `node.platform.arch==x86_64`\n`node.labels`        | User-defined node labels       | `node.labels.security==high`\n`engine.labels`      | Docker Engine's labels         | `engine.labels.operatingsystem==ubuntu-14.04`\n\n`engine.labels` apply to Docker Engine labels like operating system,\ndrivers, etc. Swarm administrators add `node.labels` for operational\npurposes by using the [`node update endpoint`](#operation/NodeUpdate).\n",
							"type": "array",
							"items": {
								"type": "string"
							},
							"example": [
								"node.hostname!=node3.corp.example.com",
								"node.role!=manager",
								"node.labels.type==production",
								"node.platform.os==linux",
								"node.platform.arch==x86_64"
							]
						},
						"Preferences": {
							"description": "Preferences provide a way to make the scheduler aware of factors\nsuch as topology. They are provided in order from highest to\nlowest precedence.\n",
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"Spread": {
										"type": "object",
										"properties": {
											"SpreadDescriptor": {
												"description": "label descriptor, such as `engine.labels.az`.\n",
												"type": "string"
											}
										}
									}
								}
							},
							"example": [
								{
									"Spread": {
										"SpreadDescriptor": "node.labels.datacenter"
									}
								},
								{
									"Spread": {
										"SpreadDescriptor": "node.labels.rack"
									}
								}
							]
						},
						"MaxReplicas": {
							"description": "Maximum number of replicas for per node (default value is 0, which\nis unlimited)\n",
							"type": "integer",
							"format": "int64",
							"default": 0
						},
						"Platforms": {
							"description": "Platforms stores all the platforms that the service's image can\nrun on. This field is used in the platform filter for scheduling.\nIf empty, then the platform filter is off, meaning there are no\nscheduling restrictions.\n",
							"type": "array",
							"items": {
								"$ref": "#/definitions/Platform"
							}
						}
					}
				},
				"ForceUpdate": {
					"description": "A counter that triggers an update even if no relevant parameters have\nbeen changed.\n",
					"type": "integer"
				},
				"Runtime": {
					"description": "Runtime is the type of runtime specified for the task executor.\n",
					"type": "string"
				},
				"Networks": {
					"description": "Specifies which networks the service should attach to.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/NetworkAttachmentConfig"
					}
				},
				"LogDriver": {
					"description": "Specifies the log driver to use for tasks created from this spec. If\nnot present, the default one for the swarm will be used, finally\nfalling back to the engine default if not specified.\n",
					"type": "object",
					"properties": {
						"Name": {
							"type": "string"
						},
						"Options": {
							"type": "object",
							"additionalProperties": {
								"type": "string"
							}
						}
					}
				}
			}
		},
		"TaskState": {
			"type": "string",
			"enum": [
				"new",
				"allocated",
				"pending",
				"assigned",
				"accepted",
				"preparing",
				"ready",
				"starting",
				"running",
				"complete",
				"shutdown",
				"failed",
				"rejected",
				"remove",
				"orphaned"
			]
		},
		"Task": {
			"type": "object",
			"properties": {
				"ID": {
					"description": "The ID of the task.",
					"type": "string"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"UpdatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"Name": {
					"description": "Name of the task.",
					"type": "string"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"Spec": {
					"$ref": "#/definitions/TaskSpec"
				},
				"ServiceID": {
					"description": "The ID of the service this task is part of.",
					"type": "string"
				},
				"Slot": {
					"type": "integer"
				},
				"NodeID": {
					"description": "The ID of the node that this task is on.",
					"type": "string"
				},
				"AssignedGenericResources": {
					"$ref": "#/definitions/GenericResources"
				},
				"Status": {
					"type": "object",
					"properties": {
						"Timestamp": {
							"type": "string",
							"format": "dateTime"
						},
						"State": {
							"$ref": "#/definitions/TaskState"
						},
						"Message": {
							"type": "string"
						},
						"Err": {
							"type": "string"
						},
						"ContainerStatus": {
							"type": "object",
							"properties": {
								"ContainerID": {
									"type": "string"
								},
								"PID": {
									"type": "integer"
								},
								"ExitCode": {
									"type": "integer"
								}
							}
						}
					}
				},
				"DesiredState": {
					"$ref": "#/definitions/TaskState"
				},
				"JobIteration": {
					"description": "If the Service this Task belongs to is a job-mode service, contains\nthe JobIteration of the Service this Task was created for. Absent if\nthe Task was created for a Replicated or Global Service.\n",
					"$ref": "#/definitions/ObjectVersion"
				}
			},
			"example": {
				"ID": "0kzzo1i0y4jz6027t0k7aezc7",
				"Version": {
					"Index": 71
				},
				"CreatedAt": "2016-06-07T21:07:31.171892745Z",
				"UpdatedAt": "2016-06-07T21:07:31.376370513Z",
				"Spec": {
					"ContainerSpec": {
						"Image": "redis"
					},
					"Resources": {
						"Limits": {},
						"Reservations": {}
					},
					"RestartPolicy": {
						"Condition": "any",
						"MaxAttempts": 0
					},
					"Placement": {}
				},
				"ServiceID": "9mnpnzenvg8p8tdbtq4wvbkcz",
				"Slot": 1,
				"NodeID": "60gvrl6tm78dmak4yl7srz94v",
				"Status": {
					"Timestamp": "2016-06-07T21:07:31.290032978Z",
					"State": "running",
					"Message": "started",
					"ContainerStatus": {
						"ContainerID": "e5d62702a1b48d01c3e02ca1e0212a250801fa8d67caca0b6f35919ebc12f035",
						"PID": 677
					}
				},
				"DesiredState": "running",
				"NetworksAttachments": [
					{
						"Network": {
							"ID": "4qvuz4ko70xaltuqbt8956gd1",
							"Version": {
								"Index": 18
							},
							"CreatedAt": "2016-06-07T20:31:11.912919752Z",
							"UpdatedAt": "2016-06-07T21:07:29.955277358Z",
							"Spec": {
								"Name": "ingress",
								"Labels": {
									"com.docker.swarm.internal": "true"
								},
								"DriverConfiguration": {},
								"IPAMOptions": {
									"Driver": {},
									"Configs": [
										{
											"Subnet": "10.255.0.0/16",
											"Gateway": "10.255.0.1"
										}
									]
								}
							},
							"DriverState": {
								"Name": "overlay",
								"Options": {
									"com.docker.network.driver.overlay.vxlanid_list": "256"
								}
							},
							"IPAMOptions": {
								"Driver": {
									"Name": "default"
								},
								"Configs": [
									{
										"Subnet": "10.255.0.0/16",
										"Gateway": "10.255.0.1"
									}
								]
							}
						},
						"Addresses": [
							"10.255.0.10/16"
						]
					}
				],
				"AssignedGenericResources": [
					{
						"DiscreteResourceSpec": {
							"Kind": "SSD",
							"Value": 3
						}
					},
					{
						"NamedResourceSpec": {
							"Kind": "GPU",
							"Value": "UUID1"
						}
					},
					{
						"NamedResourceSpec": {
							"Kind": "GPU",
							"Value": "UUID2"
						}
					}
				]
			}
		},
		"ServiceSpec": {
			"description": "User modifiable configuration for a service.",
			"properties": {
				"Name": {
					"description": "Name of the service.",
					"type": "string"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"TaskTemplate": {
					"$ref": "#/definitions/TaskSpec"
				},
				"Mode": {
					"description": "Scheduling mode for the service.",
					"type": "object",
					"properties": {
						"Replicated": {
							"type": "object",
							"properties": {
								"Replicas": {
									"type": "integer",
									"format": "int64"
								}
							}
						},
						"Global": {
							"type": "object"
						},
						"ReplicatedJob": {
							"description": "The mode used for services with a finite number of tasks that run\nto a completed state.\n",
							"type": "object",
							"properties": {
								"MaxConcurrent": {
									"description": "The maximum number of replicas to run simultaneously.\n",
									"type": "integer",
									"format": "int64",
									"default": 1
								},
								"TotalCompletions": {
									"description": "The total number of replicas desired to reach the Completed\nstate. If unset, will default to the value of `MaxConcurrent`\n",
									"type": "integer",
									"format": "int64"
								}
							}
						},
						"GlobalJob": {
							"description": "The mode used for services which run a task to the completed state\non each valid node.\n",
							"type": "object"
						}
					}
				},
				"UpdateConfig": {
					"description": "Specification for the update strategy of the service.",
					"type": "object",
					"properties": {
						"Parallelism": {
							"description": "Maximum number of tasks to be updated in one iteration (0 means\nunlimited parallelism).\n",
							"type": "integer",
							"format": "int64"
						},
						"Delay": {
							"description": "Amount of time between updates, in nanoseconds.",
							"type": "integer",
							"format": "int64"
						},
						"FailureAction": {
							"description": "Action to take if an updated task fails to run, or stops running\nduring the update.\n",
							"type": "string",
							"enum": [
								"continue",
								"pause",
								"rollback"
							]
						},
						"Monitor": {
							"description": "Amount of time to monitor each updated task for failures, in\nnanoseconds.\n",
							"type": "integer",
							"format": "int64"
						},
						"MaxFailureRatio": {
							"description": "The fraction of tasks that may fail during an update before the\nfailure action is invoked, specified as a floating point number\nbetween 0 and 1.\n",
							"type": "number",
							"default": 0
						},
						"Order": {
							"description": "The order of operations when rolling out an updated task. Either\nthe old task is shut down before the new task is started, or the\nnew task is started before the old task is shut down.\n",
							"type": "string",
							"enum": [
								"stop-first",
								"start-first"
							]
						}
					}
				},
				"RollbackConfig": {
					"description": "Specification for the rollback strategy of the service.",
					"type": "object",
					"properties": {
						"Parallelism": {
							"description": "Maximum number of tasks to be rolled back in one iteration (0 means\nunlimited parallelism).\n",
							"type": "integer",
							"format": "int64"
						},
						"Delay": {
							"description": "Amount of time between rollback iterations, in nanoseconds.\n",
							"type": "integer",
							"format": "int64"
						},
						"FailureAction": {
							"description": "Action to take if an rolled back task fails to run, or stops\nrunning during the rollback.\n",
							"type": "string",
							"enum": [
								"continue",
								"pause"
							]
						},
						"Monitor": {
							"description": "Amount of time to monitor each rolled back task for failures, in\nnanoseconds.\n",
							"type": "integer",
							"format": "int64"
						},
						"MaxFailureRatio": {
							"description": "The fraction of tasks that may fail during a rollback before the\nfailure action is invoked, specified as a floating point number\nbetween 0 and 1.\n",
							"type": "number",
							"default": 0
						},
						"Order": {
							"description": "The order of operations when rolling back a task. Either the old\ntask is shut down before the new task is started, or the new task\nis started before the old task is shut down.\n",
							"type": "string",
							"enum": [
								"stop-first",
								"start-first"
							]
						}
					}
				},
				"Networks": {
					"description": "Specifies which networks the service should attach to.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/NetworkAttachmentConfig"
					}
				},
				"EndpointSpec": {
					"$ref": "#/definitions/EndpointSpec"
				}
			}
		},
		"EndpointPortConfig": {
			"type": "object",
			"properties": {
				"Name": {
					"type": "string"
				},
				"Protocol": {
					"type": "string",
					"enum": [
						"tcp",
						"udp",
						"sctp"
					]
				},
				"TargetPort": {
					"description": "The port inside the container.",
					"type": "integer"
				},
				"PublishedPort": {
					"description": "The port on the swarm hosts.",
					"type": "integer"
				},
				"PublishMode": {
					"description": "The mode in which port is published.\n\n<p><br /></p>\n\n- \"ingress\" makes the target port accessible on every node,\n  regardless of whether there is a task for the service running on\n  that node or not.\n- \"host\" bypasses the routing mesh and publish the port directly on\n  the swarm node where that service is running.\n",
					"type": "string",
					"enum": [
						"ingress",
						"host"
					],
					"default": "ingress",
					"example": "ingress"
				}
			}
		},
		"EndpointSpec": {
			"description": "Properties that can be configured to access and load balance a service.",
			"type": "object",
			"properties": {
				"Mode": {
					"description": "The mode of resolution to use for internal load balancing between tasks.\n",
					"type": "string",
					"enum": [
						"vip",
						"dnsrr"
					],
					"default": "vip"
				},
				"Ports": {
					"description": "List of exposed ports that this service is accessible on from the\noutside. Ports can only be provided if `vip` resolution mode is used.\n",
					"type": "array",
					"items": {
						"$ref": "#/definitions/EndpointPortConfig"
					}
				}
			}
		},
		"Service": {
			"type": "object",
			"properties": {
				"ID": {
					"type": "string"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"UpdatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"Spec": {
					"$ref": "#/definitions/ServiceSpec"
				},
				"Endpoint": {
					"type": "object",
					"properties": {
						"Spec": {
							"$ref": "#/definitions/EndpointSpec"
						},
						"Ports": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/EndpointPortConfig"
							}
						},
						"VirtualIPs": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"NetworkID": {
										"type": "string"
									},
									"Addr": {
										"type": "string"
									}
								}
							}
						}
					}
				},
				"UpdateStatus": {
					"description": "The status of a service update.",
					"type": "object",
					"properties": {
						"State": {
							"type": "string",
							"enum": [
								"updating",
								"paused",
								"completed"
							]
						},
						"StartedAt": {
							"type": "string",
							"format": "dateTime"
						},
						"CompletedAt": {
							"type": "string",
							"format": "dateTime"
						},
						"Message": {
							"type": "string"
						}
					}
				},
				"ServiceStatus": {
					"description": "The status of the service's tasks. Provided only when requested as\npart of a ServiceList operation.\n",
					"type": "object",
					"properties": {
						"RunningTasks": {
							"description": "The number of tasks for the service currently in the Running state.\n",
							"type": "integer",
							"format": "uint64",
							"example": 7
						},
						"DesiredTasks": {
							"description": "The number of tasks for the service desired to be running.\nFor replicated services, this is the replica count from the\nservice spec. For global services, this is computed by taking\ncount of all tasks for the service with a Desired State other\nthan Shutdown.\n",
							"type": "integer",
							"format": "uint64",
							"example": 10
						},
						"CompletedTasks": {
							"description": "The number of tasks for a job that are in the Completed state.\nThis field must be cross-referenced with the service type, as the\nvalue of 0 may mean the service is not in a job mode, or it may\nmean the job-mode service has no tasks yet Completed.\n",
							"type": "integer",
							"format": "uint64"
						}
					}
				},
				"JobStatus": {
					"description": "The status of the service when it is in one of ReplicatedJob or\nGlobalJob modes. Absent on Replicated and Global mode services. The\nJobIteration is an ObjectVersion, but unlike the Service's version,\ndoes not need to be sent with an update request.\n",
					"type": "object",
					"properties": {
						"JobIteration": {
							"description": "JobIteration is a value increased each time a Job is executed,\nsuccessfully or otherwise. \"Executed\", in this case, means the\njob as a whole has been started, not that an individual Task has\nbeen launched. A job is \"Executed\" when its ServiceSpec is\nupdated. JobIteration can be used to disambiguate Tasks belonging\nto different executions of a job.  Though JobIteration will\nincrease with each subsequent execution, it may not necessarily\nincrease by 1, and so JobIteration should not be used to\n",
							"$ref": "#/definitions/ObjectVersion"
						},
						"LastExecution": {
							"description": "The last time, as observed by the server, that this job was\nstarted.\n",
							"type": "string",
							"format": "dateTime"
						}
					}
				}
			},
			"example": {
				"ID": "9mnpnzenvg8p8tdbtq4wvbkcz",
				"Version": {
					"Index": 19
				},
				"CreatedAt": "2016-06-07T21:05:51.880065305Z",
				"UpdatedAt": "2016-06-07T21:07:29.962229872Z",
				"Spec": {
					"Name": "hopeful_cori",
					"TaskTemplate": {
						"ContainerSpec": {
							"Image": "redis"
						},
						"Resources": {
							"Limits": {},
							"Reservations": {}
						},
						"RestartPolicy": {
							"Condition": "any",
							"MaxAttempts": 0
						},
						"Placement": {},
						"ForceUpdate": 0
					},
					"Mode": {
						"Replicated": {
							"Replicas": 1
						}
					},
					"UpdateConfig": {
						"Parallelism": 1,
						"Delay": 1000000000,
						"FailureAction": "pause",
						"Monitor": 15000000000,
						"MaxFailureRatio": 0.15
					},
					"RollbackConfig": {
						"Parallelism": 1,
						"Delay": 1000000000,
						"FailureAction": "pause",
						"Monitor": 15000000000,
						"MaxFailureRatio": 0.15
					},
					"EndpointSpec": {
						"Mode": "vip",
						"Ports": [
							{
								"Protocol": "tcp",
								"TargetPort": 6379,
								"PublishedPort": 30001
							}
						]
					}
				},
				"Endpoint": {
					"Spec": {
						"Mode": "vip",
						"Ports": [
							{
								"Protocol": "tcp",
								"TargetPort": 6379,
								"PublishedPort": 30001
							}
						]
					},
					"Ports": [
						{
							"Protocol": "tcp",
							"TargetPort": 6379,
							"PublishedPort": 30001
						}
					],
					"VirtualIPs": [
						{
							"NetworkID": "4qvuz4ko70xaltuqbt8956gd1",
							"Addr": "10.255.0.2/16"
						},
						{
							"NetworkID": "4qvuz4ko70xaltuqbt8956gd1",
							"Addr": "10.255.0.3/16"
						}
					]
				}
			}
		},
		"ImageDeleteResponseItem": {
			"type": "object",
			"properties": {
				"Untagged": {
					"description": "The image ID of an image that was untagged",
					"type": "string"
				},
				"Deleted": {
					"description": "The image ID of an image that was deleted",
					"type": "string"
				}
			}
		},
		"ServiceUpdateResponse": {
			"type": "object",
			"properties": {
				"Warnings": {
					"description": "Optional warning messages",
					"type": "array",
					"items": {
						"type": "string"
					}
				}
			},
			"example": {
				"Warning": "unable to pin image doesnotexist:latest to digest: image library/doesnotexist:latest not found"
			}
		},
		"ContainerSummary": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"Id": {
						"description": "The ID of this container",
						"type": "string",
						"x-go-name": "ID"
					},
					"Names": {
						"description": "The names that this container has been given",
						"type": "array",
						"items": {
							"type": "string"
						}
					},
					"Image": {
						"description": "The name of the image used when creating this container",
						"type": "string"
					},
					"ImageID": {
						"description": "The ID of the image that this container was created from",
						"type": "string"
					},
					"Command": {
						"description": "Command to run when starting the container",
						"type": "string"
					},
					"Created": {
						"description": "When the container was created",
						"type": "integer",
						"format": "int64"
					},
					"Ports": {
						"description": "The ports exposed by this container",
						"type": "array",
						"items": {
							"$ref": "#/definitions/Port"
						}
					},
					"SizeRw": {
						"description": "The size of files that have been created or changed by this container",
						"type": "integer",
						"format": "int64"
					},
					"SizeRootFs": {
						"description": "The total size of all the files in this container",
						"type": "integer",
						"format": "int64"
					},
					"Labels": {
						"description": "User-defined key/value metadata.",
						"type": "object",
						"additionalProperties": {
							"type": "string"
						}
					},
					"State": {
						"description": "The state of this container (e.g. `Exited`)",
						"type": "string"
					},
					"Status": {
						"description": "Additional human-readable status of this container (e.g. `Exit 0`)",
						"type": "string"
					},
					"HostConfig": {
						"type": "object",
						"properties": {
							"NetworkMode": {
								"type": "string"
							}
						}
					},
					"NetworkSettings": {
						"description": "A summary of the container's network settings",
						"type": "object",
						"properties": {
							"Networks": {
								"type": "object",
								"additionalProperties": {
									"$ref": "#/definitions/EndpointSettings"
								}
							}
						}
					},
					"Mounts": {
						"type": "array",
						"items": {
							"$ref": "#/definitions/Mount"
						}
					}
				}
			}
		},
		"Driver": {
			"description": "Driver represents a driver (network, logging, secrets).",
			"type": "object",
			"required": [
				"Name"
			],
			"properties": {
				"Name": {
					"description": "Name of the driver.",
					"type": "string",
					"x-nullable": false,
					"example": "some-driver"
				},
				"Options": {
					"description": "Key/value map of driver-specific options.",
					"type": "object",
					"x-nullable": false,
					"additionalProperties": {
						"type": "string"
					},
					"example": {
						"OptionA": "value for driver-specific option A",
						"OptionB": "value for driver-specific option B"
					}
				}
			}
		},
		"SecretSpec": {
			"type": "object",
			"properties": {
				"Name": {
					"description": "User-defined name of the secret.",
					"type": "string"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					},
					"example": {
						"com.example.some-label": "some-value",
						"com.example.some-other-label": "some-other-value"
					}
				},
				"Data": {
					"description": "Base64-url-safe-encoded ([RFC 4648](https://tools.ietf.org/html/rfc4648#section-5))\ndata to store as secret.\n\nThis field is only used to _create_ a secret, and is not returned by\nother endpoints.\n",
					"type": "string",
					"example": ""
				},
				"Driver": {
					"description": "Name of the secrets driver used to fetch the secret's value from an\nexternal secret store.\n",
					"$ref": "#/definitions/Driver"
				},
				"Templating": {
					"description": "Templating driver, if applicable\n\nTemplating controls whether and how to evaluate the config payload as\na template. If no driver is set, no templating is used.\n",
					"$ref": "#/definitions/Driver"
				}
			}
		},
		"Secret": {
			"type": "object",
			"properties": {
				"ID": {
					"type": "string",
					"example": "blt1owaxmitz71s9v5zh81zun"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"type": "string",
					"format": "dateTime",
					"example": "2017-07-20T13:55:28.678958722Z"
				},
				"UpdatedAt": {
					"type": "string",
					"format": "dateTime",
					"example": "2017-07-20T13:55:28.678958722Z"
				},
				"Spec": {
					"$ref": "#/definitions/SecretSpec"
				}
			}
		},
		"ConfigSpec": {
			"type": "object",
			"properties": {
				"Name": {
					"description": "User-defined name of the config.",
					"type": "string"
				},
				"Labels": {
					"description": "User-defined key/value metadata.",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				},
				"Data": {
					"description": "Base64-url-safe-encoded ([RFC 4648](https://tools.ietf.org/html/rfc4648#section-5))\nconfig data.\n",
					"type": "string"
				},
				"Templating": {
					"description": "Templating driver, if applicable\n\nTemplating controls whether and how to evaluate the config payload as\na template. If no driver is set, no templating is used.\n",
					"$ref": "#/definitions/Driver"
				}
			}
		},
		"Config": {
			"type": "object",
			"properties": {
				"ID": {
					"type": "string"
				},
				"Version": {
					"$ref": "#/definitions/ObjectVersion"
				},
				"CreatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"UpdatedAt": {
					"type": "string",
					"format": "dateTime"
				},
				"Spec": {
					"$ref": "#/definitions/ConfigSpec"
				}
			}
		},
		"ContainerState": {
			"description": "ContainerState stores container's running state. It's part of ContainerJSONBase\nand will be returned by the \"inspect\" command.\n",
			"type": "object",
			"properties": {
				"Status": {
					"description": "String representation of the container state. Can be one of \"created\",\n\"running\", \"paused\", \"restarting\", \"removing\", \"exited\", or \"dead\".\n",
					"type": "string",
					"enum": [
						"created",
						"running",
						"paused",
						"restarting",
						"removing",
						"exited",
						"dead"
					],
					"example": "running"
				},
				"Running": {
					"description": "Whether this container is running.\n\nNote that a running container can be _paused_. The `Running` and `Paused`\nbooleans are not mutually exclusive:\n\nWhen pausing a container (on Linux), the freezer cgroup is used to suspend\nall processes in the container. Freezing the process requires the process to\nbe running. As a result, paused containers are both `Running` _and_ `Paused`.\n\nUse the `Status` field instead to determine if a container's state is \"running\".\n",
					"type": "boolean",
					"example": true
				},
				"Paused": {
					"description": "Whether this container is paused.",
					"type": "boolean",
					"example": false
				},
				"Restarting": {
					"description": "Whether this container is restarting.",
					"type": "boolean",
					"example": false
				},
				"OOMKilled": {
					"description": "Whether this container has been killed because it ran out of memory.\n",
					"type": "boolean",
					"example": false
				},
				"Dead": {
					"type": "boolean",
					"example": false
				},
				"Pid": {
					"description": "The process ID of this container",
					"type": "integer",
					"example": 1234
				},
				"ExitCode": {
					"description": "The last exit code of this container",
					"type": "integer",
					"example": 0
				},
				"Error": {
					"type": "string"
				},
				"StartedAt": {
					"description": "The time when this container was last started.",
					"type": "string",
					"example": "2020-01-06T09:06:59.461876391Z"
				},
				"FinishedAt": {
					"description": "The time when this container last exited.",
					"type": "string",
					"example": "2020-01-06T09:07:59.461876391Z"
				},
				"Health": {
					"x-nullable": true,
					"$ref": "#/definitions/Health"
				}
			}
		},
		"SystemVersion": {
			"type": "object",
			"description": "Response of Engine API: GET \"/version\"\n",
			"properties": {
				"Platform": {
					"type": "object",
					"required": [
						"Name"
					],
					"properties": {
						"Name": {
							"type": "string"
						}
					}
				},
				"Components": {
					"type": "array",
					"description": "Information about system components\n",
					"items": {
						"type": "object",
						"x-go-name": "ComponentVersion",
						"required": [
							"Name",
							"Version"
						],
						"properties": {
							"Name": {
								"description": "Name of the component\n",
								"type": "string",
								"example": "Engine"
							},
							"Version": {
								"description": "Version of the component\n",
								"type": "string",
								"x-nullable": false,
								"example": "19.03.12"
							},
							"Details": {
								"description": "Key/value pairs of strings with additional information about the\ncomponent. These values are intended for informational purposes\nonly, and their content is not defined, and not part of the API\nspecification.\n\nThese messages can be printed by the client as information to the user.\n",
								"type": "object",
								"x-nullable": true
							}
						}
					}
				},
				"Version": {
					"description": "The version of the daemon",
					"type": "string",
					"example": "19.03.12"
				},
				"ApiVersion": {
					"description": "The default (and highest) API version that is supported by the daemon\n",
					"type": "string",
					"example": "1.40"
				},
				"MinAPIVersion": {
					"description": "The minimum API version that is supported by the daemon\n",
					"type": "string",
					"example": "1.12"
				},
				"GitCommit": {
					"description": "The Git commit of the source code that was used to build the daemon\n",
					"type": "string",
					"example": "48a66213fe"
				},
				"GoVersion": {
					"description": "The version Go used to compile the daemon, and the version of the Go\nruntime in use.\n",
					"type": "string",
					"example": "go1.13.14"
				},
				"Os": {
					"description": "The operating system that the daemon is running on (\"linux\" or \"windows\")\n",
					"type": "string",
					"example": "linux"
				},
				"Arch": {
					"description": "The architecture that the daemon is running on\n",
					"type": "string",
					"example": "amd64"
				},
				"KernelVersion": {
					"description": "The kernel version (`uname -r`) that the daemon is running on.\n\nThis field is omitted when empty.\n",
					"type": "string",
					"example": "4.19.76-linuxkit"
				},
				"Experimental": {
					"description": "Indicates if the daemon is started with experimental features enabled.\n\nThis field is omitted when empty / false.\n",
					"type": "boolean",
					"example": true
				},
				"BuildTime": {
					"description": "The date and time that the daemon was compiled.\n",
					"type": "string",
					"example": "2020-06-22T15:49:27.000000000+00:00"
				}
			}
		},
		"SystemInfo": {
			"type": "object",
			"properties": {
				"ID": {
					"description": "Unique identifier of the daemon.\n\n<p><br /></p>\n\n> **Note**: The format of the ID itself is not part of the API, and\n> should not be considered stable.\n",
					"type": "string",
					"example": "7TRN:IPZB:QYBB:VPBQ:UMPP:KARE:6ZNR:XE6T:7EWV:PKF4:ZOJD:TPYS"
				},
				"Containers": {
					"description": "Total number of containers on the host.",
					"type": "integer",
					"example": 14
				},
				"ContainersRunning": {
					"description": "Number of containers with status `\"running\"`.\n",
					"type": "integer",
					"example": 3
				},
				"ContainersPaused": {
					"description": "Number of containers with status `\"paused\"`.\n",
					"type": "integer",
					"example": 1
				},
				"ContainersStopped": {
					"description": "Number of containers with status `\"stopped\"`.\n",
					"type": "integer",
					"example": 10
				},
				"Images": {
					"description": "Total number of images on the host.\n\nBoth _tagged_ and _untagged_ (dangling) images are counted.\n",
					"type": "integer",
					"example": 508
				},
				"Driver": {
					"description": "Name of the storage driver in use.",
					"type": "string",
					"example": "overlay2"
				},
				"DriverStatus": {
					"description": "Information specific to the storage driver, provided as\n\"label\" / \"value\" pairs.\n\nThis information is provided by the storage driver, and formatted\nin a way consistent with the output of `docker info` on the command\nline.\n\n<p><br /></p>\n\n> **Note**: The information returned in this field, including the\n> formatting of values and labels, should not be considered stable,\n> and may change without notice.\n",
					"type": "array",
					"items": {
						"type": "array",
						"items": {
							"type": "string"
						}
					},
					"example": [
						[
							"Backing Filesystem",
							"extfs"
						],
						[
							"Supports d_type",
							"true"
						],
						[
							"Native Overlay Diff",
							"true"
						]
					]
				},
				"DockerRootDir": {
					"description": "Root directory of persistent Docker state.\n\nDefaults to `/var/lib/docker` on Linux, and `C:\\ProgramData\\docker`\non Windows.\n",
					"type": "string",
					"example": "/var/lib/docker"
				},
				"Plugins": {
					"$ref": "#/definitions/PluginsInfo"
				},
				"MemoryLimit": {
					"description": "Indicates if the host has memory limit support enabled.",
					"type": "boolean",
					"example": true
				},
				"SwapLimit": {
					"description": "Indicates if the host has memory swap limit support enabled.",
					"type": "boolean",
					"example": true
				},
				"KernelMemory": {
					"description": "Indicates if the host has kernel memory limit support enabled.\n\n<p><br /></p>\n\n> **Deprecated**: This field is deprecated as the kernel 5.4 deprecated\n> `kmem.limit_in_bytes`.\n",
					"type": "boolean",
					"example": true
				},
				"CpuCfsPeriod": {
					"description": "Indicates if CPU CFS(Completely Fair Scheduler) period is supported by\nthe host.\n",
					"type": "boolean",
					"example": true
				},
				"CpuCfsQuota": {
					"description": "Indicates if CPU CFS(Completely Fair Scheduler) quota is supported by\nthe host.\n",
					"type": "boolean",
					"example": true
				},
				"CPUShares": {
					"description": "Indicates if CPU Shares limiting is supported by the host.\n",
					"type": "boolean",
					"example": true
				},
				"CPUSet": {
					"description": "Indicates if CPUsets (cpuset.cpus, cpuset.mems) are supported by the host.\n\nSee [cpuset(7)](https://www.kernel.org/doc/Documentation/cgroup-v1/cpusets.txt)\n",
					"type": "boolean",
					"example": true
				},
				"PidsLimit": {
					"description": "Indicates if the host kernel has PID limit support enabled.",
					"type": "boolean",
					"example": true
				},
				"OomKillDisable": {
					"description": "Indicates if OOM killer disable is supported on the host.",
					"type": "boolean"
				},
				"IPv4Forwarding": {
					"description": "Indicates IPv4 forwarding is enabled.",
					"type": "boolean",
					"example": true
				},
				"BridgeNfIptables": {
					"description": "Indicates if `bridge-nf-call-iptables` is available on the host.",
					"type": "boolean",
					"example": true
				},
				"BridgeNfIp6tables": {
					"description": "Indicates if `bridge-nf-call-ip6tables` is available on the host.",
					"type": "boolean",
					"example": true
				},
				"Debug": {
					"description": "Indicates if the daemon is running in debug-mode / with debug-level\nlogging enabled.\n",
					"type": "boolean",
					"example": true
				},
				"NFd": {
					"description": "The total number of file Descriptors in use by the daemon process.\n\nThis information is only returned if debug-mode is enabled.\n",
					"type": "integer",
					"example": 64
				},
				"NGoroutines": {
					"description": "The  number of goroutines that currently exist.\n\nThis information is only returned if debug-mode is enabled.\n",
					"type": "integer",
					"example": 174
				},
				"SystemTime": {
					"description": "Current system-time in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)\nformat with nano-seconds.\n",
					"type": "string",
					"example": "2017-08-08T20:28:29.06202363Z"
				},
				"LoggingDriver": {
					"description": "The logging driver to use as a default for new containers.\n",
					"type": "string"
				},
				"CgroupDriver": {
					"description": "The driver to use for managing cgroups.\n",
					"type": "string",
					"enum": [
						"cgroupfs",
						"systemd",
						"none"
					],
					"default": "cgroupfs",
					"example": "cgroupfs"
				},
				"CgroupVersion": {
					"description": "The version of the cgroup.\n",
					"type": "string",
					"enum": [
						"1",
						"2"
					],
					"default": "1",
					"example": "1"
				},
				"NEventsListener": {
					"description": "Number of event listeners subscribed.",
					"type": "integer",
					"example": 30
				},
				"KernelVersion": {
					"description": "Kernel version of the host.\n\nOn Linux, this information obtained from `uname`. On Windows this\ninformation is queried from the <kbd>HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\</kbd>\nregistry value, for example _\"10.0 14393 (14393.1198.amd64fre.rs1_release_sec.170427-1353)\"_.\n",
					"type": "string",
					"example": "4.9.38-moby"
				},
				"OperatingSystem": {
					"description": "Name of the host's operating system, for example: \"Ubuntu 16.04.2 LTS\"\nor \"Windows Server 2016 Datacenter\"\n",
					"type": "string",
					"example": "Alpine Linux v3.5"
				},
				"OSVersion": {
					"description": "Version of the host's operating system\n\n<p><br /></p>\n\n> **Note**: The information returned in this field, including its\n> very existence, and the formatting of values, should not be considered\n> stable, and may change without notice.\n",
					"type": "string",
					"example": "16.04"
				},
				"OSType": {
					"description": "Generic type of the operating system of the host, as returned by the\nGo runtime (`GOOS`).\n\nCurrently returned values are \"linux\" and \"windows\". A full list of\npossible values can be found in the [Go documentation](https://golang.org/doc/install/source#environment).\n",
					"type": "string",
					"example": "linux"
				},
				"Architecture": {
					"description": "Hardware architecture of the host, as returned by the Go runtime\n(`GOARCH`).\n\nA full list of possible values can be found in the [Go documentation](https://golang.org/doc/install/source#environment).\n",
					"type": "string",
					"example": "x86_64"
				},
				"NCPU": {
					"description": "The number of logical CPUs usable by the daemon.\n\nThe number of available CPUs is checked by querying the operating\nsystem when the daemon starts. Changes to operating system CPU\nallocation after the daemon is started are not reflected.\n",
					"type": "integer",
					"example": 4
				},
				"MemTotal": {
					"description": "Total amount of physical memory available on the host, in bytes.\n",
					"type": "integer",
					"format": "int64",
					"example": 2095882240
				},
				"IndexServerAddress": {
					"description": "Address / URL of the index server that is used for image search,\nand as a default for user authentication for Docker Hub and Docker Cloud.\n",
					"default": "https://index.docker.io/v1/",
					"type": "string",
					"example": "https://index.docker.io/v1/"
				},
				"RegistryConfig": {
					"$ref": "#/definitions/RegistryServiceConfig"
				},
				"GenericResources": {
					"$ref": "#/definitions/GenericResources"
				},
				"HttpProxy": {
					"description": "HTTP-proxy configured for the daemon. This value is obtained from the\n[`HTTP_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable.\nCredentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL\nare masked in the API response.\n\nContainers do not automatically inherit this configuration.\n",
					"type": "string",
					"example": "http://xxxxx:xxxxx@proxy.corp.example.com:8080"
				},
				"HttpsProxy": {
					"description": "HTTPS-proxy configured for the daemon. This value is obtained from the\n[`HTTPS_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable.\nCredentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL\nare masked in the API response.\n\nContainers do not automatically inherit this configuration.\n",
					"type": "string",
					"example": "https://xxxxx:xxxxx@proxy.corp.example.com:4443"
				},
				"NoProxy": {
					"description": "Comma-separated list of domain extensions for which no proxy should be\nused. This value is obtained from the [`NO_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html)\nenvironment variable.\n\nContainers do not automatically inherit this configuration.\n",
					"type": "string",
					"example": "*.local, 169.254/16"
				},
				"Name": {
					"description": "Hostname of the host.",
					"type": "string",
					"example": "node5.corp.example.com"
				},
				"Labels": {
					"description": "User-defined labels (key/value metadata) as set on the daemon.\n\n<p><br /></p>\n\n> **Note**: When part of a Swarm, nodes can both have _daemon_ labels,\n> set through the daemon configuration, and _node_ labels, set from a\n> manager node in the Swarm. Node labels are not included in this\n> field. Node labels can be retrieved using the `/nodes/(id)` endpoint\n> on a manager node in the Swarm.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"storage=ssd",
						"production"
					]
				},
				"ExperimentalBuild": {
					"description": "Indicates if experimental features are enabled on the daemon.\n",
					"type": "boolean",
					"example": true
				},
				"ServerVersion": {
					"description": "Version string of the daemon.\n\n> **Note**: the [standalone Swarm API](https://docs.docker.com/swarm/swarm-api/)\n> returns the Swarm version instead of the daemon  version, for example\n> `swarm/1.2.8`.\n",
					"type": "string",
					"example": "17.06.0-ce"
				},
				"ClusterStore": {
					"description": "URL of the distributed storage backend.\n\n\nThe storage backend is used for multihost networking (to store\nnetwork and endpoint information) and by the node discovery mechanism.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when using standalone Swarm\n> mode, and overlay networking using an external k/v store. Overlay\n> networks with Swarm mode enabled use the built-in raft store, and\n> this field will be empty.\n",
					"type": "string",
					"example": "consul://consul.corp.example.com:8600/some/path"
				},
				"ClusterAdvertise": {
					"description": "The network endpoint that the Engine advertises for the purpose of\nnode discovery. ClusterAdvertise is a `host:port` combination on which\nthe daemon is reachable by other hosts.\n\n<p><br /></p>\n\n> **Deprecated**: This field is only propagated when using standalone Swarm\n> mode, and overlay networking using an external k/v store. Overlay\n> networks with Swarm mode enabled use the built-in raft store, and\n> this field will be empty.\n",
					"type": "string",
					"example": "node5.corp.example.com:8000"
				},
				"Runtimes": {
					"description": "List of [OCI compliant](https://github.com/opencontainers/runtime-spec)\nruntimes configured on the daemon. Keys hold the \"name\" used to\nreference the runtime.\n\nThe Docker daemon relies on an OCI compliant runtime (invoked via the\n`containerd` daemon) as its interface to the Linux kernel namespaces,\ncgroups, and SELinux.\n\nThe default runtime is `runc`, and automatically configured. Additional\nruntimes can be configured by the user and will be listed here.\n",
					"type": "object",
					"additionalProperties": {
						"$ref": "#/definitions/Runtime"
					},
					"default": {
						"runc": {
							"path": "runc"
						}
					},
					"example": {
						"runc": {
							"path": "runc"
						},
						"runc-master": {
							"path": "/go/bin/runc"
						},
						"custom": {
							"path": "/usr/local/bin/my-oci-runtime",
							"runtimeArgs": [
								"--debug",
								"--systemd-cgroup=false"
							]
						}
					}
				},
				"DefaultRuntime": {
					"description": "Name of the default OCI runtime that is used when starting containers.\n\nThe default can be overridden per-container at create time.\n",
					"type": "string",
					"default": "runc",
					"example": "runc"
				},
				"Swarm": {
					"$ref": "#/definitions/SwarmInfo"
				},
				"LiveRestoreEnabled": {
					"description": "Indicates if live restore is enabled.\n\nIf enabled, containers are kept running when the daemon is shutdown\nor upon daemon start if running containers are detected.\n",
					"type": "boolean",
					"default": false,
					"example": false
				},
				"Isolation": {
					"description": "Represents the isolation technology to use as a default for containers.\nThe supported values are platform-specific.\n\nIf no isolation value is specified on daemon start, on Windows client,\nthe default is `hyperv`, and on Windows server, the default is `process`.\n\nThis option is currently not used on other platforms.\n",
					"default": "default",
					"type": "string",
					"enum": [
						"default",
						"hyperv",
						"process"
					]
				},
				"InitBinary": {
					"description": "Name and, optional, path of the `docker-init` binary.\n\nIf the path is omitted, the daemon searches the host's `$PATH` for the\nbinary and uses the first result.\n",
					"type": "string",
					"example": "docker-init"
				},
				"ContainerdCommit": {
					"$ref": "#/definitions/Commit"
				},
				"RuncCommit": {
					"$ref": "#/definitions/Commit"
				},
				"InitCommit": {
					"$ref": "#/definitions/Commit"
				},
				"SecurityOptions": {
					"description": "List of security features that are enabled on the daemon, such as\napparmor, seccomp, SELinux, user-namespaces (userns), and rootless.\n\nAdditional configuration options for each security feature may\nbe present, and are included as a comma-separated list of key/value\npairs.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"name=apparmor",
						"name=seccomp,profile=default",
						"name=selinux",
						"name=userns",
						"name=rootless"
					]
				},
				"ProductLicense": {
					"description": "Reports a summary of the product license on the daemon.\n\nIf a commercial license has been applied to the daemon, information\nsuch as number of nodes, and expiration are included.\n",
					"type": "string",
					"example": "Community Engine"
				},
				"DefaultAddressPools": {
					"description": "List of custom default address pools for local networks, which can be\nspecified in the daemon.json file or dockerd option.\n\nExample: a Base \"10.10.0.0/16\" with Size 24 will define the set of 256\n10.10.[0-255].0/24 address pools.\n",
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"Base": {
								"description": "The network address in CIDR format",
								"type": "string",
								"example": "10.10.0.0/16"
							},
							"Size": {
								"description": "The network pool size",
								"type": "integer",
								"example": "24"
							}
						}
					}
				},
				"Warnings": {
					"description": "List of warnings / informational messages about missing features, or\nissues related to the daemon configuration.\n\nThese messages can be printed by the client as information to the user.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"WARNING: No memory limit support",
						"WARNING: bridge-nf-call-iptables is disabled",
						"WARNING: bridge-nf-call-ip6tables is disabled"
					]
				}
			}
		},
		"PluginsInfo": {
			"description": "Available plugins per type.\n\n<p><br /></p>\n\n> **Note**: Only unmanaged (V1) plugins are included in this list.\n> V1 plugins are \"lazily\" loaded, and are not returned in this list\n> if there is no resource using the plugin.\n",
			"type": "object",
			"properties": {
				"Volume": {
					"description": "Names of available volume-drivers, and network-driver plugins.",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"local"
					]
				},
				"Network": {
					"description": "Names of available network-drivers, and network-driver plugins.",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"bridge",
						"host",
						"ipvlan",
						"macvlan",
						"null",
						"overlay"
					]
				},
				"Authorization": {
					"description": "Names of available authorization plugins.",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"img-authz-plugin",
						"hbm"
					]
				},
				"Log": {
					"description": "Names of available logging-drivers, and logging-driver plugins.",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"awslogs",
						"fluentd",
						"gcplogs",
						"gelf",
						"journald",
						"json-file",
						"logentries",
						"splunk",
						"syslog"
					]
				}
			}
		},
		"RegistryServiceConfig": {
			"description": "RegistryServiceConfig stores daemon registry services configuration.\n",
			"type": "object",
			"x-nullable": true,
			"properties": {
				"AllowNondistributableArtifactsCIDRs": {
					"description": "List of IP ranges to which nondistributable artifacts can be pushed,\nusing the CIDR syntax [RFC 4632](https://tools.ietf.org/html/4632).\n\nSome images (for example, Windows base images) contain artifacts\nwhose distribution is restricted by license. When these images are\npushed to a registry, restricted artifacts are not included.\n\nThis configuration override this behavior, and enables the daemon to\npush nondistributable artifacts to all registries whose resolved IP\naddress is within the subnet described by the CIDR syntax.\n\nThis option is useful when pushing images containing\nnondistributable artifacts to a registry on an air-gapped network so\nhosts on that network can pull the images without connecting to\nanother server.\n\n> **Warning**: Nondistributable artifacts typically have restrictions\n> on how and where they can be distributed and shared. Only use this\n> feature to push artifacts to private registries and ensure that you\n> are in compliance with any terms that cover redistributing\n> nondistributable artifacts.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"::1/128",
						"127.0.0.0/8"
					]
				},
				"AllowNondistributableArtifactsHostnames": {
					"description": "List of registry hostnames to which nondistributable artifacts can be\npushed, using the format `<hostname>[:<port>]` or `<IP address>[:<port>]`.\n\nSome images (for example, Windows base images) contain artifacts\nwhose distribution is restricted by license. When these images are\npushed to a registry, restricted artifacts are not included.\n\nThis configuration override this behavior for the specified\nregistries.\n\nThis option is useful when pushing images containing\nnondistributable artifacts to a registry on an air-gapped network so\nhosts on that network can pull the images without connecting to\nanother server.\n\n> **Warning**: Nondistributable artifacts typically have restrictions\n> on how and where they can be distributed and shared. Only use this\n> feature to push artifacts to private registries and ensure that you\n> are in compliance with any terms that cover redistributing\n> nondistributable artifacts.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"registry.internal.corp.example.com:3000",
						"[2001:db8:a0b:12f0::1]:443"
					]
				},
				"InsecureRegistryCIDRs": {
					"description": "List of IP ranges of insecure registries, using the CIDR syntax\n([RFC 4632](https://tools.ietf.org/html/4632)). Insecure registries\naccept un-encrypted (HTTP) and/or untrusted (HTTPS with certificates\nfrom unknown CAs) communication.\n\nBy default, local registries (`127.0.0.0/8`) are configured as\ninsecure. All other registries are secure. Communicating with an\ninsecure registry is not possible if the daemon assumes that registry\nis secure.\n\nThis configuration override this behavior, insecure communication with\nregistries whose resolved IP address is within the subnet described by\nthe CIDR syntax.\n\nRegistries can also be marked insecure by hostname. Those registries\nare listed under `IndexConfigs` and have their `Secure` field set to\n`false`.\n\n> **Warning**: Using this option can be useful when running a local\n> registry, but introduces security vulnerabilities. This option\n> should therefore ONLY be used for testing purposes. For increased\n> security, users should add their CA to their system's list of trusted\n> CAs instead of enabling this option.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"::1/128",
						"127.0.0.0/8"
					]
				},
				"IndexConfigs": {
					"type": "object",
					"additionalProperties": {
						"$ref": "#/definitions/IndexInfo"
					},
					"example": {
						"127.0.0.1:5000": {
							"Name": "127.0.0.1:5000",
							"Mirrors": [],
							"Secure": false,
							"Official": false
						},
						"[2001:db8:a0b:12f0::1]:80": {
							"Name": "[2001:db8:a0b:12f0::1]:80",
							"Mirrors": [],
							"Secure": false,
							"Official": false
						},
						"docker.io": {
							"Name": "docker.io",
							"Mirrors": [
								"https://hub-mirror.corp.example.com:5000/"
							],
							"Secure": true,
							"Official": true
						},
						"registry.internal.corp.example.com:3000": {
							"Name": "registry.internal.corp.example.com:3000",
							"Mirrors": [],
							"Secure": false,
							"Official": false
						}
					}
				},
				"Mirrors": {
					"description": "List of registry URLs that act as a mirror for the official\n(`docker.io`) registry.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"https://hub-mirror.corp.example.com:5000/",
						"https://[2001:db8:a0b:12f0::1]/"
					]
				}
			}
		},
		"IndexInfo": {
			"description": "IndexInfo contains information about a registry.",
			"type": "object",
			"x-nullable": true,
			"properties": {
				"Name": {
					"description": "Name of the registry, such as \"docker.io\".\n",
					"type": "string",
					"example": "docker.io"
				},
				"Mirrors": {
					"description": "List of mirrors, expressed as URIs.\n",
					"type": "array",
					"items": {
						"type": "string"
					},
					"example": [
						"https://hub-mirror.corp.example.com:5000/",
						"https://registry-2.docker.io/",
						"https://registry-3.docker.io/"
					]
				},
				"Secure": {
					"description": "Indicates if the registry is part of the list of insecure\nregistries.\n\nIf `false`, the registry is insecure. Insecure registries accept\nun-encrypted (HTTP) and/or untrusted (HTTPS with certificates from\nunknown CAs) communication.\n\n> **Warning**: Insecure registries can be useful when running a local\n> registry. However, because its use creates security vulnerabilities\n> it should ONLY be enabled for testing purposes. For increased\n> security, users should add their CA to their system's list of\n> trusted CAs instead of enabling this option.\n",
					"type": "boolean",
					"example": true
				},
				"Official": {
					"description": "Indicates whether this is an official registry (i.e., Docker Hub / docker.io)\n",
					"type": "boolean",
					"example": true
				}
			}
		},
		"Runtime": {
			"description": "Runtime describes an [OCI compliant](https://github.com/opencontainers/runtime-spec)\nruntime.\n\nThe runtime is invoked by the daemon via the `containerd` daemon. OCI\nruntimes act as an interface to the Linux kernel namespaces, cgroups,\nand SELinux.\n",
			"type": "object",
			"properties": {
				"path": {
					"description": "Name and, optional, path, of the OCI executable binary.\n\nIf the path is omitted, the daemon searches the host's `$PATH` for the\nbinary and uses the first result.\n",
					"type": "string",
					"example": "/usr/local/bin/my-oci-runtime"
				},
				"runtimeArgs": {
					"description": "List of command-line arguments to pass to the runtime when invoked.\n",
					"type": "array",
					"x-nullable": true,
					"items": {
						"type": "string"
					},
					"example": [
						"--debug",
						"--systemd-cgroup=false"
					]
				}
			}
		},
		"Commit": {
			"description": "Commit holds the Git-commit (SHA1) that a binary was built from, as\nreported in the version-string of external tools, such as `containerd`,\nor `runC`.\n",
			"type": "object",
			"properties": {
				"ID": {
					"description": "Actual commit ID of external tool.",
					"type": "string",
					"example": "cfb82a876ecc11b5ca0977d1733adbe58599088a"
				},
				"Expected": {
					"description": "Commit ID of external tool expected by dockerd as set at build time.\n",
					"type": "string",
					"example": "2d41c047c83e09a6d61d464906feb2a2f3c52aa4"
				}
			}
		},
		"SwarmInfo": {
			"description": "Represents generic information about swarm.\n",
			"type": "object",
			"properties": {
				"NodeID": {
					"description": "Unique identifier of for this node in the swarm.",
					"type": "string",
					"default": "",
					"example": "k67qz4598weg5unwwffg6z1m1"
				},
				"NodeAddr": {
					"description": "IP address at which this node can be reached by other nodes in the\nswarm.\n",
					"type": "string",
					"default": "",
					"example": "10.0.0.46"
				},
				"LocalNodeState": {
					"$ref": "#/definitions/LocalNodeState"
				},
				"ControlAvailable": {
					"type": "boolean",
					"default": false,
					"example": true
				},
				"Error": {
					"type": "string",
					"default": ""
				},
				"RemoteManagers": {
					"description": "List of ID's and addresses of other managers in the swarm.\n",
					"type": "array",
					"default": null,
					"x-nullable": true,
					"items": {
						"$ref": "#/definitions/PeerNode"
					},
					"example": [
						{
							"NodeID": "71izy0goik036k48jg985xnds",
							"Addr": "10.0.0.158:2377"
						},
						{
							"NodeID": "79y6h1o4gv8n120drcprv5nmc",
							"Addr": "10.0.0.159:2377"
						},
						{
							"NodeID": "k67qz4598weg5unwwffg6z1m1",
							"Addr": "10.0.0.46:2377"
						}
					]
				},
				"Nodes": {
					"description": "Total number of nodes in the swarm.",
					"type": "integer",
					"x-nullable": true,
					"example": 4
				},
				"Managers": {
					"description": "Total number of managers in the swarm.",
					"type": "integer",
					"x-nullable": true,
					"example": 3
				},
				"Cluster": {
					"$ref": "#/definitions/ClusterInfo"
				}
			}
		},
		"LocalNodeState": {
			"description": "Current local status of this node.",
			"type": "string",
			"default": "",
			"enum": [
				"",
				"inactive",
				"pending",
				"active",
				"error",
				"locked"
			],
			"example": "active"
		},
		"PeerNode": {
			"description": "Represents a peer-node in the swarm",
			"properties": {
				"NodeID": {
					"description": "Unique identifier of for this node in the swarm.",
					"type": "string"
				},
				"Addr": {
					"description": "IP address and ports at which this node can be reached.\n",
					"type": "string"
				}
			}
		},
		"NetworkAttachmentConfig": {
			"description": "Specifies how a service should be attached to a particular network.\n",
			"type": "object",
			"properties": {
				"Target": {
					"description": "The target network for attachment. Must be a network name or ID.\n",
					"type": "string"
				},
				"Aliases": {
					"description": "Discoverable alternate names for the service on this network.\n",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"DriverOpts": {
					"description": "Driver attachment options for the network target.\n",
					"type": "object",
					"additionalProperties": {
						"type": "string"
					}
				}
			}
		}
	},
	"paths": {
		"/containers/json": {
			"get": {
				"summary": "List containers",
				"description": "Returns a list of containers. For details on the format, see the\n[inspect endpoint](#operation/ContainerInspect).\n\nNote that it uses a different, smaller representation of a container\nthan inspecting a single container. For example, the list of linked\ncontainers is not propagated .\n",
				"operationId": "ContainerList",
				"produces": [
					"application/json"
				],
				"parameters": [
					{
						"name": "all",
						"in": "query",
						"description": "Return all containers. By default, only running containers are shown.\n",
						"type": "boolean",
						"default": false
					},
					{
						"name": "limit",
						"in": "query",
						"description": "Return this number of most recently created containers, including\nnon-running ones.\n",
						"type": "integer"
					},
					{
						"name": "size",
						"in": "query",
						"description": "Return the size of container as fields `SizeRw` and `SizeRootFs`.\n",
						"type": "boolean",
						"default": false
					},
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the container list, encoded as JSON (a\n`map[string][]string`). For example, `{\"status\": [\"paused\"]}` will\nonly return paused containers.\n\nAvailable filters:\n\n- `ancestor`=(`<image-name>[:<tag>]`, `<image id>`, or `<image@digest>`)\n- `before`=(`<container id>` or `<container name>`)\n- `expose`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)\n- `exited=<int>` containers with exit code of `<int>`\n- `health`=(`starting`|`healthy`|`unhealthy`|`none`)\n- `id=<ID>` a container's ID\n- `isolation=`(`default`|`process`|`hyperv`) (Windows daemon only)\n- `is-task=`(`true`|`false`)\n- `label=key` or `label=\"key=value\"` of a container label\n- `name=<name>` a container's name\n- `network`=(`<network id>` or `<network name>`)\n- `publish`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)\n- `since`=(`<container id>` or `<container name>`)\n- `status=`(`created`|`restarting`|`running`|`removing`|`paused`|`exited`|`dead`)\n- `volume`=(`<volume name>` or `<mount point destination>`)\n",
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/ContainerSummary"
						},
						"examples": {
							"application/json": [
								{
									"Id": "8dfafdbc3a40",
									"Names": [
										"/boring_feynman"
									],
									"Image": "ubuntu:latest",
									"ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
									"Command": "echo 1",
									"Created": 1367854155,
									"State": "Exited",
									"Status": "Exit 0",
									"Ports": [
										{
											"PrivatePort": 2222,
											"PublicPort": 3333,
											"Type": "tcp"
										}
									],
									"Labels": {
										"com.example.vendor": "Acme",
										"com.example.license": "GPL",
										"com.example.version": "1.0"
									},
									"SizeRw": 12288,
									"SizeRootFs": 0,
									"HostConfig": {
										"NetworkMode": "default"
									},
									"NetworkSettings": {
										"Networks": {
											"bridge": {
												"NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
												"EndpointID": "2cdc4edb1ded3631c81f57966563e5c8525b81121bb3706a9a9a3ae102711f3f",
												"Gateway": "172.17.0.1",
												"IPAddress": "172.17.0.2",
												"IPPrefixLen": 16,
												"IPv6Gateway": "",
												"GlobalIPv6Address": "",
												"GlobalIPv6PrefixLen": 0,
												"MacAddress": "02:42:ac:11:00:02"
											}
										}
									},
									"Mounts": [
										{
											"Name": "fac362...80535",
											"Source": "/data",
											"Destination": "/data",
											"Driver": "local",
											"Mode": "ro,Z",
											"RW": false,
											"Propagation": ""
										}
									]
								},
								{
									"Id": "9cd87474be90",
									"Names": [
										"/coolName"
									],
									"Image": "ubuntu:latest",
									"ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
									"Command": "echo 222222",
									"Created": 1367854155,
									"State": "Exited",
									"Status": "Exit 0",
									"Ports": [],
									"Labels": {},
									"SizeRw": 12288,
									"SizeRootFs": 0,
									"HostConfig": {
										"NetworkMode": "default"
									},
									"NetworkSettings": {
										"Networks": {
											"bridge": {
												"NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
												"EndpointID": "88eaed7b37b38c2a3f0c4bc796494fdf51b270c2d22656412a2ca5d559a64d7a",
												"Gateway": "172.17.0.1",
												"IPAddress": "172.17.0.8",
												"IPPrefixLen": 16,
												"IPv6Gateway": "",
												"GlobalIPv6Address": "",
												"GlobalIPv6PrefixLen": 0,
												"MacAddress": "02:42:ac:11:00:08"
											}
										}
									},
									"Mounts": []
								},
								{
									"Id": "3176a2479c92",
									"Names": [
										"/sleepy_dog"
									],
									"Image": "ubuntu:latest",
									"ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
									"Command": "echo 3333333333333333",
									"Created": 1367854154,
									"State": "Exited",
									"Status": "Exit 0",
									"Ports": [],
									"Labels": {},
									"SizeRw": 12288,
									"SizeRootFs": 0,
									"HostConfig": {
										"NetworkMode": "default"
									},
									"NetworkSettings": {
										"Networks": {
											"bridge": {
												"NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
												"EndpointID": "8b27c041c30326d59cd6e6f510d4f8d1d570a228466f956edf7815508f78e30d",
												"Gateway": "172.17.0.1",
												"IPAddress": "172.17.0.6",
												"IPPrefixLen": 16,
												"IPv6Gateway": "",
												"GlobalIPv6Address": "",
												"GlobalIPv6PrefixLen": 0,
												"MacAddress": "02:42:ac:11:00:06"
											}
										}
									},
									"Mounts": []
								},
								{
									"Id": "4cb07b47f9fb",
									"Names": [
										"/running_cat"
									],
									"Image": "ubuntu:latest",
									"ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
									"Command": "echo 444444444444444444444444444444444",
									"Created": 1367854152,
									"State": "Exited",
									"Status": "Exit 0",
									"Ports": [],
									"Labels": {},
									"SizeRw": 12288,
									"SizeRootFs": 0,
									"HostConfig": {
										"NetworkMode": "default"
									},
									"NetworkSettings": {
										"Networks": {
											"bridge": {
												"NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
												"EndpointID": "d91c7b2f0644403d7ef3095985ea0e2370325cd2332ff3a3225c4247328e66e9",
												"Gateway": "172.17.0.1",
												"IPAddress": "172.17.0.5",
												"IPPrefixLen": 16,
												"IPv6Gateway": "",
												"GlobalIPv6Address": "",
												"GlobalIPv6PrefixLen": 0,
												"MacAddress": "02:42:ac:11:00:05"
											}
										}
									},
									"Mounts": []
								}
							]
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Container"
				]
			}
		},
		"/containers/create": {
			"post": {
				"summary": "Create a container",
				"operationId": "ContainerCreate",
				"consumes": [
					"application/json",
					"application/octet-stream"
				],
				"produces": [
					"application/json"
				],
				"parameters": [
					{
						"name": "name",
						"in": "query",
						"description": "Assign the specified name to the container. Must match\n`/?[a-zA-Z0-9][a-zA-Z0-9_.-]+`.\n",
						"type": "string",
						"pattern": "^/?[a-zA-Z0-9][a-zA-Z0-9_.-]+$"
					},
					{
						"name": "body",
						"in": "body",
						"description": "Container to create",
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ContainerConfig"
								},
								{
									"type": "object",
									"properties": {
										"HostConfig": {
											"$ref": "#/definitions/HostConfig"
										},
										"NetworkingConfig": {
											"$ref": "#/definitions/NetworkingConfig"
										}
									}
								}
							],
							"example": {
								"Hostname": "",
								"Domainname": "",
								"User": "",
								"AttachStdin": false,
								"AttachStdout": true,
								"AttachStderr": true,
								"Tty": false,
								"OpenStdin": false,
								"StdinOnce": false,
								"Env": [
									"FOO=bar",
									"BAZ=quux"
								],
								"Cmd": [
									"date"
								],
								"Entrypoint": "",
								"Image": "ubuntu",
								"Labels": {
									"com.example.vendor": "Acme",
									"com.example.license": "GPL",
									"com.example.version": "1.0"
								},
								"Volumes": {
									"/volumes/data": {}
								},
								"WorkingDir": "",
								"NetworkDisabled": false,
								"MacAddress": "12:34:56:78:9a:bc",
								"ExposedPorts": {
									"22/tcp": {}
								},
								"StopSignal": "SIGTERM",
								"StopTimeout": 10,
								"HostConfig": {
									"Binds": [
										"/tmp:/tmp"
									],
									"Links": [
										"redis3:redis"
									],
									"Memory": 0,
									"MemorySwap": 0,
									"MemoryReservation": 0,
									"KernelMemory": 0,
									"NanoCPUs": 500000,
									"CpuPercent": 80,
									"CpuShares": 512,
									"CpuPeriod": 100000,
									"CpuRealtimePeriod": 1000000,
									"CpuRealtimeRuntime": 10000,
									"CpuQuota": 50000,
									"CpusetCpus": "0,1",
									"CpusetMems": "0,1",
									"MaximumIOps": 0,
									"MaximumIOBps": 0,
									"BlkioWeight": 300,
									"BlkioWeightDevice": [
										{}
									],
									"BlkioDeviceReadBps": [
										{}
									],
									"BlkioDeviceReadIOps": [
										{}
									],
									"BlkioDeviceWriteBps": [
										{}
									],
									"BlkioDeviceWriteIOps": [
										{}
									],
									"DeviceRequests": [
										{
											"Driver": "nvidia",
											"Count": -1,
											"DeviceIDs\"": [
												"0",
												"1",
												"GPU-fef8089b-4820-abfc-e83e-94318197576e"
											],
											"Capabilities": [
												[
													"gpu",
													"nvidia",
													"compute"
												]
											],
											"Options": {
												"property1": "string",
												"property2": "string"
											}
										}
									],
									"MemorySwappiness": 60,
									"OomKillDisable": false,
									"OomScoreAdj": 500,
									"PidMode": "",
									"PidsLimit": 0,
									"PortBindings": {
										"22/tcp": [
											{
												"HostPort": "11022"
											}
										]
									},
									"PublishAllPorts": false,
									"Privileged": false,
									"ReadonlyRootfs": false,
									"Dns": [
										"8.8.8.8"
									],
									"DnsOptions": [
										""
									],
									"DnsSearch": [
										""
									],
									"VolumesFrom": [
										"parent",
										"other:ro"
									],
									"CapAdd": [
										"NET_ADMIN"
									],
									"CapDrop": [
										"MKNOD"
									],
									"GroupAdd": [
										"newgroup"
									],
									"RestartPolicy": {
										"Name": "",
										"MaximumRetryCount": 0
									},
									"AutoRemove": true,
									"NetworkMode": "bridge",
									"Devices": [],
									"Ulimits": [
										{}
									],
									"LogConfig": {
										"Type": "json-file",
										"Config": {}
									},
									"SecurityOpt": [],
									"StorageOpt": {},
									"CgroupParent": "",
									"VolumeDriver": "",
									"ShmSize": 67108864
								},
								"NetworkingConfig": {
									"EndpointsConfig": {
										"isolated_nw": {
											"IPAMConfig": {
												"IPv4Address": "172.20.30.33",
												"IPv6Address": "2001:db8:abcd::3033",
												"LinkLocalIPs": [
													"169.254.34.68",
													"fe80::3468"
												]
											},
											"Links": [
												"container_1",
												"container_2"
											],
											"Aliases": [
												"server_x",
												"server_y"
											]
										}
									}
								}
							}
						},
						"required": true
					}
				],
				"responses": {
					"201": {
						"description": "Container created successfully",
						"schema": {
							"type": "object",
							"title": "ContainerCreateResponse",
							"description": "OK response to ContainerCreate operation",
							"required": [
								"Id",
								"Warnings"
							],
							"properties": {
								"Id": {
									"description": "The ID of the created container",
									"type": "string",
									"x-nullable": false
								},
								"Warnings": {
									"description": "Warnings encountered when creating the container",
									"type": "array",
									"x-nullable": false,
									"items": {
										"type": "string"
									}
								}
							}
						},
						"examples": {
							"application/json": {
								"Id": "e90e34656806",
								"Warnings": []
							}
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"409": {
						"description": "conflict",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/json": {
			"get": {
				"summary": "Inspect a container",
				"description": "Return low-level information about a container.",
				"operationId": "ContainerInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "ContainerInspectResponse",
							"properties": {
								"Id": {
									"description": "The ID of the container",
									"type": "string"
								},
								"Created": {
									"description": "The time the container was created",
									"type": "string"
								},
								"Path": {
									"description": "The path to the command being run",
									"type": "string"
								},
								"Args": {
									"description": "The arguments to the command being run",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"State": {
									"x-nullable": true,
									"$ref": "#/definitions/ContainerState"
								},
								"Image": {
									"description": "The container's image ID",
									"type": "string"
								},
								"ResolvConfPath": {
									"type": "string"
								},
								"HostnamePath": {
									"type": "string"
								},
								"HostsPath": {
									"type": "string"
								},
								"LogPath": {
									"type": "string"
								},
								"Name": {
									"type": "string"
								},
								"RestartCount": {
									"type": "integer"
								},
								"Driver": {
									"type": "string"
								},
								"Platform": {
									"type": "string"
								},
								"MountLabel": {
									"type": "string"
								},
								"ProcessLabel": {
									"type": "string"
								},
								"AppArmorProfile": {
									"type": "string"
								},
								"ExecIDs": {
									"description": "IDs of exec instances that are running in the container.",
									"type": "array",
									"items": {
										"type": "string"
									},
									"x-nullable": true
								},
								"HostConfig": {
									"$ref": "#/definitions/HostConfig"
								},
								"GraphDriver": {
									"$ref": "#/definitions/GraphDriverData"
								},
								"SizeRw": {
									"description": "The size of files that have been created or changed by this\ncontainer.\n",
									"type": "integer",
									"format": "int64"
								},
								"SizeRootFs": {
									"description": "The total size of all the files in this container.",
									"type": "integer",
									"format": "int64"
								},
								"Mounts": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/MountPoint"
									}
								},
								"Config": {
									"$ref": "#/definitions/ContainerConfig"
								},
								"NetworkSettings": {
									"$ref": "#/definitions/NetworkSettings"
								}
							}
						},
						"examples": {
							"application/json": {
								"AppArmorProfile": "",
								"Args": [
									"-c",
									"exit 9"
								],
								"Config": {
									"AttachStderr": true,
									"AttachStdin": false,
									"AttachStdout": true,
									"Cmd": [
										"/bin/sh",
										"-c",
										"exit 9"
									],
									"Domainname": "",
									"Env": [
										"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
									],
									"Healthcheck": {
										"Test": [
											"CMD-SHELL",
											"exit 0"
										]
									},
									"Hostname": "ba033ac44011",
									"Image": "ubuntu",
									"Labels": {
										"com.example.vendor": "Acme",
										"com.example.license": "GPL",
										"com.example.version": "1.0"
									},
									"MacAddress": "",
									"NetworkDisabled": false,
									"OpenStdin": false,
									"StdinOnce": false,
									"Tty": false,
									"User": "",
									"Volumes": {
										"/volumes/data": {}
									},
									"WorkingDir": "",
									"StopSignal": "SIGTERM",
									"StopTimeout": 10
								},
								"Created": "2015-01-06T15:47:31.485331387Z",
								"Driver": "devicemapper",
								"ExecIDs": [
									"b35395de42bc8abd327f9dd65d913b9ba28c74d2f0734eeeae84fa1c616a0fca",
									"3fc1232e5cd20c8de182ed81178503dc6437f4e7ef12b52cc5e8de020652f1c4"
								],
								"HostConfig": {
									"MaximumIOps": 0,
									"MaximumIOBps": 0,
									"BlkioWeight": 0,
									"BlkioWeightDevice": [
										{}
									],
									"BlkioDeviceReadBps": [
										{}
									],
									"BlkioDeviceWriteBps": [
										{}
									],
									"BlkioDeviceReadIOps": [
										{}
									],
									"BlkioDeviceWriteIOps": [
										{}
									],
									"ContainerIDFile": "",
									"CpusetCpus": "",
									"CpusetMems": "",
									"CpuPercent": 80,
									"CpuShares": 0,
									"CpuPeriod": 100000,
									"CpuRealtimePeriod": 1000000,
									"CpuRealtimeRuntime": 10000,
									"Devices": [],
									"DeviceRequests": [
										{
											"Driver": "nvidia",
											"Count": -1,
											"DeviceIDs\"": [
												"0",
												"1",
												"GPU-fef8089b-4820-abfc-e83e-94318197576e"
											],
											"Capabilities": [
												[
													"gpu",
													"nvidia",
													"compute"
												]
											],
											"Options": {
												"property1": "string",
												"property2": "string"
											}
										}
									],
									"IpcMode": "",
									"LxcConf": [],
									"Memory": 0,
									"MemorySwap": 0,
									"MemoryReservation": 0,
									"KernelMemory": 0,
									"OomKillDisable": false,
									"OomScoreAdj": 500,
									"NetworkMode": "bridge",
									"PidMode": "",
									"PortBindings": {},
									"Privileged": false,
									"ReadonlyRootfs": false,
									"PublishAllPorts": false,
									"RestartPolicy": {
										"MaximumRetryCount": 2,
										"Name": "on-failure"
									},
									"LogConfig": {
										"Type": "json-file"
									},
									"Sysctls": {
										"net.ipv4.ip_forward": "1"
									},
									"Ulimits": [
										{}
									],
									"VolumeDriver": "",
									"ShmSize": 67108864
								},
								"HostnamePath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/hostname",
								"HostsPath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/hosts",
								"LogPath": "/var/lib/docker/containers/1eb5fabf5a03807136561b3c00adcd2992b535d624d5e18b6cdc6a6844d9767b/1eb5fabf5a03807136561b3c00adcd2992b535d624d5e18b6cdc6a6844d9767b-json.log",
								"Id": "ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39",
								"Image": "04c5d3b7b0656168630d3ba35d8889bd0e9caafcaeb3004d2bfbc47e7c5d35d2",
								"MountLabel": "",
								"Name": "/boring_euclid",
								"NetworkSettings": {
									"Bridge": "",
									"SandboxID": "",
									"HairpinMode": false,
									"LinkLocalIPv6Address": "",
									"LinkLocalIPv6PrefixLen": 0,
									"SandboxKey": "",
									"EndpointID": "",
									"Gateway": "",
									"GlobalIPv6Address": "",
									"GlobalIPv6PrefixLen": 0,
									"IPAddress": "",
									"IPPrefixLen": 0,
									"IPv6Gateway": "",
									"MacAddress": "",
									"Networks": {
										"bridge": {
											"NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
											"EndpointID": "7587b82f0dada3656fda26588aee72630c6fab1536d36e394b2bfbcf898c971d",
											"Gateway": "172.17.0.1",
											"IPAddress": "172.17.0.2",
											"IPPrefixLen": 16,
											"IPv6Gateway": "",
											"GlobalIPv6Address": "",
											"GlobalIPv6PrefixLen": 0,
											"MacAddress": "02:42:ac:12:00:02"
										}
									}
								},
								"Path": "/bin/sh",
								"ProcessLabel": "",
								"ResolvConfPath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/resolv.conf",
								"RestartCount": 1,
								"State": {
									"Error": "",
									"ExitCode": 9,
									"FinishedAt": "2015-01-06T15:47:32.080254511Z",
									"Health": {
										"Status": "healthy",
										"FailingStreak": 0,
										"Log": [
											{
												"Start": "2019-12-22T10:59:05.6385933Z",
												"End": "2019-12-22T10:59:05.8078452Z",
												"ExitCode": 0,
												"Output": ""
											}
										]
									},
									"OOMKilled": false,
									"Dead": false,
									"Paused": false,
									"Pid": 0,
									"Restarting": false,
									"Running": true,
									"StartedAt": "2015-01-06T15:47:32.072697474Z",
									"Status": "running"
								},
								"Mounts": [
									{
										"Name": "fac362...80535",
										"Source": "/data",
										"Destination": "/data",
										"Driver": "local",
										"Mode": "ro,Z",
										"RW": false,
										"Propagation": ""
									}
								]
							}
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "size",
						"in": "query",
						"type": "boolean",
						"default": false,
						"description": "Return the size of container as fields `SizeRw` and `SizeRootFs`"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/top": {
			"get": {
				"summary": "List processes running inside a container",
				"description": "On Unix systems, this is done by running the `ps` command. This endpoint\nis not supported on Windows.\n",
				"operationId": "ContainerTop",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "ContainerTopResponse",
							"description": "OK response to ContainerTop operation",
							"properties": {
								"Titles": {
									"description": "The ps column titles",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"Processes": {
									"description": "Each process running in the container, where each is process\nis an array of values corresponding to the titles.\n",
									"type": "array",
									"items": {
										"type": "array",
										"items": {
											"type": "string"
										}
									}
								}
							}
						},
						"examples": {
							"application/json": {
								"Titles": [
									"UID",
									"PID",
									"PPID",
									"C",
									"STIME",
									"TTY",
									"TIME",
									"CMD"
								],
								"Processes": [
									[
										"root",
										"13642",
										"882",
										"0",
										"17:03",
										"pts/0",
										"00:00:00",
										"/bin/bash"
									],
									[
										"root",
										"13735",
										"13642",
										"0",
										"17:06",
										"pts/0",
										"00:00:00",
										"sleep 10"
									]
								]
							}
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "ps_args",
						"in": "query",
						"description": "The arguments to pass to `ps`. For example, `aux`",
						"type": "string",
						"default": "-ef"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/logs": {
			"get": {
				"summary": "Get container logs",
				"description": "Get `stdout` and `stderr` logs from a container.\n\nNote: This endpoint works only for containers with the `json-file` or\n`journald` logging driver.\n",
				"operationId": "ContainerLogs",
				"responses": {
					"200": {
						"description": "logs returned as a stream in response body.\nFor the stream format, [see the documentation for the attach endpoint](#operation/ContainerAttach).\nNote that unlike the attach endpoint, the logs endpoint does not\nupgrade the connection and does not set Content-Type.\n",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "follow",
						"in": "query",
						"description": "Keep connection after returning logs.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdout",
						"in": "query",
						"description": "Return logs from `stdout`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stderr",
						"in": "query",
						"description": "Return logs from `stderr`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "since",
						"in": "query",
						"description": "Only return logs since this time, as a UNIX timestamp",
						"type": "integer",
						"default": 0
					},
					{
						"name": "until",
						"in": "query",
						"description": "Only return logs before this time, as a UNIX timestamp",
						"type": "integer",
						"default": 0
					},
					{
						"name": "timestamps",
						"in": "query",
						"description": "Add timestamps to every log line",
						"type": "boolean",
						"default": false
					},
					{
						"name": "tail",
						"in": "query",
						"description": "Only return this number of log lines from the end of the logs.\nSpecify as an integer or `all` to output all log lines.\n",
						"type": "string",
						"default": "all"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/changes": {
			"get": {
				"summary": "Get changes on a container’s filesystem",
				"description": "Returns which files in a container's filesystem have been added, deleted,\nor modified. The `Kind` of modification can be one of:\n\n- `0`: Modified\n- `1`: Added\n- `2`: Deleted\n",
				"operationId": "ContainerChanges",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "The list of changes",
						"schema": {
							"type": "array",
							"items": {
								"type": "object",
								"x-go-name": "ContainerChangeResponseItem",
								"title": "ContainerChangeResponseItem",
								"description": "change item in response to ContainerChanges operation",
								"required": [
									"Path",
									"Kind"
								],
								"properties": {
									"Path": {
										"description": "Path to file that has changed",
										"type": "string",
										"x-nullable": false
									},
									"Kind": {
										"description": "Kind of change",
										"type": "integer",
										"format": "uint8",
										"enum": [
											0,
											1,
											2
										],
										"x-nullable": false
									}
								}
							}
						},
						"examples": {
							"application/json": [
								{
									"Path": "/dev",
									"Kind": 0
								},
								{
									"Path": "/dev/kmsg",
									"Kind": 1
								},
								{
									"Path": "/test",
									"Kind": 1
								}
							]
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/export": {
			"get": {
				"summary": "Export a container",
				"description": "Export the contents of a container as a tarball.",
				"operationId": "ContainerExport",
				"produces": [
					"application/octet-stream"
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/stats": {
			"get": {
				"summary": "Get container stats based on resource usage",
				"description": "This endpoint returns a live stream of a container’s resource usage\nstatistics.\n\nThe `precpu_stats` is the CPU statistic of the *previous* read, and is\nused to calculate the CPU usage percentage. It is not an exact copy\nof the `cpu_stats` field.\n\nIf either `precpu_stats.online_cpus` or `cpu_stats.online_cpus` is\nnil then for compatibility with older daemons the length of the\ncorresponding `cpu_usage.percpu_usage` array should be used.\n\nOn a cgroup v2 host, the following fields are not set\n* `blkio_stats`: all fields other than `io_service_bytes_recursive`\n* `cpu_stats`: `cpu_usage.percpu_usage`\n* `memory_stats`: `max_usage` and `failcnt`\nAlso, `memory_stats.stats` fields are incompatible with cgroup v1.\n\nTo calculate the values shown by the `stats` command of the docker cli tool\nthe following formulas can be used:\n* used_memory = `memory_stats.usage - memory_stats.stats.cache`\n* available_memory = `memory_stats.limit`\n* Memory usage % = `(used_memory / available_memory) * 100.0`\n* cpu_delta = `cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage`\n* system_cpu_delta = `cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage`\n* number_cpus = `lenght(cpu_stats.cpu_usage.percpu_usage)` or `cpu_stats.online_cpus`\n* CPU usage % = `(cpu_delta / system_cpu_delta) * number_cpus * 100.0`\n",
				"operationId": "ContainerStats",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object"
						},
						"examples": {
							"application/json": {
								"read": "2015-01-08T22:57:31.547920715Z",
								"pids_stats": {
									"current": 3
								},
								"networks": {
									"eth0": {
										"rx_bytes": 5338,
										"rx_dropped": 0,
										"rx_errors": 0,
										"rx_packets": 36,
										"tx_bytes": 648,
										"tx_dropped": 0,
										"tx_errors": 0,
										"tx_packets": 8
									},
									"eth5": {
										"rx_bytes": 4641,
										"rx_dropped": 0,
										"rx_errors": 0,
										"rx_packets": 26,
										"tx_bytes": 690,
										"tx_dropped": 0,
										"tx_errors": 0,
										"tx_packets": 9
									}
								},
								"memory_stats": {
									"stats": {
										"total_pgmajfault": 0,
										"cache": 0,
										"mapped_file": 0,
										"total_inactive_file": 0,
										"pgpgout": 414,
										"rss": 6537216,
										"total_mapped_file": 0,
										"writeback": 0,
										"unevictable": 0,
										"pgpgin": 477,
										"total_unevictable": 0,
										"pgmajfault": 0,
										"total_rss": 6537216,
										"total_rss_huge": 6291456,
										"total_writeback": 0,
										"total_inactive_anon": 0,
										"rss_huge": 6291456,
										"hierarchical_memory_limit": 67108864,
										"total_pgfault": 964,
										"total_active_file": 0,
										"active_anon": 6537216,
										"total_active_anon": 6537216,
										"total_pgpgout": 414,
										"total_cache": 0,
										"inactive_anon": 0,
										"active_file": 0,
										"pgfault": 964,
										"inactive_file": 0,
										"total_pgpgin": 477
									},
									"max_usage": 6651904,
									"usage": 6537216,
									"failcnt": 0,
									"limit": 67108864
								},
								"blkio_stats": {},
								"cpu_stats": {
									"cpu_usage": {
										"percpu_usage": [
											8646879,
											24472255,
											36438778,
											30657443
										],
										"usage_in_usermode": 50000000,
										"total_usage": 100215355,
										"usage_in_kernelmode": 30000000
									},
									"system_cpu_usage": 739306590000000,
									"online_cpus": 4,
									"throttling_data": {
										"periods": 0,
										"throttled_periods": 0,
										"throttled_time": 0
									}
								},
								"precpu_stats": {
									"cpu_usage": {
										"percpu_usage": [
											8646879,
											24350896,
											36438778,
											30657443
										],
										"usage_in_usermode": 50000000,
										"total_usage": 100093996,
										"usage_in_kernelmode": 30000000
									},
									"system_cpu_usage": 9492140000000,
									"online_cpus": 4,
									"throttling_data": {
										"periods": 0,
										"throttled_periods": 0,
										"throttled_time": 0
									}
								}
							}
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "stream",
						"in": "query",
						"description": "Stream the output. If false, the stats will be output once and then\nit will disconnect.\n",
						"type": "boolean",
						"default": true
					},
					{
						"name": "one-shot",
						"in": "query",
						"description": "Only get a single stat instead of waiting for 2 cycles. Must be used\nwith `stream=false`.\n",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/resize": {
			"post": {
				"summary": "Resize a container TTY",
				"description": "Resize the TTY for a container.",
				"operationId": "ContainerResize",
				"consumes": [
					"application/octet-stream"
				],
				"produces": [
					"text/plain"
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "cannot resize container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "h",
						"in": "query",
						"description": "Height of the TTY session in characters",
						"type": "integer"
					},
					{
						"name": "w",
						"in": "query",
						"description": "Width of the TTY session in characters",
						"type": "integer"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/start": {
			"post": {
				"summary": "Start a container",
				"operationId": "ContainerStart",
				"responses": {
					"204": {
						"description": "no error"
					},
					"304": {
						"description": "container already started"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "detachKeys",
						"in": "query",
						"description": "Override the key sequence for detaching a container. Format is a\nsingle character `[a-Z]` or `ctrl-<value>` where `<value>` is one\nof: `a-z`, `@`, `^`, `[`, `,` or `_`.\n",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/stop": {
			"post": {
				"summary": "Stop a container",
				"operationId": "ContainerStop",
				"responses": {
					"204": {
						"description": "no error"
					},
					"304": {
						"description": "container already stopped"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "t",
						"in": "query",
						"description": "Number of seconds to wait before killing the container",
						"type": "integer"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/restart": {
			"post": {
				"summary": "Restart a container",
				"operationId": "ContainerRestart",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "t",
						"in": "query",
						"description": "Number of seconds to wait before killing the container",
						"type": "integer"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/kill": {
			"post": {
				"summary": "Kill a container",
				"description": "Send a POSIX signal to a container, defaulting to killing to the\ncontainer.\n",
				"operationId": "ContainerKill",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"409": {
						"description": "container is not running",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "Container d37cde0fe4ad63c3a7252023b2f9800282894247d145cb5933ddf6e52cc03a28 is not running"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "signal",
						"in": "query",
						"description": "Signal to send to the container as an integer or string (e.g. `SIGINT`)",
						"type": "string",
						"default": "SIGKILL"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/update": {
			"post": {
				"summary": "Update a container",
				"description": "Change various configuration options of a container without having to\nrecreate it.\n",
				"operationId": "ContainerUpdate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "The container has been updated.",
						"schema": {
							"type": "object",
							"title": "ContainerUpdateResponse",
							"description": "OK response to ContainerUpdate operation",
							"properties": {
								"Warnings": {
									"type": "array",
									"items": {
										"type": "string"
									}
								}
							}
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "update",
						"in": "body",
						"required": true,
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/Resources"
								},
								{
									"type": "object",
									"properties": {
										"RestartPolicy": {
											"$ref": "#/definitions/RestartPolicy"
										}
									}
								}
							],
							"example": {
								"BlkioWeight": 300,
								"CpuShares": 512,
								"CpuPeriod": 100000,
								"CpuQuota": 50000,
								"CpuRealtimePeriod": 1000000,
								"CpuRealtimeRuntime": 10000,
								"CpusetCpus": "0,1",
								"CpusetMems": "0",
								"Memory": 314572800,
								"MemorySwap": 514288000,
								"MemoryReservation": 209715200,
								"KernelMemory": 52428800,
								"RestartPolicy": {
									"MaximumRetryCount": 4,
									"Name": "on-failure"
								}
							}
						}
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/rename": {
			"post": {
				"summary": "Rename a container",
				"operationId": "ContainerRename",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"409": {
						"description": "name already in use",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "name",
						"in": "query",
						"required": true,
						"description": "New name for the container",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/pause": {
			"post": {
				"summary": "Pause a container",
				"description": "Use the freezer cgroup to suspend all processes in a container.\n\nTraditionally, when suspending a process the `SIGSTOP` signal is used,\nwhich is observable by the process being suspended. With the freezer\ncgroup the process is unaware, and unable to capture, that it is being\nsuspended, and subsequently resumed.\n",
				"operationId": "ContainerPause",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/unpause": {
			"post": {
				"summary": "Unpause a container",
				"description": "Resume a container which has been paused.",
				"operationId": "ContainerUnpause",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/attach": {
			"post": {
				"summary": "Attach to a container",
				"description": "Attach to a container to read its output or send it input. You can attach\nto the same container multiple times and you can reattach to containers\nthat have been detached.\n\nEither the `stream` or `logs` parameter must be `true` for this endpoint\nto do anything.\n\nSee the [documentation for the `docker attach` command](https://docs.docker.com/engine/reference/commandline/attach/)\nfor more details.\n\n### Hijacking\n\nThis endpoint hijacks the HTTP connection to transport `stdin`, `stdout`,\nand `stderr` on the same socket.\n\nThis is the response from the daemon for an attach request:\n\n```\nHTTP/1.1 200 OK\nContent-Type: application/vnd.docker.raw-stream\n\n[STREAM]\n```\n\nAfter the headers and two new lines, the TCP connection can now be used\nfor raw, bidirectional communication between the client and server.\n\nTo hint potential proxies about connection hijacking, the Docker client\ncan also optionally send connection upgrade headers.\n\nFor example, the client sends this request to upgrade the connection:\n\n```\nPOST /containers/16253994b7c4/attach?stream=1&stdout=1 HTTP/1.1\nUpgrade: tcp\nConnection: Upgrade\n```\n\nThe Docker daemon will respond with a `101 UPGRADED` response, and will\nsimilarly follow with the raw stream:\n\n```\nHTTP/1.1 101 UPGRADED\nContent-Type: application/vnd.docker.raw-stream\nConnection: Upgrade\nUpgrade: tcp\n\n[STREAM]\n```\n\n### Stream format\n\nWhen the TTY setting is disabled in [`POST /containers/create`](#operation/ContainerCreate),\nthe stream over the hijacked connected is multiplexed to separate out\n`stdout` and `stderr`. The stream consists of a series of frames, each\ncontaining a header and a payload.\n\nThe header contains the information which the stream writes (`stdout` or\n`stderr`). It also contains the size of the associated frame encoded in\nthe last four bytes (`uint32`).\n\nIt is encoded on the first eight bytes like this:\n\n```go\nheader := [8]byte{STREAM_TYPE, 0, 0, 0, SIZE1, SIZE2, SIZE3, SIZE4}\n```\n\n`STREAM_TYPE` can be:\n\n- 0: `stdin` (is written on `stdout`)\n- 1: `stdout`\n- 2: `stderr`\n\n`SIZE1, SIZE2, SIZE3, SIZE4` are the four bytes of the `uint32` size\nencoded as big endian.\n\nFollowing the header is the payload, which is the specified number of\nbytes of `STREAM_TYPE`.\n\nThe simplest way to implement this protocol is the following:\n\n1. Read 8 bytes.\n2. Choose `stdout` or `stderr` depending on the first byte.\n3. Extract the frame size from the last four bytes.\n4. Read the extracted size and output it on the correct output.\n5. Goto 1.\n\n### Stream format when using a TTY\n\nWhen the TTY setting is enabled in [`POST /containers/create`](#operation/ContainerCreate),\nthe stream is not multiplexed. The data exchanged over the hijacked\nconnection is simply the raw data from the process PTY and client's\n`stdin`.\n",
				"operationId": "ContainerAttach",
				"produces": [
					"application/vnd.docker.raw-stream"
				],
				"responses": {
					"101": {
						"description": "no error, hints proxy about hijacking"
					},
					"200": {
						"description": "no error, no upgrade header found"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "detachKeys",
						"in": "query",
						"description": "Override the key sequence for detaching a container.Format is a single\ncharacter `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`,\n`@`, `^`, `[`, `,` or `_`.\n",
						"type": "string"
					},
					{
						"name": "logs",
						"in": "query",
						"description": "Replay previous logs from the container.\n\nThis is useful for attaching to a container that has started and you\nwant to output everything since the container started.\n\nIf `stream` is also enabled, once all the previous output has been\nreturned, it will seamlessly transition into streaming current\noutput.\n",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stream",
						"in": "query",
						"description": "Stream attached streams from the time the request was made onwards.\n",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdin",
						"in": "query",
						"description": "Attach to `stdin`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdout",
						"in": "query",
						"description": "Attach to `stdout`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stderr",
						"in": "query",
						"description": "Attach to `stderr`",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/attach/ws": {
			"get": {
				"summary": "Attach to a container via a websocket",
				"operationId": "ContainerAttachWebsocket",
				"responses": {
					"101": {
						"description": "no error, hints proxy about hijacking"
					},
					"200": {
						"description": "no error, no upgrade header found"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "detachKeys",
						"in": "query",
						"description": "Override the key sequence for detaching a container.Format is a single\ncharacter `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`,\n`@`, `^`, `[`, `,`, or `_`.\n",
						"type": "string"
					},
					{
						"name": "logs",
						"in": "query",
						"description": "Return logs",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stream",
						"in": "query",
						"description": "Return stream",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdin",
						"in": "query",
						"description": "Attach to `stdin`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdout",
						"in": "query",
						"description": "Attach to `stdout`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stderr",
						"in": "query",
						"description": "Attach to `stderr`",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/wait": {
			"post": {
				"summary": "Wait for a container",
				"description": "Block until a container stops, then returns the exit code.",
				"operationId": "ContainerWait",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "The container has exit.",
						"schema": {
							"type": "object",
							"title": "ContainerWaitResponse",
							"description": "OK response to ContainerWait operation",
							"required": [
								"StatusCode"
							],
							"properties": {
								"StatusCode": {
									"description": "Exit code of the container",
									"type": "integer",
									"x-nullable": false
								},
								"Error": {
									"description": "container waiting error, if any",
									"type": "object",
									"properties": {
										"Message": {
											"description": "Details of an error",
											"type": "string"
										}
									}
								}
							}
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "condition",
						"in": "query",
						"description": "Wait until a container state reaches the given condition, either\n'not-running' (default), 'next-exit', or 'removed'.\n",
						"type": "string",
						"default": "not-running"
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}": {
			"delete": {
				"summary": "Remove a container",
				"operationId": "ContainerDelete",
				"responses": {
					"204": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"409": {
						"description": "conflict",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "You cannot remove a running container: c2ada9df5af8. Stop the\ncontainer before attempting removal or force remove\n"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "v",
						"in": "query",
						"description": "Remove anonymous volumes associated with the container.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "force",
						"in": "query",
						"description": "If the container is running, kill it before removing it.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "link",
						"in": "query",
						"description": "Remove the specified link associated with the container.",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/{id}/archive": {
			"head": {
				"summary": "Get information about files in a container",
				"description": "A response header `X-Docker-Container-Path-Stat` is returned, containing\na base64 - encoded JSON object with some filesystem header information\nabout the path.\n",
				"operationId": "ContainerArchiveInfo",
				"responses": {
					"200": {
						"description": "no error",
						"headers": {
							"X-Docker-Container-Path-Stat": {
								"type": "string",
								"description": "A base64 - encoded JSON object with some filesystem header\ninformation about the path\n"
							}
						}
					},
					"400": {
						"description": "Bad parameter",
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ErrorResponse"
								},
								{
									"type": "object",
									"properties": {
										"message": {
											"description": "The error message. Either \"must specify path parameter\"\n(path cannot be empty) or \"not a directory\" (path was\nasserted to be a directory but exists as a file).\n",
											"type": "string",
											"x-nullable": false
										}
									}
								}
							]
						}
					},
					"404": {
						"description": "Container or path does not exist",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "path",
						"in": "query",
						"required": true,
						"description": "Resource in the container’s filesystem to archive.",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			},
			"get": {
				"summary": "Get an archive of a filesystem resource in a container",
				"description": "Get a tar archive of a resource in the filesystem of container id.",
				"operationId": "ContainerArchive",
				"produces": [
					"application/x-tar"
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "Bad parameter",
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ErrorResponse"
								},
								{
									"type": "object",
									"properties": {
										"message": {
											"description": "The error message. Either \"must specify path parameter\"\n(path cannot be empty) or \"not a directory\" (path was\nasserted to be a directory but exists as a file).\n",
											"type": "string",
											"x-nullable": false
										}
									}
								}
							]
						}
					},
					"404": {
						"description": "Container or path does not exist",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "path",
						"in": "query",
						"required": true,
						"description": "Resource in the container’s filesystem to archive.",
						"type": "string"
					}
				],
				"tags": [
					"Container"
				]
			},
			"put": {
				"summary": "Extract an archive of files or folders to a directory in a container",
				"description": "Upload a tar archive to be extracted to a path in the filesystem of container id.",
				"operationId": "PutContainerArchive",
				"consumes": [
					"application/x-tar",
					"application/octet-stream"
				],
				"responses": {
					"200": {
						"description": "The content was extracted successfully"
					},
					"400": {
						"description": "Bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"403": {
						"description": "Permission denied, the volume or container rootfs is marked as read-only.",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "No such container or path does not exist inside the container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the container",
						"type": "string"
					},
					{
						"name": "path",
						"in": "query",
						"required": true,
						"description": "Path to a directory in the container to extract the archive’s contents into. ",
						"type": "string"
					},
					{
						"name": "noOverwriteDirNonDir",
						"in": "query",
						"description": "If `1`, `true`, or `True` then it will be an error if unpacking the\ngiven content would cause an existing directory to be replaced with\na non-directory and vice versa.\n",
						"type": "string"
					},
					{
						"name": "copyUIDGID",
						"in": "query",
						"description": "If `1`, `true`, then it will copy UID/GID maps to the dest file or\ndir\n",
						"type": "string"
					},
					{
						"name": "inputStream",
						"in": "body",
						"required": true,
						"description": "The input stream must be a tar archive compressed with one of the\nfollowing algorithms: `identity` (no compression), `gzip`, `bzip2`,\nor `xz`.\n",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					}
				],
				"tags": [
					"Container"
				]
			}
		},
		"/containers/prune": {
			"post": {
				"summary": "Delete stopped containers",
				"produces": [
					"application/json"
				],
				"operationId": "ContainerPrune",
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the prune list, encoded as JSON (a `map[string][]string`).\n\nAvailable filters:\n- `until=<timestamp>` Prune containers created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.\n- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune containers with (or without, in case `label!=...` is used) the specified labels.\n",
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "ContainerPruneResponse",
							"properties": {
								"ContainersDeleted": {
									"description": "Container IDs that were deleted",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"SpaceReclaimed": {
									"description": "Disk space reclaimed in bytes",
									"type": "integer",
									"format": "int64"
								}
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Container"
				]
			}
		},
		"/images/json": {
			"get": {
				"summary": "List Images",
				"description": "Returns a list of images on the server. Note that it uses a different, smaller representation of an image than inspecting a single image.",
				"operationId": "ImageList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "Summary image data for the images matching the query",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/ImageSummary"
							}
						},
						"examples": {
							"application/json": [
								{
									"Id": "sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
									"ParentId": "",
									"RepoTags": [
										"ubuntu:12.04",
										"ubuntu:precise"
									],
									"RepoDigests": [
										"ubuntu@sha256:992069aee4016783df6345315302fa59681aae51a8eeb2f889dea59290f21787"
									],
									"Created": 1474925151,
									"Size": 103579269,
									"VirtualSize": 103579269,
									"SharedSize": 0,
									"Labels": {},
									"Containers": 2
								},
								{
									"Id": "sha256:3e314f95dcace0f5e4fd37b10862fe8398e3c60ed36600bc0ca5fda78b087175",
									"ParentId": "",
									"RepoTags": [
										"ubuntu:12.10",
										"ubuntu:quantal"
									],
									"RepoDigests": [
										"ubuntu@sha256:002fba3e3255af10be97ea26e476692a7ebed0bb074a9ab960b2e7a1526b15d7",
										"ubuntu@sha256:68ea0200f0b90df725d99d823905b04cf844f6039ef60c60bf3e019915017bd3"
									],
									"Created": 1403128455,
									"Size": 172064416,
									"VirtualSize": 172064416,
									"SharedSize": 0,
									"Labels": {},
									"Containers": 5
								}
							]
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "all",
						"in": "query",
						"description": "Show all images. Only images from a final layer (no children) are shown by default.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "filters",
						"in": "query",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the images list.\n\nAvailable filters:\n\n- `before`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)\n- `dangling=true`\n- `label=key` or `label=\"key=value\"` of an image label\n- `reference`=(`<image-name>[:<tag>]`)\n- `since`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)\n",
						"type": "string"
					},
					{
						"name": "digests",
						"in": "query",
						"description": "Show digest information as a `RepoDigests` field on each image.",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/build": {
			"post": {
				"summary": "Build an image",
				"description": "Build an image from a tar archive with a `Dockerfile` in it.\n\nThe `Dockerfile` specifies how the image is built from the tar archive. It is typically in the archive's root, but can be at a different path or have a different name by specifying the `dockerfile` parameter. [See the `Dockerfile` reference for more information](https://docs.docker.com/engine/reference/builder/).\n\nThe Docker daemon performs a preliminary validation of the `Dockerfile` before starting the build, and returns an error if the syntax is incorrect. After that, each instruction is run one-by-one until the ID of the new image is output.\n\nThe build is canceled if the client drops the connection by quitting or being killed.\n",
				"operationId": "ImageBuild",
				"consumes": [
					"application/octet-stream"
				],
				"produces": [
					"application/json"
				],
				"parameters": [
					{
						"name": "inputStream",
						"in": "body",
						"description": "A tar archive compressed with one of the following algorithms: identity (no compression), gzip, bzip2, xz.",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					{
						"name": "dockerfile",
						"in": "query",
						"description": "Path within the build context to the `Dockerfile`. This is ignored if `remote` is specified and points to an external `Dockerfile`.",
						"type": "string",
						"default": "Dockerfile"
					},
					{
						"name": "t",
						"in": "query",
						"description": "A name and optional tag to apply to the image in the `name:tag` format. If you omit the tag the default `latest` value is assumed. You can provide several `t` parameters.",
						"type": "string"
					},
					{
						"name": "extrahosts",
						"in": "query",
						"description": "Extra hosts to add to /etc/hosts",
						"type": "string"
					},
					{
						"name": "remote",
						"in": "query",
						"description": "A Git repository URI or HTTP/HTTPS context URI. If the URI points to a single text file, the file’s contents are placed into a file called `Dockerfile` and the image is built from that file. If the URI points to a tarball, the file is downloaded by the daemon and the contents therein used as the context for the build. If the URI points to a tarball and the `dockerfile` parameter is also specified, there must be a file with the corresponding path inside the tarball.",
						"type": "string"
					},
					{
						"name": "q",
						"in": "query",
						"description": "Suppress verbose build output.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "nocache",
						"in": "query",
						"description": "Do not use the cache when building the image.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "cachefrom",
						"in": "query",
						"description": "JSON array of images used for build cache resolution.",
						"type": "string"
					},
					{
						"name": "pull",
						"in": "query",
						"description": "Attempt to pull the image even if an older image exists locally.",
						"type": "string"
					},
					{
						"name": "rm",
						"in": "query",
						"description": "Remove intermediate containers after a successful build.",
						"type": "boolean",
						"default": true
					},
					{
						"name": "forcerm",
						"in": "query",
						"description": "Always remove intermediate containers, even upon failure.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "memory",
						"in": "query",
						"description": "Set memory limit for build.",
						"type": "integer"
					},
					{
						"name": "memswap",
						"in": "query",
						"description": "Total memory (memory + swap). Set as `-1` to disable swap.",
						"type": "integer"
					},
					{
						"name": "cpushares",
						"in": "query",
						"description": "CPU shares (relative weight).",
						"type": "integer"
					},
					{
						"name": "cpusetcpus",
						"in": "query",
						"description": "CPUs in which to allow execution (e.g., `0-3`, `0,1`).",
						"type": "string"
					},
					{
						"name": "cpuperiod",
						"in": "query",
						"description": "The length of a CPU period in microseconds.",
						"type": "integer"
					},
					{
						"name": "cpuquota",
						"in": "query",
						"description": "Microseconds of CPU time that the container can get in a CPU period.",
						"type": "integer"
					},
					{
						"name": "buildargs",
						"in": "query",
						"description": "JSON map of string pairs for build-time variables. Users pass these values at build-time. Docker uses the buildargs as the environment context for commands run via the `Dockerfile` RUN instruction, or for variable expansion in other `Dockerfile` instructions. This is not meant for passing secret values.\n\nFor example, the build arg `FOO=bar` would become `{\"FOO\":\"bar\"}` in JSON. This would result in the the query parameter `buildargs={\"FOO\":\"bar\"}`. Note that `{\"FOO\":\"bar\"}` should be URI component encoded.\n\n[Read more about the buildargs instruction.](https://docs.docker.com/engine/reference/builder/#arg)\n",
						"type": "string"
					},
					{
						"name": "shmsize",
						"in": "query",
						"description": "Size of `/dev/shm` in bytes. The size must be greater than 0. If omitted the system uses 64MB.",
						"type": "integer"
					},
					{
						"name": "squash",
						"in": "query",
						"description": "Squash the resulting images layers into a single layer. *(Experimental release only.)*",
						"type": "boolean"
					},
					{
						"name": "labels",
						"in": "query",
						"description": "Arbitrary key/value labels to set on the image, as a JSON map of string pairs.",
						"type": "string"
					},
					{
						"name": "networkmode",
						"in": "query",
						"description": "Sets the networking mode for the run commands during build. Supported\nstandard values are: `bridge`, `host`, `none`, and `container:<name|id>`.\nAny other value is taken as a custom network's name or ID to which this\ncontainer should connect to.\n",
						"type": "string"
					},
					{
						"name": "Content-type",
						"in": "header",
						"type": "string",
						"enum": [
							"application/x-tar"
						],
						"default": "application/x-tar"
					},
					{
						"name": "X-Registry-Config",
						"in": "header",
						"description": "This is a base64-encoded JSON object with auth configurations for multiple registries that a build may refer to.\n\nThe key is a registry URL, and the value is an auth configuration object, [as described in the authentication section](#section/Authentication). For example:\n\n```\n{\n  \"docker.example.com\": {\n    \"username\": \"janedoe\",\n    \"password\": \"hunter2\"\n  },\n  \"https://index.docker.io/v1/\": {\n    \"username\": \"mobydock\",\n    \"password\": \"conta1n3rize14\"\n  }\n}\n```\n\nOnly the registry domain name (and port if not the default 443) are required. However, for legacy reasons, the Docker Hub registry must be specified with both a `https://` prefix and a `/v1/` suffix even though Docker will prefer to use the v2 registry API.\n",
						"type": "string"
					},
					{
						"name": "platform",
						"in": "query",
						"description": "Platform in the format os[/arch[/variant]]",
						"type": "string",
						"default": ""
					},
					{
						"name": "target",
						"in": "query",
						"description": "Target build stage",
						"type": "string",
						"default": ""
					},
					{
						"name": "outputs",
						"in": "query",
						"description": "BuildKit output configuration",
						"type": "string",
						"default": ""
					}
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "Bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Image"
				]
			}
		},
		"/build/prune": {
			"post": {
				"summary": "Delete builder cache",
				"produces": [
					"application/json"
				],
				"operationId": "BuildPrune",
				"parameters": [
					{
						"name": "keep-storage",
						"in": "query",
						"description": "Amount of disk space in bytes to keep for cache",
						"type": "integer",
						"format": "int64"
					},
					{
						"name": "all",
						"in": "query",
						"type": "boolean",
						"description": "Remove all types of build cache"
					},
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the list of build cache objects.\n\nAvailable filters:\n\n- `until=<duration>`: duration relative to daemon's time, during which build cache was not used, in Go's duration format (e.g., '24h')\n- `id=<id>`\n- `parent=<id>`\n- `type=<string>`\n- `description=<string>`\n- `inuse`\n- `shared`\n- `private`\n"
					}
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "BuildPruneResponse",
							"properties": {
								"CachesDeleted": {
									"type": "array",
									"items": {
										"description": "ID of build cache object",
										"type": "string"
									}
								},
								"SpaceReclaimed": {
									"description": "Disk space reclaimed in bytes",
									"type": "integer",
									"format": "int64"
								}
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Image"
				]
			}
		},
		"/images/create": {
			"post": {
				"summary": "Create an image",
				"description": "Create an image by either pulling it from a registry or importing it.",
				"operationId": "ImageCreate",
				"consumes": [
					"text/plain",
					"application/octet-stream"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "repository does not exist or no read access",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "fromImage",
						"in": "query",
						"description": "Name of the image to pull. The name may include a tag or digest. This parameter may only be used when pulling an image. The pull is cancelled if the HTTP connection is closed.",
						"type": "string"
					},
					{
						"name": "fromSrc",
						"in": "query",
						"description": "Source to import. The value may be a URL from which the image can be retrieved or `-` to read the image from the request body. This parameter may only be used when importing an image.",
						"type": "string"
					},
					{
						"name": "repo",
						"in": "query",
						"description": "Repository name given to an image when it is imported. The repo may include a tag. This parameter may only be used when importing an image.",
						"type": "string"
					},
					{
						"name": "tag",
						"in": "query",
						"description": "Tag or digest. If empty when pulling an image, this causes all tags for the given image to be pulled.",
						"type": "string"
					},
					{
						"name": "message",
						"in": "query",
						"description": "Set commit message for imported image.",
						"type": "string"
					},
					{
						"name": "inputImage",
						"in": "body",
						"description": "Image content if the value `-` has been specified in fromSrc query parameter",
						"schema": {
							"type": "string"
						},
						"required": false
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string"
					},
					{
						"name": "platform",
						"in": "query",
						"description": "Platform in the format os[/arch[/variant]]",
						"type": "string",
						"default": ""
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/{name}/json": {
			"get": {
				"summary": "Inspect an image",
				"description": "Return low-level information about an image.",
				"operationId": "ImageInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"$ref": "#/definitions/Image"
						},
						"examples": {
							"application/json": {
								"Id": "sha256:85f05633ddc1c50679be2b16a0479ab6f7637f8884e0cfe0f4d20e1ebb3d6e7c",
								"Container": "cb91e48a60d01f1e27028b4fc6819f4f290b3cf12496c8176ec714d0d390984a",
								"Comment": "",
								"Os": "linux",
								"Architecture": "amd64",
								"Parent": "sha256:91e54dfb11794fad694460162bf0cb0a4fa710cfa3f60979c177d920813e267c",
								"ContainerConfig": {
									"Tty": false,
									"Hostname": "e611e15f9c9d",
									"Domainname": "",
									"AttachStdout": false,
									"PublishService": "",
									"AttachStdin": false,
									"OpenStdin": false,
									"StdinOnce": false,
									"NetworkDisabled": false,
									"OnBuild": [],
									"Image": "91e54dfb11794fad694460162bf0cb0a4fa710cfa3f60979c177d920813e267c",
									"User": "",
									"WorkingDir": "",
									"MacAddress": "",
									"AttachStderr": false,
									"Labels": {
										"com.example.license": "GPL",
										"com.example.version": "1.0",
										"com.example.vendor": "Acme"
									},
									"Env": [
										"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
									],
									"Cmd": [
										"/bin/sh",
										"-c",
										"#(nop) LABEL com.example.vendor=Acme com.example.license=GPL com.example.version=1.0"
									]
								},
								"DockerVersion": "1.9.0-dev",
								"VirtualSize": 188359297,
								"Size": 0,
								"Author": "",
								"Created": "2015-09-10T08:30:53.26995814Z",
								"GraphDriver": {
									"Name": "aufs",
									"Data": {}
								},
								"RepoDigests": [
									"localhost:5000/test/busybox/example@sha256:cbbf2f9a99b47fc460d422812b6a5adff7dfee951d8fa2e4a98caa0382cfbdbf"
								],
								"RepoTags": [
									"example:1.0",
									"example:latest",
									"example:stable"
								],
								"Config": {
									"Image": "91e54dfb11794fad694460162bf0cb0a4fa710cfa3f60979c177d920813e267c",
									"NetworkDisabled": false,
									"OnBuild": [],
									"StdinOnce": false,
									"PublishService": "",
									"AttachStdin": false,
									"OpenStdin": false,
									"Domainname": "",
									"AttachStdout": false,
									"Tty": false,
									"Hostname": "e611e15f9c9d",
									"Cmd": [
										"/bin/bash"
									],
									"Env": [
										"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
									],
									"Labels": {
										"com.example.vendor": "Acme",
										"com.example.version": "1.0",
										"com.example.license": "GPL"
									},
									"MacAddress": "",
									"AttachStderr": false,
									"WorkingDir": "",
									"User": ""
								},
								"RootFS": {
									"Type": "layers",
									"Layers": [
										"sha256:1834950e52ce4d5a88a1bbd131c537f4d0e56d10ff0dd69e66be3b7dfa9df7e6",
										"sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef"
									]
								}
							}
						}
					},
					"404": {
						"description": "No such image",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such image: someimage (tag: latest)"
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or id",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/{name}/history": {
			"get": {
				"summary": "Get the history of an image",
				"description": "Return parent layers of an image.",
				"operationId": "ImageHistory",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "List of image layers",
						"schema": {
							"type": "array",
							"items": {
								"type": "object",
								"x-go-name": "HistoryResponseItem",
								"title": "HistoryResponseItem",
								"description": "individual image layer information in response to ImageHistory operation",
								"required": [
									"Id",
									"Created",
									"CreatedBy",
									"Tags",
									"Size",
									"Comment"
								],
								"properties": {
									"Id": {
										"type": "string",
										"x-nullable": false
									},
									"Created": {
										"type": "integer",
										"format": "int64",
										"x-nullable": false
									},
									"CreatedBy": {
										"type": "string",
										"x-nullable": false
									},
									"Tags": {
										"type": "array",
										"items": {
											"type": "string"
										}
									},
									"Size": {
										"type": "integer",
										"format": "int64",
										"x-nullable": false
									},
									"Comment": {
										"type": "string",
										"x-nullable": false
									}
								}
							}
						},
						"examples": {
							"application/json": [
								{
									"Id": "3db9c44f45209632d6050b35958829c3a2aa256d81b9a7be45b362ff85c54710",
									"Created": 1398108230,
									"CreatedBy": "/bin/sh -c #(nop) ADD file:eb15dbd63394e063b805a3c32ca7bf0266ef64676d5a6fab4801f2e81e2a5148 in /",
									"Tags": [
										"ubuntu:lucid",
										"ubuntu:10.04"
									],
									"Size": 182964289,
									"Comment": ""
								},
								{
									"Id": "6cfa4d1f33fb861d4d114f43b25abd0ac737509268065cdfd69d544a59c85ab8",
									"Created": 1398108222,
									"CreatedBy": "/bin/sh -c #(nop) MAINTAINER Tianon Gravi <admwiggin@gmail.com> - mkimage-debootstrap.sh -i iproute,iputils-ping,ubuntu-minimal -t lucid.tar.xz lucid http://archive.ubuntu.com/ubuntu/",
									"Tags": [],
									"Size": 0,
									"Comment": ""
								},
								{
									"Id": "511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158",
									"Created": 1371157430,
									"CreatedBy": "",
									"Tags": [
										"scratch12:latest",
										"scratch:latest"
									],
									"Size": 0,
									"Comment": "Imported from -"
								}
							]
						}
					},
					"404": {
						"description": "No such image",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or ID",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/{name}/push": {
			"post": {
				"summary": "Push an image",
				"description": "Push an image to a registry.\n\nIf you wish to push an image on to a private registry, that image must\nalready have a tag which references the registry. For example,\n`registry.example.com/myimage:latest`.\n\nThe push is cancelled if the HTTP connection is closed.\n",
				"operationId": "ImagePush",
				"consumes": [
					"application/octet-stream"
				],
				"responses": {
					"200": {
						"description": "No error"
					},
					"404": {
						"description": "No such image",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or ID.",
						"type": "string",
						"required": true
					},
					{
						"name": "tag",
						"in": "query",
						"description": "The tag to associate with the image on the registry.",
						"type": "string"
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/{name}/tag": {
			"post": {
				"summary": "Tag an image",
				"description": "Tag an image so that it becomes part of a repository.",
				"operationId": "ImageTag",
				"responses": {
					"201": {
						"description": "No error"
					},
					"400": {
						"description": "Bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "No such image",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"409": {
						"description": "Conflict",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or ID to tag.",
						"type": "string",
						"required": true
					},
					{
						"name": "repo",
						"in": "query",
						"description": "The repository to tag in. For example, `someuser/someimage`.",
						"type": "string"
					},
					{
						"name": "tag",
						"in": "query",
						"description": "The name of the new tag.",
						"type": "string"
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/{name}": {
			"delete": {
				"summary": "Remove an image",
				"description": "Remove an image, along with any untagged parent images that were\nreferenced by that image.\n\nImages can't be removed if they have descendant images, are being\nused by a running container or are being used by a build.\n",
				"operationId": "ImageDelete",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "The image was deleted successfully",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/ImageDeleteResponseItem"
							}
						},
						"examples": {
							"application/json": [
								{
									"Untagged": "3e2f21a89f"
								},
								{
									"Deleted": "3e2f21a89f"
								},
								{
									"Deleted": "53b4f83ac9"
								}
							]
						}
					},
					"404": {
						"description": "No such image",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"409": {
						"description": "Conflict",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or ID",
						"type": "string",
						"required": true
					},
					{
						"name": "force",
						"in": "query",
						"description": "Remove the image even if it is being used by stopped containers or has other tags",
						"type": "boolean",
						"default": false
					},
					{
						"name": "noprune",
						"in": "query",
						"description": "Do not delete untagged parent images",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/search": {
			"get": {
				"summary": "Search images",
				"description": "Search for an image on Docker Hub.",
				"operationId": "ImageSearch",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "array",
							"items": {
								"type": "object",
								"title": "ImageSearchResponseItem",
								"properties": {
									"description": {
										"type": "string"
									},
									"is_official": {
										"type": "boolean"
									},
									"is_automated": {
										"type": "boolean"
									},
									"name": {
										"type": "string"
									},
									"star_count": {
										"type": "integer"
									}
								}
							}
						},
						"examples": {
							"application/json": [
								{
									"description": "",
									"is_official": false,
									"is_automated": false,
									"name": "wma55/u1210sshd",
									"star_count": 0
								},
								{
									"description": "",
									"is_official": false,
									"is_automated": false,
									"name": "jdswinbank/sshd",
									"star_count": 0
								},
								{
									"description": "",
									"is_official": false,
									"is_automated": false,
									"name": "vgauthier/sshd",
									"star_count": 0
								}
							]
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "term",
						"in": "query",
						"description": "Term to search",
						"type": "string",
						"required": true
					},
					{
						"name": "limit",
						"in": "query",
						"description": "Maximum number of results to return",
						"type": "integer"
					},
					{
						"name": "filters",
						"in": "query",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to process on the images list. Available filters:\n\n- `is-automated=(true|false)`\n- `is-official=(true|false)`\n- `stars=<number>` Matches images that has at least 'number' stars.\n",
						"type": "string"
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/prune": {
			"post": {
				"summary": "Delete unused images",
				"produces": [
					"application/json"
				],
				"operationId": "ImagePrune",
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the prune list, encoded as JSON (a `map[string][]string`). Available filters:\n\n- `dangling=<boolean>` When set to `true` (or `1`), prune only\n   unused *and* untagged images. When set to `false`\n   (or `0`), all unused images are pruned.\n- `until=<string>` Prune images created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.\n- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune images with (or without, in case `label!=...` is used) the specified labels.\n",
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "ImagePruneResponse",
							"properties": {
								"ImagesDeleted": {
									"description": "Images that were deleted",
									"type": "array",
									"items": {
										"$ref": "#/definitions/ImageDeleteResponseItem"
									}
								},
								"SpaceReclaimed": {
									"description": "Disk space reclaimed in bytes",
									"type": "integer",
									"format": "int64"
								}
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Image"
				]
			}
		},
		"/auth": {
			"post": {
				"summary": "Check auth configuration",
				"description": "Validate credentials for a registry and, if available, get an identity\ntoken for accessing the registry without password.\n",
				"operationId": "SystemAuth",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "An identity token was generated successfully.",
						"schema": {
							"type": "object",
							"title": "SystemAuthResponse",
							"required": [
								"Status"
							],
							"properties": {
								"Status": {
									"description": "The status of the authentication",
									"type": "string",
									"x-nullable": false
								},
								"IdentityToken": {
									"description": "An opaque token used to authenticate a user after a successful login",
									"type": "string",
									"x-nullable": false
								}
							}
						},
						"examples": {
							"application/json": {
								"Status": "Login Succeeded",
								"IdentityToken": "9cbaf023786cd7..."
							}
						}
					},
					"204": {
						"description": "No error"
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "authConfig",
						"in": "body",
						"description": "Authentication to check",
						"schema": {
							"$ref": "#/definitions/AuthConfig"
						}
					}
				],
				"tags": [
					"System"
				]
			}
		},
		"/info": {
			"get": {
				"summary": "Get system information",
				"operationId": "SystemInfo",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"$ref": "#/definitions/SystemInfo"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"System"
				]
			}
		},
		"/version": {
			"get": {
				"summary": "Get version",
				"description": "Returns the version of Docker that is running and various information about the system that Docker is running on.",
				"operationId": "SystemVersion",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/SystemVersion"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"System"
				]
			}
		},
		"/_ping": {
			"get": {
				"summary": "Ping",
				"description": "This is a dummy endpoint you can use to test if the server is accessible.",
				"operationId": "SystemPing",
				"produces": [
					"text/plain"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "string",
							"example": "OK"
						},
						"headers": {
							"API-Version": {
								"type": "string",
								"description": "Max API Version the server supports"
							},
							"Builder-Version": {
								"type": "string",
								"description": "Default version of docker image builder"
							},
							"Docker-Experimental": {
								"type": "boolean",
								"description": "If the server is running with experimental mode enabled"
							},
							"Cache-Control": {
								"type": "string",
								"default": "no-cache, no-store, must-revalidate"
							},
							"Pragma": {
								"type": "string",
								"default": "no-cache"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"headers": {
							"Cache-Control": {
								"type": "string",
								"default": "no-cache, no-store, must-revalidate"
							},
							"Pragma": {
								"type": "string",
								"default": "no-cache"
							}
						}
					}
				},
				"tags": [
					"System"
				]
			},
			"head": {
				"summary": "Ping",
				"description": "This is a dummy endpoint you can use to test if the server is accessible.",
				"operationId": "SystemPingHead",
				"produces": [
					"text/plain"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "string",
							"example": "(empty)"
						},
						"headers": {
							"API-Version": {
								"type": "string",
								"description": "Max API Version the server supports"
							},
							"Builder-Version": {
								"type": "string",
								"description": "Default version of docker image builder"
							},
							"Docker-Experimental": {
								"type": "boolean",
								"description": "If the server is running with experimental mode enabled"
							},
							"Cache-Control": {
								"type": "string",
								"default": "no-cache, no-store, must-revalidate"
							},
							"Pragma": {
								"type": "string",
								"default": "no-cache"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"System"
				]
			}
		},
		"/commit": {
			"post": {
				"summary": "Create a new image from a container",
				"operationId": "ImageCommit",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/IdResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "containerConfig",
						"in": "body",
						"description": "The container configuration",
						"schema": {
							"$ref": "#/definitions/ContainerConfig"
						}
					},
					{
						"name": "container",
						"in": "query",
						"description": "The ID or name of the container to commit",
						"type": "string"
					},
					{
						"name": "repo",
						"in": "query",
						"description": "Repository name for the created image",
						"type": "string"
					},
					{
						"name": "tag",
						"in": "query",
						"description": "Tag name for the create image",
						"type": "string"
					},
					{
						"name": "comment",
						"in": "query",
						"description": "Commit message",
						"type": "string"
					},
					{
						"name": "author",
						"in": "query",
						"description": "Author of the image (e.g., `John Hannibal Smith <hannibal@a-team.com>`)",
						"type": "string"
					},
					{
						"name": "pause",
						"in": "query",
						"description": "Whether to pause the container before committing",
						"type": "boolean",
						"default": true
					},
					{
						"name": "changes",
						"in": "query",
						"description": "`Dockerfile` instructions to apply while committing",
						"type": "string"
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/events": {
			"get": {
				"summary": "Monitor events",
				"description": "Stream real-time events from the server.\n\nVarious objects within Docker report events when something happens to them.\n\nContainers report these events: `attach`, `commit`, `copy`, `create`, `destroy`, `detach`, `die`, `exec_create`, `exec_detach`, `exec_start`, `exec_die`, `export`, `health_status`, `kill`, `oom`, `pause`, `rename`, `resize`, `restart`, `start`, `stop`, `top`, `unpause`, `update`, and `prune`\n\nImages report these events: `delete`, `import`, `load`, `pull`, `push`, `save`, `tag`, `untag`, and `prune`\n\nVolumes report these events: `create`, `mount`, `unmount`, `destroy`, and `prune`\n\nNetworks report these events: `create`, `connect`, `disconnect`, `destroy`, `update`, `remove`, and `prune`\n\nThe Docker daemon reports these events: `reload`\n\nServices report these events: `create`, `update`, and `remove`\n\nNodes report these events: `create`, `update`, and `remove`\n\nSecrets report these events: `create`, `update`, and `remove`\n\nConfigs report these events: `create`, `update`, and `remove`\n\nThe Builder reports `prune` events\n",
				"operationId": "SystemEvents",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "SystemEventsResponse",
							"properties": {
								"Type": {
									"description": "The type of object emitting the event",
									"type": "string"
								},
								"Action": {
									"description": "The type of event",
									"type": "string"
								},
								"Actor": {
									"type": "object",
									"properties": {
										"ID": {
											"description": "The ID of the object emitting the event",
											"type": "string"
										},
										"Attributes": {
											"description": "Various key/value attributes of the object, depending on its type",
											"type": "object",
											"additionalProperties": {
												"type": "string"
											}
										}
									}
								},
								"time": {
									"description": "Timestamp of event",
									"type": "integer"
								},
								"timeNano": {
									"description": "Timestamp of event, with nanosecond accuracy",
									"type": "integer",
									"format": "int64"
								}
							}
						},
						"examples": {
							"application/json": {
								"Type": "container",
								"Action": "create",
								"Actor": {
									"ID": "ede54ee1afda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c743",
									"Attributes": {
										"com.example.some-label": "some-label-value",
										"image": "alpine",
										"name": "my-container"
									}
								},
								"time": 1461943101
							}
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "since",
						"in": "query",
						"description": "Show events created since this timestamp then stream new events.",
						"type": "string"
					},
					{
						"name": "until",
						"in": "query",
						"description": "Show events created until this timestamp then stop streaming.",
						"type": "string"
					},
					{
						"name": "filters",
						"in": "query",
						"description": "A JSON encoded value of filters (a `map[string][]string`) to process on the event list. Available filters:\n\n- `config=<string>` config name or ID\n- `container=<string>` container name or ID\n- `daemon=<string>` daemon name or ID\n- `event=<string>` event type\n- `image=<string>` image name or ID\n- `label=<string>` image or container label\n- `network=<string>` network name or ID\n- `node=<string>` node ID\n- `plugin`=<string> plugin name or ID\n- `scope`=<string> local or swarm\n- `secret=<string>` secret name or ID\n- `service=<string>` service name or ID\n- `type=<string>` object to filter by, one of `container`, `image`, `volume`, `network`, `daemon`, `plugin`, `node`, `service`, `secret` or `config`\n- `volume=<string>` volume name\n",
						"type": "string"
					}
				],
				"tags": [
					"System"
				]
			}
		},
		"/system/df": {
			"get": {
				"summary": "Get data usage information",
				"operationId": "SystemDataUsage",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "SystemDataUsageResponse",
							"properties": {
								"LayersSize": {
									"type": "integer",
									"format": "int64"
								},
								"Images": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/ImageSummary"
									}
								},
								"Containers": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/ContainerSummary"
									}
								},
								"Volumes": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/Volume"
									}
								},
								"BuildCache": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/BuildCache"
									}
								}
							},
							"example": {
								"LayersSize": 1092588,
								"Images": [
									{
										"Id": "sha256:2b8fd9751c4c0f5dd266fcae00707e67a2545ef34f9a29354585f93dac906749",
										"ParentId": "",
										"RepoTags": [
											"busybox:latest"
										],
										"RepoDigests": [
											"busybox@sha256:a59906e33509d14c036c8678d687bd4eec81ed7c4b8ce907b888c607f6a1e0e6"
										],
										"Created": 1466724217,
										"Size": 1092588,
										"SharedSize": 0,
										"VirtualSize": 1092588,
										"Labels": {},
										"Containers": 1
									}
								],
								"Containers": [
									{
										"Id": "e575172ed11dc01bfce087fb27bee502db149e1a0fad7c296ad300bbff178148",
										"Names": [
											"/top"
										],
										"Image": "busybox",
										"ImageID": "sha256:2b8fd9751c4c0f5dd266fcae00707e67a2545ef34f9a29354585f93dac906749",
										"Command": "top",
										"Created": 1472592424,
										"Ports": [],
										"SizeRootFs": 1092588,
										"Labels": {},
										"State": "exited",
										"Status": "Exited (0) 56 minutes ago",
										"HostConfig": {
											"NetworkMode": "default"
										},
										"NetworkSettings": {
											"Networks": {
												"bridge": {
													"IPAMConfig": null,
													"Links": null,
													"Aliases": null,
													"NetworkID": "d687bc59335f0e5c9ee8193e5612e8aee000c8c62ea170cfb99c098f95899d92",
													"EndpointID": "8ed5115aeaad9abb174f68dcf135b49f11daf597678315231a32ca28441dec6a",
													"Gateway": "172.18.0.1",
													"IPAddress": "172.18.0.2",
													"IPPrefixLen": 16,
													"IPv6Gateway": "",
													"GlobalIPv6Address": "",
													"GlobalIPv6PrefixLen": 0,
													"MacAddress": "02:42:ac:12:00:02"
												}
											}
										},
										"Mounts": []
									}
								],
								"Volumes": [
									{
										"Name": "my-volume",
										"Driver": "local",
										"Mountpoint": "/var/lib/docker/volumes/my-volume/_data",
										"Labels": null,
										"Scope": "local",
										"Options": null,
										"UsageData": {
											"Size": 10920104,
											"RefCount": 2
										}
									}
								]
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"System"
				]
			}
		},
		"/images/{name}/get": {
			"get": {
				"summary": "Export an image",
				"description": "Get a tarball containing all images and metadata for a repository.\n\nIf `name` is a specific name and tag (e.g. `ubuntu:latest`), then only that image (and its parents) are returned. If `name` is an image ID, similarly only that image (and its parents) are returned, but with the exclusion of the `repositories` file in the tarball, as there were no image names referenced.\n\n### Image tarball format\n\nAn image tarball contains one directory per image layer (named using its long ID), each containing these files:\n\n- `VERSION`: currently `1.0` - the file format version\n- `json`: detailed layer information, similar to `docker inspect layer_id`\n- `layer.tar`: A tarfile containing the filesystem changes in this layer\n\nThe `layer.tar` file contains `aufs` style `.wh..wh.aufs` files and directories for storing attribute changes and deletions.\n\nIf the tarball defines a repository, the tarball should also include a `repositories` file at the root that contains a list of repository and tag names mapped to layer IDs.\n\n```json\n{\n  \"hello-world\": {\n    \"latest\": \"565a9d68a73f6706862bfe8409a7f659776d4d60a8d096eb4a3cbce6999cc2a1\"\n  }\n}\n```\n",
				"operationId": "ImageGet",
				"produces": [
					"application/x-tar"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or ID",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/get": {
			"get": {
				"summary": "Export several images",
				"description": "Get a tarball containing all images and metadata for several image\nrepositories.\n\nFor each value of the `names` parameter: if it is a specific name and\ntag (e.g. `ubuntu:latest`), then only that image (and its parents) are\nreturned; if it is an image ID, similarly only that image (and its parents)\nare returned and there would be no names referenced in the 'repositories'\nfile for this image ID.\n\nFor details on the format, see the [export image endpoint](#operation/ImageGet).\n",
				"operationId": "ImageGetAll",
				"produces": [
					"application/x-tar"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "names",
						"in": "query",
						"description": "Image names to filter by",
						"type": "array",
						"items": {
							"type": "string"
						}
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/images/load": {
			"post": {
				"summary": "Import images",
				"description": "Load a set of images and tags into a repository.\n\nFor details on the format, see the [export image endpoint](#operation/ImageGet).\n",
				"operationId": "ImageLoad",
				"consumes": [
					"application/x-tar"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "imagesTarball",
						"in": "body",
						"description": "Tar archive containing images",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					{
						"name": "quiet",
						"in": "query",
						"description": "Suppress progress details during load.",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Image"
				]
			}
		},
		"/containers/{id}/exec": {
			"post": {
				"summary": "Create an exec instance",
				"description": "Run a command inside a running container.",
				"operationId": "ContainerExec",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/IdResponse"
						}
					},
					"404": {
						"description": "no such container",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such container: c2ada9df5af8"
							}
						}
					},
					"409": {
						"description": "container is paused",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "execConfig",
						"in": "body",
						"description": "Exec configuration",
						"schema": {
							"type": "object",
							"properties": {
								"AttachStdin": {
									"type": "boolean",
									"description": "Attach to `stdin` of the exec command."
								},
								"AttachStdout": {
									"type": "boolean",
									"description": "Attach to `stdout` of the exec command."
								},
								"AttachStderr": {
									"type": "boolean",
									"description": "Attach to `stderr` of the exec command."
								},
								"DetachKeys": {
									"type": "string",
									"description": "Override the key sequence for detaching a container. Format is\na single character `[a-Z]` or `ctrl-<value>` where `<value>`\nis one of: `a-z`, `@`, `^`, `[`, `,` or `_`.\n"
								},
								"Tty": {
									"type": "boolean",
									"description": "Allocate a pseudo-TTY."
								},
								"Env": {
									"description": "A list of environment variables in the form `[\"VAR=value\", ...]`.\n",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"Cmd": {
									"type": "array",
									"description": "Command to run, as a string or array of strings.",
									"items": {
										"type": "string"
									}
								},
								"Privileged": {
									"type": "boolean",
									"description": "Runs the exec process with extended privileges.",
									"default": false
								},
								"User": {
									"type": "string",
									"description": "The user, and optionally, group to run the exec process inside\nthe container. Format is one of: `user`, `user:group`, `uid`,\nor `uid:gid`.\n"
								},
								"WorkingDir": {
									"type": "string",
									"description": "The working directory for the exec process inside the container.\n"
								}
							},
							"example": {
								"AttachStdin": false,
								"AttachStdout": true,
								"AttachStderr": true,
								"DetachKeys": "ctrl-p,ctrl-q",
								"Tty": false,
								"Cmd": [
									"date"
								],
								"Env": [
									"FOO=bar",
									"BAZ=quux"
								]
							}
						},
						"required": true
					},
					{
						"name": "id",
						"in": "path",
						"description": "ID or name of container",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Exec"
				]
			}
		},
		"/exec/{id}/start": {
			"post": {
				"summary": "Start an exec instance",
				"description": "Starts a previously set up exec instance. If detach is true, this endpoint\nreturns immediately after starting the command. Otherwise, it sets up an\ninteractive session with the command.\n",
				"operationId": "ExecStart",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/vnd.docker.raw-stream"
				],
				"responses": {
					"200": {
						"description": "No error"
					},
					"404": {
						"description": "No such exec instance",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"409": {
						"description": "Container is stopped or paused",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "execStartConfig",
						"in": "body",
						"schema": {
							"type": "object",
							"properties": {
								"Detach": {
									"type": "boolean",
									"description": "Detach from the command."
								},
								"Tty": {
									"type": "boolean",
									"description": "Allocate a pseudo-TTY."
								}
							},
							"example": {
								"Detach": false,
								"Tty": false
							}
						}
					},
					{
						"name": "id",
						"in": "path",
						"description": "Exec instance ID",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Exec"
				]
			}
		},
		"/exec/{id}/resize": {
			"post": {
				"summary": "Resize an exec instance",
				"description": "Resize the TTY session used by an exec instance. This endpoint only works\nif `tty` was specified as part of creating and starting the exec instance.\n",
				"operationId": "ExecResize",
				"responses": {
					"201": {
						"description": "No error"
					},
					"404": {
						"description": "No such exec instance",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Exec instance ID",
						"required": true,
						"type": "string"
					},
					{
						"name": "h",
						"in": "query",
						"description": "Height of the TTY session in characters",
						"type": "integer"
					},
					{
						"name": "w",
						"in": "query",
						"description": "Width of the TTY session in characters",
						"type": "integer"
					}
				],
				"tags": [
					"Exec"
				]
			}
		},
		"/exec/{id}/json": {
			"get": {
				"summary": "Inspect an exec instance",
				"description": "Return low-level information about an exec instance.",
				"operationId": "ExecInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "ExecInspectResponse",
							"properties": {
								"CanRemove": {
									"type": "boolean"
								},
								"DetachKeys": {
									"type": "string"
								},
								"ID": {
									"type": "string"
								},
								"Running": {
									"type": "boolean"
								},
								"ExitCode": {
									"type": "integer"
								},
								"ProcessConfig": {
									"$ref": "#/definitions/ProcessConfig"
								},
								"OpenStdin": {
									"type": "boolean"
								},
								"OpenStderr": {
									"type": "boolean"
								},
								"OpenStdout": {
									"type": "boolean"
								},
								"ContainerID": {
									"type": "string"
								},
								"Pid": {
									"type": "integer",
									"description": "The system process ID for the exec process."
								}
							}
						},
						"examples": {
							"application/json": {
								"CanRemove": false,
								"ContainerID": "b53ee82b53a40c7dca428523e34f741f3abc51d9f297a14ff874bf761b995126",
								"DetachKeys": "",
								"ExitCode": 2,
								"ID": "f33bbfb39f5b142420f4759b2348913bd4a8d1a6d7fd56499cb41a1bb91d7b3b",
								"OpenStderr": true,
								"OpenStdin": true,
								"OpenStdout": true,
								"ProcessConfig": {
									"arguments": [
										"-c",
										"exit 2"
									],
									"entrypoint": "sh",
									"privileged": false,
									"tty": true,
									"user": "1000"
								},
								"Running": false,
								"Pid": 42000
							}
						}
					},
					"404": {
						"description": "No such exec instance",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Exec instance ID",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Exec"
				]
			}
		},
		"/volumes": {
			"get": {
				"summary": "List volumes",
				"operationId": "VolumeList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "Summary volume data that matches the query",
						"schema": {
							"type": "object",
							"title": "VolumeListResponse",
							"description": "Volume list response",
							"required": [
								"Volumes",
								"Warnings"
							],
							"properties": {
								"Volumes": {
									"type": "array",
									"x-nullable": false,
									"description": "List of volumes",
									"items": {
										"$ref": "#/definitions/Volume"
									}
								},
								"Warnings": {
									"type": "array",
									"x-nullable": false,
									"description": "Warnings that occurred when fetching the list of volumes.\n",
									"items": {
										"type": "string"
									}
								}
							}
						},
						"examples": {
							"application/json": {
								"Volumes": [
									{
										"CreatedAt": "2017-07-19T12:00:26Z",
										"Name": "tardis",
										"Driver": "local",
										"Mountpoint": "/var/lib/docker/volumes/tardis",
										"Labels": {
											"com.example.some-label": "some-value",
											"com.example.some-other-label": "some-other-value"
										},
										"Scope": "local",
										"Options": {
											"device": "tmpfs",
											"o": "size=100m,uid=1000",
											"type": "tmpfs"
										}
									}
								],
								"Warnings": []
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the volumes list. Available filters:\n\n- `dangling=<boolean>` When set to `true` (or `1`), returns all\n   volumes that are not in use by a container. When set to `false`\n   (or `0`), only volumes that are in use by one or more\n   containers are returned.\n- `driver=<volume-driver-name>` Matches volumes based on their driver.\n- `label=<key>` or `label=<key>:<value>` Matches volumes based on\n   the presence of a `label` alone or a `label` and a value.\n- `name=<volume-name>` Matches all or part of a volume name.\n",
						"type": "string",
						"format": "json"
					}
				],
				"tags": [
					"Volume"
				]
			}
		},
		"/volumes/create": {
			"post": {
				"summary": "Create a volume",
				"operationId": "VolumeCreate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "The volume was created successfully",
						"schema": {
							"$ref": "#/definitions/Volume"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "volumeConfig",
						"in": "body",
						"required": true,
						"description": "Volume configuration",
						"schema": {
							"type": "object",
							"description": "Volume configuration",
							"title": "VolumeConfig",
							"properties": {
								"Name": {
									"description": "The new volume's name. If not specified, Docker generates a name.\n",
									"type": "string",
									"x-nullable": false
								},
								"Driver": {
									"description": "Name of the volume driver to use.",
									"type": "string",
									"default": "local",
									"x-nullable": false
								},
								"DriverOpts": {
									"description": "A mapping of driver options and values. These options are\npassed directly to the driver and are driver specific.\n",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								},
								"Labels": {
									"description": "User-defined key/value metadata.",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								}
							},
							"example": {
								"Name": "tardis",
								"Labels": {
									"com.example.some-label": "some-value",
									"com.example.some-other-label": "some-other-value"
								},
								"Driver": "custom"
							}
						}
					}
				],
				"tags": [
					"Volume"
				]
			}
		},
		"/volumes/{name}": {
			"get": {
				"summary": "Inspect a volume",
				"operationId": "VolumeInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"$ref": "#/definitions/Volume"
						}
					},
					"404": {
						"description": "No such volume",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"required": true,
						"description": "Volume name or ID",
						"type": "string"
					}
				],
				"tags": [
					"Volume"
				]
			},
			"delete": {
				"summary": "Remove a volume",
				"description": "Instruct the driver to remove the volume.",
				"operationId": "VolumeDelete",
				"responses": {
					"204": {
						"description": "The volume was removed"
					},
					"404": {
						"description": "No such volume or volume driver",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"409": {
						"description": "Volume is in use and cannot be removed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"required": true,
						"description": "Volume name or ID",
						"type": "string"
					},
					{
						"name": "force",
						"in": "query",
						"description": "Force the removal of the volume",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Volume"
				]
			}
		},
		"/volumes/prune": {
			"post": {
				"summary": "Delete unused volumes",
				"produces": [
					"application/json"
				],
				"operationId": "VolumePrune",
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the prune list, encoded as JSON (a `map[string][]string`).\n\nAvailable filters:\n- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune volumes with (or without, in case `label!=...` is used) the specified labels.\n",
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "VolumePruneResponse",
							"properties": {
								"VolumesDeleted": {
									"description": "Volumes that were deleted",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"SpaceReclaimed": {
									"description": "Disk space reclaimed in bytes",
									"type": "integer",
									"format": "int64"
								}
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Volume"
				]
			}
		},
		"/networks": {
			"get": {
				"summary": "List networks",
				"description": "Returns a list of networks. For details on the format, see the\n[network inspect endpoint](#operation/NetworkInspect).\n\nNote that it uses a different, smaller representation of a network than\ninspecting a single network. For example, the list of containers attached\nto the network is not propagated in API versions 1.28 and up.\n",
				"operationId": "NetworkList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Network"
							}
						},
						"examples": {
							"application/json": [
								{
									"Name": "bridge",
									"Id": "f2de39df4171b0dc801e8002d1d999b77256983dfc63041c0f34030aa3977566",
									"Created": "2016-10-19T06:21:00.416543526Z",
									"Scope": "local",
									"Driver": "bridge",
									"EnableIPv6": false,
									"Internal": false,
									"Attachable": false,
									"Ingress": false,
									"IPAM": {
										"Driver": "default",
										"Config": [
											{
												"Subnet": "172.17.0.0/16"
											}
										]
									},
									"Options": {
										"com.docker.network.bridge.default_bridge": "true",
										"com.docker.network.bridge.enable_icc": "true",
										"com.docker.network.bridge.enable_ip_masquerade": "true",
										"com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
										"com.docker.network.bridge.name": "docker0",
										"com.docker.network.driver.mtu": "1500"
									}
								},
								{
									"Name": "none",
									"Id": "e086a3893b05ab69242d3c44e49483a3bbbd3a26b46baa8f61ab797c1088d794",
									"Created": "0001-01-01T00:00:00Z",
									"Scope": "local",
									"Driver": "null",
									"EnableIPv6": false,
									"Internal": false,
									"Attachable": false,
									"Ingress": false,
									"IPAM": {
										"Driver": "default",
										"Config": []
									},
									"Containers": {},
									"Options": {}
								},
								{
									"Name": "host",
									"Id": "13e871235c677f196c4e1ecebb9dc733b9b2d2ab589e30c539efeda84a24215e",
									"Created": "0001-01-01T00:00:00Z",
									"Scope": "local",
									"Driver": "host",
									"EnableIPv6": false,
									"Internal": false,
									"Attachable": false,
									"Ingress": false,
									"IPAM": {
										"Driver": "default",
										"Config": []
									},
									"Containers": {},
									"Options": {}
								}
							]
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "JSON encoded value of the filters (a `map[string][]string`) to process\non the networks list.\n\nAvailable filters:\n\n- `dangling=<boolean>` When set to `true` (or `1`), returns all\n   networks that are not in use by a container. When set to `false`\n   (or `0`), only networks that are in use by one or more\n   containers are returned.\n- `driver=<driver-name>` Matches a network's driver.\n- `id=<network-id>` Matches all or part of a network ID.\n- `label=<key>` or `label=<key>=<value>` of a network label.\n- `name=<network-name>` Matches all or part of a network name.\n- `scope=[\"swarm\"|\"global\"|\"local\"]` Filters networks by scope (`swarm`, `global`, or `local`).\n- `type=[\"custom\"|\"builtin\"]` Filters networks by type. The `custom` keyword returns all user-defined networks.\n",
						"type": "string"
					}
				],
				"tags": [
					"Network"
				]
			}
		},
		"/networks/{id}": {
			"get": {
				"summary": "Inspect a network",
				"operationId": "NetworkInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"$ref": "#/definitions/Network"
						}
					},
					"404": {
						"description": "Network not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Network ID or name",
						"required": true,
						"type": "string"
					},
					{
						"name": "verbose",
						"in": "query",
						"description": "Detailed inspect output for troubleshooting",
						"type": "boolean",
						"default": false
					},
					{
						"name": "scope",
						"in": "query",
						"description": "Filter the network by scope (swarm, global, or local)",
						"type": "string"
					}
				],
				"tags": [
					"Network"
				]
			},
			"delete": {
				"summary": "Remove a network",
				"operationId": "NetworkDelete",
				"responses": {
					"204": {
						"description": "No error"
					},
					"403": {
						"description": "operation not supported for pre-defined networks",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such network",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Network ID or name",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Network"
				]
			}
		},
		"/networks/create": {
			"post": {
				"summary": "Create a network",
				"operationId": "NetworkCreate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "NetworkCreateResponse",
							"properties": {
								"Id": {
									"description": "The ID of the created network.",
									"type": "string"
								},
								"Warning": {
									"type": "string"
								}
							},
							"example": {
								"Id": "22be93d5babb089c5aab8dbc369042fad48ff791584ca2da2100db837a1c7c30",
								"Warning": ""
							}
						}
					},
					"403": {
						"description": "operation not supported for pre-defined networks",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "plugin not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "networkConfig",
						"in": "body",
						"description": "Network configuration",
						"required": true,
						"schema": {
							"type": "object",
							"required": [
								"Name"
							],
							"properties": {
								"Name": {
									"description": "The network's name.",
									"type": "string"
								},
								"CheckDuplicate": {
									"description": "Check for networks with duplicate names. Since Network is\nprimarily keyed based on a random ID and not on the name, and\nnetwork name is strictly a user-friendly alias to the network\nwhich is uniquely identified using ID, there is no guaranteed\nway to check for duplicates. CheckDuplicate is there to provide\na best effort checking of any networks which has the same name\nbut it is not guaranteed to catch all name collisions.\n",
									"type": "boolean"
								},
								"Driver": {
									"description": "Name of the network driver plugin to use.",
									"type": "string",
									"default": "bridge"
								},
								"Internal": {
									"description": "Restrict external access to the network.",
									"type": "boolean"
								},
								"Attachable": {
									"description": "Globally scoped network is manually attachable by regular\ncontainers from workers in swarm mode.\n",
									"type": "boolean"
								},
								"Ingress": {
									"description": "Ingress network is the network which provides the routing-mesh\nin swarm mode.\n",
									"type": "boolean"
								},
								"IPAM": {
									"description": "Optional custom IP scheme for the network.",
									"$ref": "#/definitions/IPAM"
								},
								"EnableIPv6": {
									"description": "Enable IPv6 on the network.",
									"type": "boolean"
								},
								"Options": {
									"description": "Network specific options to be used by the drivers.",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								},
								"Labels": {
									"description": "User-defined key/value metadata.",
									"type": "object",
									"additionalProperties": {
										"type": "string"
									}
								}
							},
							"example": {
								"Name": "isolated_nw",
								"CheckDuplicate": false,
								"Driver": "bridge",
								"EnableIPv6": true,
								"IPAM": {
									"Driver": "default",
									"Config": [
										{
											"Subnet": "172.20.0.0/16",
											"IPRange": "172.20.10.0/24",
											"Gateway": "172.20.10.11"
										},
										{
											"Subnet": "2001:db8:abcd::/64",
											"Gateway": "2001:db8:abcd::1011"
										}
									],
									"Options": {
										"foo": "bar"
									}
								},
								"Internal": true,
								"Attachable": false,
								"Ingress": false,
								"Options": {
									"com.docker.network.bridge.default_bridge": "true",
									"com.docker.network.bridge.enable_icc": "true",
									"com.docker.network.bridge.enable_ip_masquerade": "true",
									"com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
									"com.docker.network.bridge.name": "docker0",
									"com.docker.network.driver.mtu": "1500"
								},
								"Labels": {
									"com.example.some-label": "some-value",
									"com.example.some-other-label": "some-other-value"
								}
							}
						}
					}
				],
				"tags": [
					"Network"
				]
			}
		},
		"/networks/{id}/connect": {
			"post": {
				"summary": "Connect a container to a network",
				"operationId": "NetworkConnect",
				"consumes": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error"
					},
					"403": {
						"description": "Operation not supported for swarm scoped networks",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "Network or container not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Network ID or name",
						"required": true,
						"type": "string"
					},
					{
						"name": "container",
						"in": "body",
						"required": true,
						"schema": {
							"type": "object",
							"properties": {
								"Container": {
									"type": "string",
									"description": "The ID or name of the container to connect to the network."
								},
								"EndpointConfig": {
									"$ref": "#/definitions/EndpointSettings"
								}
							},
							"example": {
								"Container": "3613f73ba0e4",
								"EndpointConfig": {
									"IPAMConfig": {
										"IPv4Address": "172.24.56.89",
										"IPv6Address": "2001:db8::5689"
									}
								}
							}
						}
					}
				],
				"tags": [
					"Network"
				]
			}
		},
		"/networks/{id}/disconnect": {
			"post": {
				"summary": "Disconnect a container from a network",
				"operationId": "NetworkDisconnect",
				"consumes": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error"
					},
					"403": {
						"description": "Operation not supported for swarm scoped networks",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "Network or container not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "Network ID or name",
						"required": true,
						"type": "string"
					},
					{
						"name": "container",
						"in": "body",
						"required": true,
						"schema": {
							"type": "object",
							"properties": {
								"Container": {
									"type": "string",
									"description": "The ID or name of the container to disconnect from the network.\n"
								},
								"Force": {
									"type": "boolean",
									"description": "Force the container to disconnect from the network.\n"
								}
							}
						}
					}
				],
				"tags": [
					"Network"
				]
			}
		},
		"/networks/prune": {
			"post": {
				"summary": "Delete unused networks",
				"produces": [
					"application/json"
				],
				"operationId": "NetworkPrune",
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the prune list, encoded as JSON (a `map[string][]string`).\n\nAvailable filters:\n- `until=<timestamp>` Prune networks created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.\n- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune networks with (or without, in case `label!=...` is used) the specified labels.\n",
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "object",
							"title": "NetworkPruneResponse",
							"properties": {
								"NetworksDeleted": {
									"description": "Networks that were deleted",
									"type": "array",
									"items": {
										"type": "string"
									}
								}
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Network"
				]
			}
		},
		"/plugins": {
			"get": {
				"summary": "List plugins",
				"operationId": "PluginList",
				"description": "Returns information about installed plugins.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "No error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Plugin"
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the plugin list.\n\nAvailable filters:\n\n- `capability=<capability name>`\n- `enable=<true>|<false>`\n"
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/privileges": {
			"get": {
				"summary": "Get plugin privileges",
				"operationId": "GetPluginPrivileges",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"description": "Describes a permission the user has to accept upon installing\nthe plugin.\n",
								"type": "object",
								"title": "PluginPrivilegeItem",
								"properties": {
									"Name": {
										"type": "string"
									},
									"Description": {
										"type": "string"
									},
									"Value": {
										"type": "array",
										"items": {
											"type": "string"
										}
									}
								}
							},
							"example": [
								{
									"Name": "network",
									"Description": "",
									"Value": [
										"host"
									]
								},
								{
									"Name": "mount",
									"Description": "",
									"Value": [
										"/data"
									]
								},
								{
									"Name": "device",
									"Description": "",
									"Value": [
										"/dev/cpu_dma_latency"
									]
								}
							]
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "remote",
						"in": "query",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/pull": {
			"post": {
				"summary": "Install a plugin",
				"operationId": "PluginPull",
				"description": "Pulls and installs a plugin. After the plugin is installed, it can be\nenabled using the [`POST /plugins/{name}/enable` endpoint](#operation/PostPluginsEnable).\n",
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "no error"
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "remote",
						"in": "query",
						"description": "Remote reference for plugin to install.\n\nThe `:latest` tag is optional, and is used as the default if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "name",
						"in": "query",
						"description": "Local name for the pulled plugin.\n\nThe `:latest` tag is optional, and is used as the default if omitted.\n",
						"required": false,
						"type": "string"
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration to use when pulling a plugin\nfrom a registry.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string"
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"type": "array",
							"items": {
								"description": "Describes a permission accepted by the user upon installing the\nplugin.\n",
								"type": "object",
								"properties": {
									"Name": {
										"type": "string"
									},
									"Description": {
										"type": "string"
									},
									"Value": {
										"type": "array",
										"items": {
											"type": "string"
										}
									}
								}
							},
							"example": [
								{
									"Name": "network",
									"Description": "",
									"Value": [
										"host"
									]
								},
								{
									"Name": "mount",
									"Description": "",
									"Value": [
										"/data"
									]
								},
								{
									"Name": "device",
									"Description": "",
									"Value": [
										"/dev/cpu_dma_latency"
									]
								}
							]
						}
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/json": {
			"get": {
				"summary": "Inspect a plugin",
				"operationId": "PluginInspect",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Plugin"
						}
					},
					"404": {
						"description": "plugin is not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}": {
			"delete": {
				"summary": "Remove a plugin",
				"operationId": "PluginDelete",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Plugin"
						}
					},
					"404": {
						"description": "plugin is not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "force",
						"in": "query",
						"description": "Disable the plugin before removing. This may result in issues if the\nplugin is in use by a container.\n",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/enable": {
			"post": {
				"summary": "Enable a plugin",
				"operationId": "PluginEnable",
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "plugin is not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "timeout",
						"in": "query",
						"description": "Set the HTTP client timeout (in seconds)",
						"type": "integer",
						"default": 0
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/disable": {
			"post": {
				"summary": "Disable a plugin",
				"operationId": "PluginDisable",
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "plugin is not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/upgrade": {
			"post": {
				"summary": "Upgrade a plugin",
				"operationId": "PluginUpgrade",
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "plugin not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "remote",
						"in": "query",
						"description": "Remote reference to upgrade to.\n\nThe `:latest` tag is optional, and is used as the default if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration to use when pulling a plugin\nfrom a registry.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string"
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"type": "array",
							"items": {
								"description": "Describes a permission accepted by the user upon installing the\nplugin.\n",
								"type": "object",
								"properties": {
									"Name": {
										"type": "string"
									},
									"Description": {
										"type": "string"
									},
									"Value": {
										"type": "array",
										"items": {
											"type": "string"
										}
									}
								}
							},
							"example": [
								{
									"Name": "network",
									"Description": "",
									"Value": [
										"host"
									]
								},
								{
									"Name": "mount",
									"Description": "",
									"Value": [
										"/data"
									]
								},
								{
									"Name": "device",
									"Description": "",
									"Value": [
										"/dev/cpu_dma_latency"
									]
								}
							]
						}
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/create": {
			"post": {
				"summary": "Create a plugin",
				"operationId": "PluginCreate",
				"consumes": [
					"application/x-tar"
				],
				"responses": {
					"204": {
						"description": "no error"
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "query",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "tarContext",
						"in": "body",
						"description": "Path to tar containing plugin rootfs and manifest",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					}
				],
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/push": {
			"post": {
				"summary": "Push a plugin",
				"operationId": "PluginPush",
				"description": "Push a plugin to the registry.\n",
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					}
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "plugin not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Plugin"
				]
			}
		},
		"/plugins/{name}/set": {
			"post": {
				"summary": "Configure a plugin",
				"operationId": "PluginSet",
				"consumes": [
					"application/json"
				],
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "The name of the plugin. The `:latest` tag is optional, and is the\ndefault if omitted.\n",
						"required": true,
						"type": "string"
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"type": "array",
							"items": {
								"type": "string"
							},
							"example": [
								"DEBUG=1"
							]
						}
					}
				],
				"responses": {
					"204": {
						"description": "No error"
					},
					"404": {
						"description": "Plugin not installed",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Plugin"
				]
			}
		},
		"/nodes": {
			"get": {
				"summary": "List nodes",
				"operationId": "NodeList",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Node"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"description": "Filters to process on the nodes list, encoded as JSON (a `map[string][]string`).\n\nAvailable filters:\n- `id=<node id>`\n- `label=<engine label>`\n- `membership=`(`accepted`|`pending`)`\n- `name=<node name>`\n- `node.label=<node label>`\n- `role=`(`manager`|`worker`)`\n",
						"type": "string"
					}
				],
				"tags": [
					"Node"
				]
			}
		},
		"/nodes/{id}": {
			"get": {
				"summary": "Inspect a node",
				"operationId": "NodeInspect",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Node"
						}
					},
					"404": {
						"description": "no such node",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "The ID or name of the node",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Node"
				]
			},
			"delete": {
				"summary": "Delete a node",
				"operationId": "NodeDelete",
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "no such node",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "The ID or name of the node",
						"type": "string",
						"required": true
					},
					{
						"name": "force",
						"in": "query",
						"description": "Force remove a node from the swarm",
						"default": false,
						"type": "boolean"
					}
				],
				"tags": [
					"Node"
				]
			}
		},
		"/nodes/{id}/update": {
			"post": {
				"summary": "Update a node",
				"operationId": "NodeUpdate",
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such node",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "The ID of the node",
						"type": "string",
						"required": true
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"$ref": "#/definitions/NodeSpec"
						}
					},
					{
						"name": "version",
						"in": "query",
						"description": "The version number of the node object being updated. This is required\nto avoid conflicting writes.\n",
						"type": "integer",
						"format": "int64",
						"required": true
					}
				],
				"tags": [
					"Node"
				]
			}
		},
		"/swarm": {
			"get": {
				"summary": "Inspect swarm",
				"operationId": "SwarmInspect",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Swarm"
						}
					},
					"404": {
						"description": "no such swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/init": {
			"post": {
				"summary": "Initialize a new swarm",
				"operationId": "SwarmInit",
				"produces": [
					"application/json",
					"text/plain"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"description": "The node ID",
							"type": "string",
							"example": "7v2t30z9blmxuhnyo6s4cpenp"
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is already part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"type": "object",
							"properties": {
								"ListenAddr": {
									"description": "Listen address used for inter-manager communication, as well\nas determining the networking interface used for the VXLAN\nTunnel Endpoint (VTEP). This can either be an address/port\ncombination in the form `192.168.1.1:4567`, or an interface\nfollowed by a port number, like `eth0:4567`. If the port number\nis omitted, the default swarm listening port is used.\n",
									"type": "string"
								},
								"AdvertiseAddr": {
									"description": "Externally reachable address advertised to other nodes. This\ncan either be an address/port combination in the form\n`192.168.1.1:4567`, or an interface followed by a port number,\nlike `eth0:4567`. If the port number is omitted, the port\nnumber from the listen address is used. If `AdvertiseAddr` is\nnot specified, it will be automatically detected when possible.\n",
									"type": "string"
								},
								"DataPathAddr": {
									"description": "Address or interface to use for data path traffic (format:\n`<ip|interface>`), for example,  `192.168.1.1`, or an interface,\nlike `eth0`. If `DataPathAddr` is unspecified, the same address\nas `AdvertiseAddr` is used.\n\nThe `DataPathAddr` specifies the address that global scope\nnetwork drivers will publish towards other  nodes in order to\nreach the containers running on this node. Using this parameter\nit is possible to separate the container data traffic from the\nmanagement traffic of the cluster.\n",
									"type": "string"
								},
								"DataPathPort": {
									"description": "DataPathPort specifies the data path port number for data traffic.\nAcceptable port range is 1024 to 49151.\nif no port is set or is set to 0, default port 4789 will be used.\n",
									"type": "integer",
									"format": "uint32"
								},
								"DefaultAddrPool": {
									"description": "Default Address Pool specifies default subnet pools for global\nscope networks.\n",
									"type": "array",
									"items": {
										"type": "string",
										"example": [
											"10.10.0.0/16",
											"20.20.0.0/16"
										]
									}
								},
								"ForceNewCluster": {
									"description": "Force creation of a new swarm.",
									"type": "boolean"
								},
								"SubnetSize": {
									"description": "SubnetSize specifies the subnet size of the networks created\nfrom the default subnet pool.\n",
									"type": "integer",
									"format": "uint32"
								},
								"Spec": {
									"$ref": "#/definitions/SwarmSpec"
								}
							},
							"example": {
								"ListenAddr": "0.0.0.0:2377",
								"AdvertiseAddr": "192.168.1.1:2377",
								"DataPathPort": 4789,
								"DefaultAddrPool": [
									"10.10.0.0/8",
									"20.20.0.0/8"
								],
								"SubnetSize": 24,
								"ForceNewCluster": false,
								"Spec": {
									"Orchestration": {},
									"Raft": {},
									"Dispatcher": {},
									"CAConfig": {},
									"EncryptionConfig": {
										"AutoLockManagers": false
									}
								}
							}
						}
					}
				],
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/join": {
			"post": {
				"summary": "Join an existing swarm",
				"operationId": "SwarmJoin",
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is already part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"type": "object",
							"properties": {
								"ListenAddr": {
									"description": "Listen address used for inter-manager communication if the node\ngets promoted to manager, as well as determining the networking\ninterface used for the VXLAN Tunnel Endpoint (VTEP).\n",
									"type": "string"
								},
								"AdvertiseAddr": {
									"description": "Externally reachable address advertised to other nodes. This\ncan either be an address/port combination in the form\n`192.168.1.1:4567`, or an interface followed by a port number,\nlike `eth0:4567`. If the port number is omitted, the port\nnumber from the listen address is used. If `AdvertiseAddr` is\nnot specified, it will be automatically detected when possible.\n",
									"type": "string"
								},
								"DataPathAddr": {
									"description": "Address or interface to use for data path traffic (format:\n`<ip|interface>`), for example,  `192.168.1.1`, or an interface,\nlike `eth0`. If `DataPathAddr` is unspecified, the same addres\nas `AdvertiseAddr` is used.\n\nThe `DataPathAddr` specifies the address that global scope\nnetwork drivers will publish towards other nodes in order to\nreach the containers running on this node. Using this parameter\nit is possible to separate the container data traffic from the\nmanagement traffic of the cluster.\n",
									"type": "string"
								},
								"RemoteAddrs": {
									"description": "Addresses of manager nodes already participating in the swarm.\n",
									"type": "array",
									"items": {
										"type": "string"
									}
								},
								"JoinToken": {
									"description": "Secret token for joining this swarm.",
									"type": "string"
								}
							},
							"example": {
								"ListenAddr": "0.0.0.0:2377",
								"AdvertiseAddr": "192.168.1.1:2377",
								"RemoteAddrs": [
									"node1:2377"
								],
								"JoinToken": "SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-7p73s1dx5in4tatdymyhg9hu2"
							}
						}
					}
				],
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/leave": {
			"post": {
				"summary": "Leave a swarm",
				"operationId": "SwarmLeave",
				"responses": {
					"200": {
						"description": "no error"
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "force",
						"description": "Force leave swarm, even if this is the last manager or that it will\nbreak the cluster.\n",
						"in": "query",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/update": {
			"post": {
				"summary": "Update a swarm",
				"operationId": "SwarmUpdate",
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"$ref": "#/definitions/SwarmSpec"
						}
					},
					{
						"name": "version",
						"in": "query",
						"description": "The version number of the swarm object being updated. This is\nrequired to avoid conflicting writes.\n",
						"type": "integer",
						"format": "int64",
						"required": true
					},
					{
						"name": "rotateWorkerToken",
						"in": "query",
						"description": "Rotate the worker join token.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "rotateManagerToken",
						"in": "query",
						"description": "Rotate the manager join token.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "rotateManagerUnlockKey",
						"in": "query",
						"description": "Rotate the manager unlock key.",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/unlockkey": {
			"get": {
				"summary": "Get the unlock key",
				"operationId": "SwarmUnlockkey",
				"consumes": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "UnlockKeyResponse",
							"properties": {
								"UnlockKey": {
									"description": "The swarm's unlock key.",
									"type": "string"
								}
							},
							"example": {
								"UnlockKey": "SWMKEY-1-7c37Cc8654o6p38HnroywCi19pllOnGtbdZEgtKxZu8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Swarm"
				]
			}
		},
		"/swarm/unlock": {
			"post": {
				"summary": "Unlock a locked manager",
				"operationId": "SwarmUnlock",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"type": "object",
							"properties": {
								"UnlockKey": {
									"description": "The swarm's unlock key.",
									"type": "string"
								}
							},
							"example": {
								"UnlockKey": "SWMKEY-1-7c37Cc8654o6p38HnroywCi19pllOnGtbdZEgtKxZu8"
							}
						}
					}
				],
				"responses": {
					"200": {
						"description": "no error"
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Swarm"
				]
			}
		},
		"/services": {
			"get": {
				"summary": "List services",
				"operationId": "ServiceList",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Service"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the services list.\n\nAvailable filters:\n\n- `id=<service id>`\n- `label=<service label>`\n- `mode=[\"replicated\"|\"global\"]`\n- `name=<service name>`\n"
					},
					{
						"name": "status",
						"in": "query",
						"type": "boolean",
						"description": "Include service status, with count of running and desired tasks.\n"
					}
				],
				"tags": [
					"Service"
				]
			}
		},
		"/services/create": {
			"post": {
				"summary": "Create a service",
				"operationId": "ServiceCreate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "no error",
						"schema": {
							"type": "object",
							"title": "ServiceCreateResponse",
							"properties": {
								"ID": {
									"description": "The ID of the created service.",
									"type": "string"
								},
								"Warning": {
									"description": "Optional warning message",
									"type": "string"
								}
							},
							"example": {
								"ID": "ak7w3gjqoa3kuz8xcpnyy0pvl",
								"Warning": "unable to pin image doesnotexist:latest to digest: image library/doesnotexist:latest not found"
							}
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"403": {
						"description": "network is not eligible for services",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"409": {
						"description": "name conflicts with an existing service",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ServiceSpec"
								},
								{
									"type": "object",
									"example": {
										"Name": "web",
										"TaskTemplate": {
											"ContainerSpec": {
												"Image": "nginx:alpine",
												"Mounts": [
													{
														"ReadOnly": true,
														"Source": "web-data",
														"Target": "/usr/share/nginx/html",
														"Type": "volume",
														"VolumeOptions": {
															"DriverConfig": {},
															"Labels": {
																"com.example.something": "something-value"
															}
														}
													}
												],
												"Hosts": [
													"10.10.10.10 host1",
													"ABCD:EF01:2345:6789:ABCD:EF01:2345:6789 host2"
												],
												"User": "33",
												"DNSConfig": {
													"Nameservers": [
														"8.8.8.8"
													],
													"Search": [
														"example.org"
													],
													"Options": [
														"timeout:3"
													]
												},
												"Secrets": [
													{
														"File": {
															"Name": "www.example.org.key",
															"UID": "33",
															"GID": "33",
															"Mode": 384
														},
														"SecretID": "fpjqlhnwb19zds35k8wn80lq9",
														"SecretName": "example_org_domain_key"
													}
												]
											},
											"LogDriver": {
												"Name": "json-file",
												"Options": {
													"max-file": "3",
													"max-size": "10M"
												}
											},
											"Placement": {},
											"Resources": {
												"Limits": {
													"MemoryBytes": 104857600
												},
												"Reservations": {}
											},
											"RestartPolicy": {
												"Condition": "on-failure",
												"Delay": 10000000000,
												"MaxAttempts": 10
											}
										},
										"Mode": {
											"Replicated": {
												"Replicas": 4
											}
										},
										"UpdateConfig": {
											"Parallelism": 2,
											"Delay": 1000000000,
											"FailureAction": "pause",
											"Monitor": 15000000000,
											"MaxFailureRatio": 0.15
										},
										"RollbackConfig": {
											"Parallelism": 1,
											"Delay": 1000000000,
											"FailureAction": "pause",
											"Monitor": 15000000000,
											"MaxFailureRatio": 0.15
										},
										"EndpointSpec": {
											"Ports": [
												{
													"Protocol": "tcp",
													"PublishedPort": 8080,
													"TargetPort": 80
												}
											]
										},
										"Labels": {
											"foo": "bar"
										}
									}
								}
							]
						}
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration for pulling from private\nregistries.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string"
					}
				],
				"tags": [
					"Service"
				]
			}
		},
		"/services/{id}": {
			"get": {
				"summary": "Inspect a service",
				"operationId": "ServiceInspect",
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Service"
						}
					},
					"404": {
						"description": "no such service",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "ID or name of service.",
						"required": true,
						"type": "string"
					},
					{
						"name": "insertDefaults",
						"in": "query",
						"description": "Fill empty fields with default values.",
						"type": "boolean",
						"default": false
					}
				],
				"tags": [
					"Service"
				]
			},
			"delete": {
				"summary": "Delete a service",
				"operationId": "ServiceDelete",
				"responses": {
					"200": {
						"description": "no error"
					},
					"404": {
						"description": "no such service",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "ID or name of service.",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Service"
				]
			}
		},
		"/services/{id}/update": {
			"post": {
				"summary": "Update a service",
				"operationId": "ServiceUpdate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/ServiceUpdateResponse"
						}
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such service",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "ID or name of service.",
						"required": true,
						"type": "string"
					},
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ServiceSpec"
								},
								{
									"type": "object",
									"example": {
										"Name": "top",
										"TaskTemplate": {
											"ContainerSpec": {
												"Image": "busybox",
												"Args": [
													"top"
												]
											},
											"Resources": {
												"Limits": {},
												"Reservations": {}
											},
											"RestartPolicy": {
												"Condition": "any",
												"MaxAttempts": 0
											},
											"Placement": {},
											"ForceUpdate": 0
										},
										"Mode": {
											"Replicated": {
												"Replicas": 1
											}
										},
										"UpdateConfig": {
											"Parallelism": 2,
											"Delay": 1000000000,
											"FailureAction": "pause",
											"Monitor": 15000000000,
											"MaxFailureRatio": 0.15
										},
										"RollbackConfig": {
											"Parallelism": 1,
											"Delay": 1000000000,
											"FailureAction": "pause",
											"Monitor": 15000000000,
											"MaxFailureRatio": 0.15
										},
										"EndpointSpec": {
											"Mode": "vip"
										}
									}
								}
							]
						}
					},
					{
						"name": "version",
						"in": "query",
						"description": "The version number of the service object being updated. This is\nrequired to avoid conflicting writes.\nThis version number should be the value as currently set on the\nservice *before* the update. You can find the current version by\ncalling `GET /services/{id}`\n",
						"required": true,
						"type": "integer"
					},
					{
						"name": "registryAuthFrom",
						"in": "query",
						"description": "If the `X-Registry-Auth` header is not specified, this parameter\nindicates where to find registry authorization credentials.\n",
						"type": "string",
						"enum": [
							"spec",
							"previous-spec"
						],
						"default": "spec"
					},
					{
						"name": "rollback",
						"in": "query",
						"description": "Set to this parameter to `previous` to cause a server-side rollback\nto the previous service spec. The supplied spec will be ignored in\nthis case.\n",
						"type": "string"
					},
					{
						"name": "X-Registry-Auth",
						"in": "header",
						"description": "A base64url-encoded auth configuration for pulling from private\nregistries.\n\nRefer to the [authentication section](#section/Authentication) for\ndetails.\n",
						"type": "string"
					}
				],
				"tags": [
					"Service"
				]
			}
		},
		"/services/{id}/logs": {
			"get": {
				"summary": "Get service logs",
				"description": "Get `stdout` and `stderr` logs from a service. See also\n[`/containers/{id}/logs`](#operation/ContainerLogs).\n\n**Note**: This endpoint works only for services with the `local`,\n`json-file` or `journald` logging drivers.\n",
				"operationId": "ServiceLogs",
				"responses": {
					"200": {
						"description": "logs returned as a stream in response body",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					"404": {
						"description": "no such service",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such service: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID or name of the service",
						"type": "string"
					},
					{
						"name": "details",
						"in": "query",
						"description": "Show service context and extra details provided to logs.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "follow",
						"in": "query",
						"description": "Keep connection after returning logs.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdout",
						"in": "query",
						"description": "Return logs from `stdout`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stderr",
						"in": "query",
						"description": "Return logs from `stderr`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "since",
						"in": "query",
						"description": "Only return logs since this time, as a UNIX timestamp",
						"type": "integer",
						"default": 0
					},
					{
						"name": "timestamps",
						"in": "query",
						"description": "Add timestamps to every log line",
						"type": "boolean",
						"default": false
					},
					{
						"name": "tail",
						"in": "query",
						"description": "Only return this number of log lines from the end of the logs.\nSpecify as an integer or `all` to output all log lines.\n",
						"type": "string",
						"default": "all"
					}
				],
				"tags": [
					"Service"
				]
			}
		},
		"/tasks": {
			"get": {
				"summary": "List tasks",
				"operationId": "TaskList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Task"
							},
							"example": [
								{
									"ID": "0kzzo1i0y4jz6027t0k7aezc7",
									"Version": {
										"Index": 71
									},
									"CreatedAt": "2016-06-07T21:07:31.171892745Z",
									"UpdatedAt": "2016-06-07T21:07:31.376370513Z",
									"Spec": {
										"ContainerSpec": {
											"Image": "redis"
										},
										"Resources": {
											"Limits": {},
											"Reservations": {}
										},
										"RestartPolicy": {
											"Condition": "any",
											"MaxAttempts": 0
										},
										"Placement": {}
									},
									"ServiceID": "9mnpnzenvg8p8tdbtq4wvbkcz",
									"Slot": 1,
									"NodeID": "60gvrl6tm78dmak4yl7srz94v",
									"Status": {
										"Timestamp": "2016-06-07T21:07:31.290032978Z",
										"State": "running",
										"Message": "started",
										"ContainerStatus": {
											"ContainerID": "e5d62702a1b48d01c3e02ca1e0212a250801fa8d67caca0b6f35919ebc12f035",
											"PID": 677
										}
									},
									"DesiredState": "running",
									"NetworksAttachments": [
										{
											"Network": {
												"ID": "4qvuz4ko70xaltuqbt8956gd1",
												"Version": {
													"Index": 18
												},
												"CreatedAt": "2016-06-07T20:31:11.912919752Z",
												"UpdatedAt": "2016-06-07T21:07:29.955277358Z",
												"Spec": {
													"Name": "ingress",
													"Labels": {
														"com.docker.swarm.internal": "true"
													},
													"DriverConfiguration": {},
													"IPAMOptions": {
														"Driver": {},
														"Configs": [
															{
																"Subnet": "10.255.0.0/16",
																"Gateway": "10.255.0.1"
															}
														]
													}
												},
												"DriverState": {
													"Name": "overlay",
													"Options": {
														"com.docker.network.driver.overlay.vxlanid_list": "256"
													}
												},
												"IPAMOptions": {
													"Driver": {
														"Name": "default"
													},
													"Configs": [
														{
															"Subnet": "10.255.0.0/16",
															"Gateway": "10.255.0.1"
														}
													]
												}
											},
											"Addresses": [
												"10.255.0.10/16"
											]
										}
									]
								},
								{
									"ID": "1yljwbmlr8er2waf8orvqpwms",
									"Version": {
										"Index": 30
									},
									"CreatedAt": "2016-06-07T21:07:30.019104782Z",
									"UpdatedAt": "2016-06-07T21:07:30.231958098Z",
									"Name": "hopeful_cori",
									"Spec": {
										"ContainerSpec": {
											"Image": "redis"
										},
										"Resources": {
											"Limits": {},
											"Reservations": {}
										},
										"RestartPolicy": {
											"Condition": "any",
											"MaxAttempts": 0
										},
										"Placement": {}
									},
									"ServiceID": "9mnpnzenvg8p8tdbtq4wvbkcz",
									"Slot": 1,
									"NodeID": "60gvrl6tm78dmak4yl7srz94v",
									"Status": {
										"Timestamp": "2016-06-07T21:07:30.202183143Z",
										"State": "shutdown",
										"Message": "shutdown",
										"ContainerStatus": {
											"ContainerID": "1cf8d63d18e79668b0004a4be4c6ee58cddfad2dae29506d8781581d0688a213"
										}
									},
									"DesiredState": "shutdown",
									"NetworksAttachments": [
										{
											"Network": {
												"ID": "4qvuz4ko70xaltuqbt8956gd1",
												"Version": {
													"Index": 18
												},
												"CreatedAt": "2016-06-07T20:31:11.912919752Z",
												"UpdatedAt": "2016-06-07T21:07:29.955277358Z",
												"Spec": {
													"Name": "ingress",
													"Labels": {
														"com.docker.swarm.internal": "true"
													},
													"DriverConfiguration": {},
													"IPAMOptions": {
														"Driver": {},
														"Configs": [
															{
																"Subnet": "10.255.0.0/16",
																"Gateway": "10.255.0.1"
															}
														]
													}
												},
												"DriverState": {
													"Name": "overlay",
													"Options": {
														"com.docker.network.driver.overlay.vxlanid_list": "256"
													}
												},
												"IPAMOptions": {
													"Driver": {
														"Name": "default"
													},
													"Configs": [
														{
															"Subnet": "10.255.0.0/16",
															"Gateway": "10.255.0.1"
														}
													]
												}
											},
											"Addresses": [
												"10.255.0.5/16"
											]
										}
									]
								}
							]
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the tasks list.\n\nAvailable filters:\n\n- `desired-state=(running | shutdown | accepted)`\n- `id=<task id>`\n- `label=key` or `label=\"key=value\"`\n- `name=<task name>`\n- `node=<node id or name>`\n- `service=<service name>`\n"
					}
				],
				"tags": [
					"Task"
				]
			}
		},
		"/tasks/{id}": {
			"get": {
				"summary": "Inspect a task",
				"operationId": "TaskInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Task"
						}
					},
					"404": {
						"description": "no such task",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "ID of the task",
						"required": true,
						"type": "string"
					}
				],
				"tags": [
					"Task"
				]
			}
		},
		"/tasks/{id}/logs": {
			"get": {
				"summary": "Get task logs",
				"description": "Get `stdout` and `stderr` logs from a task.\nSee also [`/containers/{id}/logs`](#operation/ContainerLogs).\n\n**Note**: This endpoint works only for services with the `local`,\n`json-file` or `journald` logging drivers.\n",
				"operationId": "TaskLogs",
				"responses": {
					"200": {
						"description": "logs returned as a stream in response body",
						"schema": {
							"type": "string",
							"format": "binary"
						}
					},
					"404": {
						"description": "no such task",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such task: c2ada9df5af8"
							}
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"description": "ID of the task",
						"type": "string"
					},
					{
						"name": "details",
						"in": "query",
						"description": "Show task context and extra details provided to logs.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "follow",
						"in": "query",
						"description": "Keep connection after returning logs.",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stdout",
						"in": "query",
						"description": "Return logs from `stdout`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "stderr",
						"in": "query",
						"description": "Return logs from `stderr`",
						"type": "boolean",
						"default": false
					},
					{
						"name": "since",
						"in": "query",
						"description": "Only return logs since this time, as a UNIX timestamp",
						"type": "integer",
						"default": 0
					},
					{
						"name": "timestamps",
						"in": "query",
						"description": "Add timestamps to every log line",
						"type": "boolean",
						"default": false
					},
					{
						"name": "tail",
						"in": "query",
						"description": "Only return this number of log lines from the end of the logs.\nSpecify as an integer or `all` to output all log lines.\n",
						"type": "string",
						"default": "all"
					}
				],
				"tags": [
					"Task"
				]
			}
		},
		"/secrets": {
			"get": {
				"summary": "List secrets",
				"operationId": "SecretList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Secret"
							},
							"example": [
								{
									"ID": "blt1owaxmitz71s9v5zh81zun",
									"Version": {
										"Index": 85
									},
									"CreatedAt": "2017-07-20T13:55:28.678958722Z",
									"UpdatedAt": "2017-07-20T13:55:28.678958722Z",
									"Spec": {
										"Name": "mysql-passwd",
										"Labels": {
											"some.label": "some.value"
										},
										"Driver": {
											"Name": "secret-bucket",
											"Options": {
												"OptionA": "value for driver option A",
												"OptionB": "value for driver option B"
											}
										}
									}
								},
								{
									"ID": "ktnbjxoalbkvbvedmg1urrz8h",
									"Version": {
										"Index": 11
									},
									"CreatedAt": "2016-11-05T01:20:17.327670065Z",
									"UpdatedAt": "2016-11-05T01:20:17.327670065Z",
									"Spec": {
										"Name": "app-dev.crt",
										"Labels": {
											"foo": "bar"
										}
									}
								}
							]
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the secrets list.\n\nAvailable filters:\n\n- `id=<secret id>`\n- `label=<key> or label=<key>=value`\n- `name=<secret name>`\n- `names=<secret name>`\n"
					}
				],
				"tags": [
					"Secret"
				]
			}
		},
		"/secrets/create": {
			"post": {
				"summary": "Create a secret",
				"operationId": "SecretCreate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/IdResponse"
						}
					},
					"409": {
						"description": "name conflicts with an existing object",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/SecretSpec"
								},
								{
									"type": "object",
									"example": {
										"Name": "app-key.crt",
										"Labels": {
											"foo": "bar"
										},
										"Data": "VEhJUyBJUyBOT1QgQSBSRUFMIENFUlRJRklDQVRFCg==",
										"Driver": {
											"Name": "secret-bucket",
											"Options": {
												"OptionA": "value for driver option A",
												"OptionB": "value for driver option B"
											}
										}
									}
								}
							]
						}
					}
				],
				"tags": [
					"Secret"
				]
			}
		},
		"/secrets/{id}": {
			"get": {
				"summary": "Inspect a secret",
				"operationId": "SecretInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Secret"
						},
						"examples": {
							"application/json": {
								"ID": "ktnbjxoalbkvbvedmg1urrz8h",
								"Version": {
									"Index": 11
								},
								"CreatedAt": "2016-11-05T01:20:17.327670065Z",
								"UpdatedAt": "2016-11-05T01:20:17.327670065Z",
								"Spec": {
									"Name": "app-dev.crt",
									"Labels": {
										"foo": "bar"
									},
									"Driver": {
										"Name": "secret-bucket",
										"Options": {
											"OptionA": "value for driver option A",
											"OptionB": "value for driver option B"
										}
									}
								}
							}
						}
					},
					"404": {
						"description": "secret not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"type": "string",
						"description": "ID of the secret"
					}
				],
				"tags": [
					"Secret"
				]
			},
			"delete": {
				"summary": "Delete a secret",
				"operationId": "SecretDelete",
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "secret not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"type": "string",
						"description": "ID of the secret"
					}
				],
				"tags": [
					"Secret"
				]
			}
		},
		"/secrets/{id}/update": {
			"post": {
				"summary": "Update a Secret",
				"operationId": "SecretUpdate",
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such secret",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "The ID or name of the secret",
						"type": "string",
						"required": true
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"$ref": "#/definitions/SecretSpec"
						},
						"description": "The spec of the secret to update. Currently, only the Labels field\ncan be updated. All other fields must remain unchanged from the\n[SecretInspect endpoint](#operation/SecretInspect) response values.\n"
					},
					{
						"name": "version",
						"in": "query",
						"description": "The version number of the secret object being updated. This is\nrequired to avoid conflicting writes.\n",
						"type": "integer",
						"format": "int64",
						"required": true
					}
				],
				"tags": [
					"Secret"
				]
			}
		},
		"/configs": {
			"get": {
				"summary": "List configs",
				"operationId": "ConfigList",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"type": "array",
							"items": {
								"$ref": "#/definitions/Config"
							},
							"example": [
								{
									"ID": "ktnbjxoalbkvbvedmg1urrz8h",
									"Version": {
										"Index": 11
									},
									"CreatedAt": "2016-11-05T01:20:17.327670065Z",
									"UpdatedAt": "2016-11-05T01:20:17.327670065Z",
									"Spec": {
										"Name": "server.conf"
									}
								}
							]
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "filters",
						"in": "query",
						"type": "string",
						"description": "A JSON encoded value of the filters (a `map[string][]string`) to\nprocess on the configs list.\n\nAvailable filters:\n\n- `id=<config id>`\n- `label=<key> or label=<key>=value`\n- `name=<config name>`\n- `names=<config name>`\n"
					}
				],
				"tags": [
					"Config"
				]
			}
		},
		"/configs/create": {
			"post": {
				"summary": "Create a config",
				"operationId": "ConfigCreate",
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/IdResponse"
						}
					},
					"409": {
						"description": "name conflicts with an existing object",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"schema": {
							"allOf": [
								{
									"$ref": "#/definitions/ConfigSpec"
								},
								{
									"type": "object",
									"example": {
										"Name": "server.conf",
										"Labels": {
											"foo": "bar"
										},
										"Data": "VEhJUyBJUyBOT1QgQSBSRUFMIENFUlRJRklDQVRFCg=="
									}
								}
							]
						}
					}
				],
				"tags": [
					"Config"
				]
			}
		},
		"/configs/{id}": {
			"get": {
				"summary": "Inspect a config",
				"operationId": "ConfigInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "no error",
						"schema": {
							"$ref": "#/definitions/Config"
						},
						"examples": {
							"application/json": {
								"ID": "ktnbjxoalbkvbvedmg1urrz8h",
								"Version": {
									"Index": 11
								},
								"CreatedAt": "2016-11-05T01:20:17.327670065Z",
								"UpdatedAt": "2016-11-05T01:20:17.327670065Z",
								"Spec": {
									"Name": "app-dev.crt"
								}
							}
						}
					},
					"404": {
						"description": "config not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"type": "string",
						"description": "ID of the config"
					}
				],
				"tags": [
					"Config"
				]
			},
			"delete": {
				"summary": "Delete a config",
				"operationId": "ConfigDelete",
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "no error"
					},
					"404": {
						"description": "config not found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"required": true,
						"type": "string",
						"description": "ID of the config"
					}
				],
				"tags": [
					"Config"
				]
			}
		},
		"/configs/{id}/update": {
			"post": {
				"summary": "Update a Config",
				"operationId": "ConfigUpdate",
				"responses": {
					"200": {
						"description": "no error"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"404": {
						"description": "no such config",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"503": {
						"description": "node is not part of a swarm",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "id",
						"in": "path",
						"description": "The ID or name of the config",
						"type": "string",
						"required": true
					},
					{
						"name": "body",
						"in": "body",
						"schema": {
							"$ref": "#/definitions/ConfigSpec"
						},
						"description": "The spec of the config to update. Currently, only the Labels field\ncan be updated. All other fields must remain unchanged from the\n[ConfigInspect endpoint](#operation/ConfigInspect) response values.\n"
					},
					{
						"name": "version",
						"in": "query",
						"description": "The version number of the config object being updated. This is\nrequired to avoid conflicting writes.\n",
						"type": "integer",
						"format": "int64",
						"required": true
					}
				],
				"tags": [
					"Config"
				]
			}
		},
		"/distribution/{name}/json": {
			"get": {
				"summary": "Get image information from the registry",
				"description": "Return image digest and platform information by contacting the registry.\n",
				"operationId": "DistributionInspect",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "descriptor and platform information",
						"schema": {
							"type": "object",
							"x-go-name": "DistributionInspect",
							"title": "DistributionInspectResponse",
							"required": [
								"Descriptor",
								"Platforms"
							],
							"properties": {
								"Descriptor": {
									"type": "object",
									"description": "A descriptor struct containing digest, media type, and size.\n",
									"properties": {
										"MediaType": {
											"type": "string"
										},
										"Size": {
											"type": "integer",
											"format": "int64"
										},
										"Digest": {
											"type": "string"
										},
										"URLs": {
											"type": "array",
											"items": {
												"type": "string"
											}
										}
									}
								},
								"Platforms": {
									"type": "array",
									"description": "An array containing all platforms supported by the image.\n",
									"items": {
										"type": "object",
										"properties": {
											"Architecture": {
												"type": "string"
											},
											"OS": {
												"type": "string"
											},
											"OSVersion": {
												"type": "string"
											},
											"OSFeatures": {
												"type": "array",
												"items": {
													"type": "string"
												}
											},
											"Variant": {
												"type": "string"
											},
											"Features": {
												"type": "array",
												"items": {
													"type": "string"
												}
											}
										}
									}
								}
							}
						},
						"examples": {
							"application/json": {
								"Descriptor": {
									"MediaType": "application/vnd.docker.distribution.manifest.v2+json",
									"Digest": "sha256:c0537ff6a5218ef531ece93d4984efc99bbf3f7497c0a7726c88e2bb7584dc96",
									"Size": 3987495,
									"URLs": [
										""
									]
								},
								"Platforms": [
									{
										"Architecture": "amd64",
										"OS": "linux",
										"OSVersion": "",
										"OSFeatures": [
											""
										],
										"Variant": "",
										"Features": [
											""
										]
									}
								]
							}
						}
					},
					"401": {
						"description": "Failed authentication or no image found",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						},
						"examples": {
							"application/json": {
								"message": "No such image: someimage (tag: latest)"
							}
						}
					},
					"500": {
						"description": "Server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"parameters": [
					{
						"name": "name",
						"in": "path",
						"description": "Image name or id",
						"type": "string",
						"required": true
					}
				],
				"tags": [
					"Distribution"
				]
			}
		},
		"/session": {
			"post": {
				"summary": "Initialize interactive session",
				"description": "Start a new interactive session with a server. Session allows server to\ncall back to the client for advanced capabilities.\n\n### Hijacking\n\nThis endpoint hijacks the HTTP connection to HTTP2 transport that allows\nthe client to expose gPRC services on that connection.\n\nFor example, the client sends this request to upgrade the connection:\n\n```\nPOST /session HTTP/1.1\nUpgrade: h2c\nConnection: Upgrade\n```\n\nThe Docker daemon responds with a `101 UPGRADED` response follow with\nthe raw stream:\n\n```\nHTTP/1.1 101 UPGRADED\nConnection: Upgrade\nUpgrade: h2c\n```\n",
				"operationId": "Session",
				"produces": [
					"application/vnd.docker.raw-stream"
				],
				"responses": {
					"101": {
						"description": "no error, hijacking successful"
					},
					"400": {
						"description": "bad parameter",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					},
					"500": {
						"description": "server error",
						"schema": {
							"$ref": "#/definitions/ErrorResponse"
						}
					}
				},
				"tags": [
					"Session"
				]
			}
		}
	}
};