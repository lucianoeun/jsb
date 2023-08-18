const db = require('./db/conexao')

function load(){

    const conn = db.conexao();
    conn.connect(); 
    conn.query('SELECT * FROM usuario', (error, results, fields) =>{
      if (error) throw error;
      console.log(results);
    });  

    conn.end();
    return results;
}