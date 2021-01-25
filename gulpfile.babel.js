import BrowserSync from './tasks/BrowserSync.js';

let config = require('./config.json');
let browserSync = new BrowserSync(config.browserSync);

