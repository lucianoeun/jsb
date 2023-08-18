const conn = db.conexao();
var resultado;

function load(){ 
    
    conn.connect(); 

    conn.query('SELECT * FROM usuario', (error, results, fields) =>{
      if (error) throw error;
      resultado = results;
      console.log(results);
    });  

    conn.end();
    
    return resultado;
}