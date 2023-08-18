function conexao(){
    const mysql      = require('mysql');
    const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'jsbdata'
    });
    return connection;
}
module.exports = { conexao };