import mysql from 'mysql';
let db = mysql.createConnection({
  host:'',
  user:'',
  password:'',
  database:''
});
db.connect();
export default db;