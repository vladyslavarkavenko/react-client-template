const CONFIG = {};

// We have process.env only when build project with docker.
CONFIG.ENV = process.env.NODE_ENV || 'development';
CONFIG.PORT = process.env.PORT || 3000;
CONFIG.API_URL = process.env.API_URL || 'https://dev-ctru.skywell.software';
CONFIG.APP_URL = process.env.APP_URL || 'http://localhost:3000';
CONFIG.DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

module.exports = CONFIG;
