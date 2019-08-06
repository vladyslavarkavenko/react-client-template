const CONFIG = {};

CONFIG.API_URL = process.env.API_URL || 'http://localhost:3000';
CONFIG.DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

module.exports = CONFIG;
