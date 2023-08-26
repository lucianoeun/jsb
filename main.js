const user = require('./db/user');

var steamkey = null;
var userId = null;

on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();
  
    const player = global.source;
  
    setTimeout(async() => {

      //primeira mensagem de verificação
      deferrals.update(`Olá ${name}. estamos pegando o codigo de sua steam.`);
  
      let steamIdentifier = null;
  
      for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);

        console.log(identifier)
  
        if (identifier.includes("steam:")) {
          
            steamIdentifier = identifier;
            steamkey = steamIdentifier;

            //console.log(steamkey)

          //verificar se a steam existe no banco.
          userId = await user.verificarSteam(steamkey)

          if(userId){
              const ativado = await  user.verificarAtivado(userId);
              if(ativado){
                deferrals.done();
              }else{
                deferrals.done(`Olá ${name}, Este e o seu Id: ${userId}, aguardar sua ativação pelo Discord`);
              }
          }else{
              //cadastar

              let uid = await user.inserirSteam(steamkey);             

              if(uid){
                deferrals.done(`Olá ${name}, Este e o seu Id: ${uid}, aguardar sua ativação pelo Discord`);
              }else{
                deferrals.done(`Olá ${name}, Erro no cadastro da sua steam, tente entrar mais tarde`);
              }

          }

        }
      }
  
      // pretend to be a wait
      setTimeout(() => {
        if (steamIdentifier === null) {
          deferrals.done("Você precisa estar com a Steam aberta.");
        } else {
          deferrals.done();
        }
      }, 0);
    }, 0);
  });