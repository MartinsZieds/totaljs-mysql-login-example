// ===================================================
// FOR DEVELOPMENT
// Total.js - framework for Node.js platform
// https://www.totaljs.com
// ===================================================

var options = { port: 8080, ip: process.env.IP };

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);
// options.config = { name: 'Total.js' };
// options.sleep = 3000;
// options.inspector = 9229;
// options.debugger = 40894;

require('total.js/debug')(options);
