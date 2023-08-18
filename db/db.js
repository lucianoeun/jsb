const mysql = require('mysql');
var res;

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'jsdb'
});

//----------------------------------------------------------------------------------

function loadSteam() {   
  conn.query('SELECT * FROM usuario', (error, results, fields)=>{
    if (error) throw error; res = results; console.log(results);    
  });  
  conn.end();
  return res;
}

//loadSteam('usuario');



//------------------------------------------------------------------------------------

function saveSteam(steam) {
 
  conn.query('INSERT INTO usuario SET ?', { steamcode:steam, ativo:'0'}, function (error, results, fields) {
    if (error) throw error; res = results.insertId;
    console.log(results.insertId);
  });
  conn.end();
  return res;
}
saveSteam('steamcode9');


//------------------------------------------------------------------------------------

function updateSteam(steam) {
 
  conn.query('INSERT INTO usuario SET ?', { steamcode:steam, ativo:'0'}, function (error, results, fields) {
    if (error) throw error; res = results.insertId;
    console.log(results.insertId);
  });
  conn.end();
  return res;
}
updateSteam('steamcode9');

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------




var query = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");
console.log(query);

var userId = 1;
var columns = ['username', 'email'];
var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});

console.log(query.sql);

var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
var sql = mysql.format('UPDATE posts SET modified = ? WHERE id = ?', [CURRENT_TIMESTAMP, 42]);
console.log(sql); // UPDATE posts SET modified = CURRENT_TIMESTAMP() WHERE id = 42


var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
  if (error) throw error;
  // Neat!
});
console.log(query.sql);








connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
  if (error) throw error;
  console.log(results.insertId);
});


connection.query('DELETE FROM posts WHERE title = "wrong"', function (error, results, fields) {
  if (error) throw error;
  console.log('deleted ' + results.affectedRows + ' rows');
})


connection.query('UPDATE posts SET ...', function (error, results, fields) {
  if (error) throw error;
  console.log('changed ' + results.changedRows + ' rows');
})

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
});