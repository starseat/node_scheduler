module.exports = {
  apps : [
	{
	  name: 'gnm-scheduler',
	  script: './app.js',
	  instances: 1,
	  exec_mode: `cluster`,
	  wait_ready: true,
	  listen_timeout: 50000,
	  kill_timeout: 5000
	},
  ]
};
