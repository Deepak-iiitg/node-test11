const mysql = require('mysql2');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Deepak@1234',
    database:'stationary_management'
});

module.exports = {conn};