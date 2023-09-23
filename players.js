const root = GetResourcePath(GetCurrentResourceName());
const db = require(`${root}/db.js`);

//const db = require('./db.js');

on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();  

    const player = global.source;
  
    setTimeout(async() => {

        //primeira mensagem de verificação
        deferrals.update(`Olá ${name}. estamos pegando o codigo de sua steam.`);     
        const steam = GetPlayerIdentifierByType(player, 'steam');        

        if(steam){
              //verificar se a steam existe no banco.
            const id = await verificarSteam(steam);
            console.log(id)
            if(id){
              const ativado = await  verificarAtivado(id);
              console.log(ativado)
              if(ativado){
                deferrals.done();
                console.log("Entrando na cidade...."); 
              }else{
                deferrals.done(`Olá ${name}, Este e o seu Id: ${id}, aguardar sua ativação pelo Discord`);
              }
          }else{
              //cadastrar
              const id = await inserirSteam(steam);          

              if(id){
                deferrals.done(`Olá ${name}, Este e o seu Id: ${id}, aguardar sua ativação pelo Discord`);
              }else{
                deferrals.done(`Olá ${name}, Erro no cadastro da sua steam, tente entrar mais tarde`);
              }

          }    

        }else{
          deferrals.done(`Olá ${name}, Erro no cadastro da sua steam, tente entrar mais tarde`);
        }      
  
    }, 0);
  });


//====================================================================

on("playerDropped", async(reason) => { 

   const player = global.source;  
   const ped = GetPlayerPed(player);
   const [x, y, z] = GetEntityCoords(ped);  
   const posicao = `[${x}, ${y}, ${z}]`;
  
  console.log(`Player ${GetPlayerName(player)} dropped (Reason: ${reason}).`);

   const steam = GetPlayerIdentifierByType(player, 'steam');
   const rst = await updatePosicao(steam, posicao);
 
});



//====================================================================


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