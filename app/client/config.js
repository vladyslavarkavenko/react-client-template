const CONFIG = {};

CONFIG.PORT = process.env.PORT || 3000;
CONFIG.API_URL = process.env.API_URL || 'http://dev-ctru.skywell.software';
CONFIG.APP_URL = process.env.APP_URL || 'http://localhost:3000';
CONFIG.DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

module.exports = CONFIG;
