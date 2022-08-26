let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
let adapter = new FileSync('db.json');
let db = low(adapter);
db.defaults({users:[], topics:[]}).write();
module.exports = db;