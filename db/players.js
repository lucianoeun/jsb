const db = require('./db.js');

//==[ STEAM ]============================
//const steam = 'steam:11000010b96b3ab3';

async function verificarSteam(steam){
    const conn = await db.connect();        
    const [retorno] = await conn.query("SELECT id FROM player WHERE steam=?", [steam]); 
    if(retorno.length > 0){ return retorno[0].id;  }else{ return false; }        
}


async function verificarAtivado(id){
    const conn = await db.connect();      
    const [retorno] = await conn.query("SELECT ativo FROM player WHERE id=?", [id]);   
    if(retorno[0].ativo === 1){ return true; }else{ return false; }
}
  

async function inserirSteam(steam){
    const conn = await db.connect();        
    const [retorno] = await conn.query("INSERT INTO player(steam) VALUES (?)", [steam]); 
    const rst = await inserirPosicao(steam, ''); 
    console.log(rst);
    return retorno.insertId;   
}

//==[ TELEPORTES ]============================


async function inserirPosicao(steam, posicao){
  const conn = await db.connect();        
  const [retorno] = await conn.query("INSERT INTO teleporte(steam, posicao) VALUES (?,?)", [steam, posicao]);  
  return retorno.insertId;   
}

// const steam = 'steam:11000010b96b3ab';
// const posicao = '[598.3912353515625, 596.6637573242188, 129.030761715]';

async function updatePosicao(steam, posicao){
  const conn = await db.connect();
  const [retorno] = await conn.query("UPDATE teleporte SET posicao=? WHERE steam=?", [posicao, steam]);  
  return retorno.affectedRows;
}


async function buscarPosicao(steam){
  const conn = await db.connect();
  let [retorno] = await conn.query("SELECT posicao FROM teleporte WHERE steam=?", [steam]);  
  return  retorno[0].posicao;
}


module.exports = {verificarSteam, verificarAtivado, inserirSteam, inserirPosicao, updatePosicao, buscarPosicao}