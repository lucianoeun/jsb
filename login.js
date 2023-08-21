

on("playerConnecting", (name, setKickReason, deferrals) => {
    deferrals.defer();
  
    const player = global.source;
  
    setTimeout(() => {
      deferrals.update(`Hello ${name}. Your steam ID is being checked.`);
  
      let steamIdentifier = null;
  
      for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);
  
        if (identifier.includes("steam:")) {
          
            steamIdentifier = identifier;

          //verificar se a steam existe no banco.

          //cadastrar a steam, retornar id, informar aguardando ativação.

          //verificar se a steam esta ativada, retornar id, informar aguardando ativação.


          //logar

        }
      }
  
      // pretend to be a wait
      setTimeout(() => {
        if (steamIdentifier === null) {
          deferrals.done("You are not connected to Steam.");
        } else {
          deferrals.done();
        }
      }, 0);
    }, 0);
  });