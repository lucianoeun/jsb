//const user = require('./db/user');

on("playerDropped", async(reason) => {

    const playerId = global.source;   
    const steamkey = GetPlayerIdentifierByType(playerId, 'steam'); 

    console.log(`Usuario da ${steamkey}, saiu da cidade via ${reason}`); 

    const userId = await user.verificarSteam(steamkey);
    console.log("User id na saida: "+userId)
   
});  


//salvar posição