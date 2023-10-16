const root = GetResourcePath(GetCurrentResourceName());
const player = require(`${root}/db/players.js`);


on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();  

    const playerId = global.source;
  
    setTimeout(async() => {

        //primeira mensagem de verificação
        deferrals.update(`Olá ${name}. estamos pegando o codigo de sua steam.`); 

        const steam = GetPlayerIdentifierByType(playerId, 'steam');        

        if(steam){
              //verificar se a steam existe no banco.
            const id = await player.verificarSteam(steam);
            console.log(id)
            if(id){
              const ativado = await  player.verificarAtivado(id);
              console.log(ativado)
              if(ativado){
                deferrals.done();
                console.log("Entrando na cidade...."); 
              }else{
                deferrals.done(`Olá ${name}, Este e o seu Id: ${id}, aguardar sua ativação pelo Discord`);
              }
          }else{
              //cadastrar
              const id = await player.inserirSteam(steam);          

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

   const playerId = global.source;  

   const ped = GetPlayerPed(playerId);
   const [x, y, z] = GetEntityCoords(ped);  
   const posicao = `[${x}, ${y}, ${z}]`;
  
  console.log(`Player ${GetPlayerName(playerId)} dropped (Reason: ${reason}).`);

   const steam = GetPlayerIdentifierByType(playerId, 'steam');
   const rst = await player.updatePosicao(steam, posicao);
 
});



//====================================================================

onNet('player:tp', async()=>{   
  const playerId = global.source;

  const steam = GetPlayerIdentifierByType(playerId, 'steam');
  const p = await player.buscarPosicao(steam);
  const p2 = JSON.parse(p);  

  const ped = GetPlayerPed(playerId);
  SetPedDefaultComponentVariation(ped)
  SetEntityCoords(ped, p2[0], p2[1], p2[2], false, false, true);

})