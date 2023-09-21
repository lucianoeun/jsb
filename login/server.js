const root = GetResourcePath(GetCurrentResourceName());
const db = require(`${root}/db/db.js`);
var utp = null;

on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();  

    const player_id = global.source;
  
    setTimeout(async() => {

        //primeira mensagem de verificação
        deferrals.update(`Olá ${name}. estamos pegando o codigo de sua steam.`);

        console.log("Iniciando a verificação")
        
        const steamkey = GetPlayerIdentifierByType(player_id, 'steam');
        

        if(steamkey){
              //verificar se a steam existe no banco.
            const userId = await verificarSteam(steamkey);
            console.log(userId)
            if(userId){
              const ativado = await  verificarAtivado(userId);
              console.log(ativado)
              if(ativado){
                deferrals.done();
                console.log("Entrando na cidade....");  
                // utp = await buscarTp(userid);  
                // console.log("Primeira opção: "+utp)                        

              }else{
                deferrals.done(`Olá ${name}, Este e o seu Id: ${userId}, aguardar sua ativação pelo Discord`);
              }
          }else{
              //cadastar
              const uid = await inserirSteam(steamkey);          

              if(uid){
                deferrals.done(`Olá ${name}, Este e o seu Id: ${uid}, aguardar sua ativação pelo Discord`);
              }else{
                deferrals.done(`Olá ${name}, Erro no cadastro da sua steam, tente entrar mais tarde`);
              }

          }    

        }else{
          deferrals.done(`Olá ${name}, Erro no cadastro da sua steam, tente entrar mais tarde`);
        }      
  
    }, 0);
  });


  
//=================================================================================


on("playerDropped", async(reason) => { 

   //pegar o palyer id
    const player = global.source;  

    //pegar o ped id
    const ped = GetPlayerPed(player);

     //pegar posição x,y,z do ped
    const [x, y, z] = GetEntityCoords(ped);  
    const posicao = `[${x}, ${y}, ${z}]`;

    // console.log(`[${x}, ${y}, ${z}]`);
    // console.log(`Player ${GetPlayerName(player)} dropped (Reason: ${reason}).`);

    //update teleporte
    const id = await buscarId();
    const [resultado] = await updateTp(posicao, id);
    console.log(resultado[0].affectedRows)

});


//==[ função e forma de pegar o id pela função ]====================================

async function buscarId(){  
  const player = global.source; 
  const conn = await db.connect();
  const steam = GetPlayerIdentifierByType(player, 'steam');
  const [retorno] = await conn.query("SELECT id FROM user WHERE steamkey=?", [steam]);
  const rst = retorno[0].id;
  return rst;
}

//==[ função e forma de pegar o id pela função ]====================================



onNet('pegarid', async()=>{ 
  const player = global.source;
  const rst = await buscarId();   
  console.log(rst)
  emitNet('meuid', player, rst);   
});

//==[ FUNÇÃO SALVAR POSIÇÃO ]====================================


onNet('salvartp', async(tp, userid)=>{ 
  let rst = await updateTp(tp, userid); 
  console.log(rst);    
});

//console.log("Segunda opção: "+utp)

//=================================================================================
//=================================================================================
// //ID, STEAMKEY, ATIVO, DATACAD, DATAACESSO
//=================================================================================
//=================================================================================


// RegisterCommand('id', async(source)=>{ 
//   console.log(source)
//   let rst = await buscarId(source);
//   //enviando
//   emitNet('meuid', source, rst);  
// })



async function verificarSteam(steamkey){
  try {
     
      const conn = await db.connect();         
      const sql = "SELECT * FROM user WHERE steamkey=?";
      const values = [steamkey];
      let [retorno] = await conn.query(sql, values);

      if(retorno.length > 0){              
          return retorno[0].id;  
      }else{            
          return false;  
      }          
  
  } catch (error) {
      console.log(error)
  }     
}

async function verificarAtivado(id){
  try {
     
      const conn = await db.connect();         
      const sql = "SELECT * FROM user WHERE id=?";
      const values = [id];
      let [retorno] = await conn.query(sql, values);

      if(retorno.length > 0){  
          if(retorno[0].ativo == '1'){
              return retorno[0].id;
          }else{
              return false;
          }         
           
      }else{            
          return false;
      }          
  
  } catch (error) {
      console.log(error)
  }     
}



async function inserirSteam(steamkey){
  try {

      const conn = await db.connect();         
      const sql = "INSERT INTO user(steamkey, ativo, datacad, dataacesso) VALUES (?,?,?,?)";
      const values = [steamkey,'0','20/02/2323','20/02/2323'];
      let rst = await conn.query(sql, values);
      return rst[0].insertId;     
  
  } catch (error) {
      console.log(error)
  }   
}

async function ativarUser(id, ativo){
  try {

      const conn = await db.connect();         
      const sql = "UPDATE user SET ativo=? WHERE id=?";
      const values = [ativo, id];
      let rst = await conn.query(sql, values);        
      return rst[0].affectedRows;     
  
  } catch (error) {
      console.log(error)
  }   
}

//==[ TELEPORTES ]=============================================================

async function buscarTp(userid){
  const conn = await db.connect();
  let [retorno] = await conn.query("SELECT tp FROM teleporte WHERE userid=?", [userid]);
  const ret = retorno[0].tp;
  return ret;
}


async function updateTp(tp, userid){
  const conn = await db.connect();
  let [retorno] = await conn.query("UPDATE teleporte SET tp=? WHERE userid=?", [tp, userid]);
  console.log(retorno)
  return retorno[0];
}

// async function teleporte(id){
//   try {
     
//       const conn = await db.connect();         
//       const sql = "SELECT tp FROM teleporte WHERE id=?";
//       const values = [id];
//       let [retorno] = await conn.query(sql, values);

//       if(retorno.length > 0){  
//           if(retorno[0].ativo == '1'){
//               return retorno[0].id;
//           }else{
//               return false;
//           }         
           
//       }else{            
//           return false;
//       }          
  
//   } catch (error) {
//       console.log(error)
//   }     
// }