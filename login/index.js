const db = require('../db/db.js');

async function listar(){
    try {
       
        const conn = await db.connect();       
        let [retorno] = await conn.query("SELECT * FROM teleporte ");
        console.log(retorno)
    
    } catch (error) {
        console.log(error)
    }     
}

//listar()


async function buscar(userid){
    const conn = await db.connect();
    const [retorno] = await conn.query("SELECT tp FROM teleporte WHERE userid=?", [userid]);
    const ret = retorno[0].tp;
    console.log(ret)
    return ret;
  }

buscar(4);
  
  
  async function atualizar(tp, userid){
    const conn = await db.connect();
    let [retorno] = await conn.query("UPDATE teleporte SET tp=? WHERE userid=?", [tp, userid]);
    console.log(retorno)
    return retorno[0];
  }