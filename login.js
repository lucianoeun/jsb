const user = require('./db/user');


on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();  

    const playerId = global.source;
  
    setTimeout(async() => {

        //primeira mensagem de verificação
        deferrals.update(`Olá ${name}. estamos pegando o codigo de sua steam.`);

        console.log("Iniciando a verificação")
        
        const steamkey = GetPlayerIdentifierByType(playerId, 'steam');
        

        if(steamkey){
              //verificar se a steam existe no banco.
            const userId = await user.verificarSteam(steamkey);
            console.log(userId)
            if(userId){
              const ativado = await  user.verificarAtivado(userId);
              console.log(ativado)
              if(ativado){
                deferrals.done();
                console.log("Entrando na cidade....")
              }else{
                deferrals.done(`Olá ${name}, Este e o seu Id: ${userId}, aguardar sua ativação pelo Discord`);
              }
          }else{
              //cadastar
              const uid = await user.inserirSteam(steamkey);          

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


on('playerJoining', async() => {

    const playerId = global.source;
    const steamkey = await GetPlayerIdentifierByType(playerId, 'steam');

    console.log("Entrando na cidade com a SteamKey: "+steamkey);

    const userId = await user.verificarSteam(steamkey);
    console.log("User Id na entrada: "+userId)

});