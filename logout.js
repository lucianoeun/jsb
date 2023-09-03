//const user = require('./db/user');

on("playerDropped", async(reason) => {

    const playerId = global.source;   
    const steamkey = GetPlayerIdentifierByType(playerId, 'steam'); 

    console.log(`Usuario da ${steamkey}, saiu da cidade via ${reason}`); 

    //-----------------------------------------

    const userId = await user.verificarSteam(steamkey);
    console.log("User id na saida: "+userId)

    //-----------------------------------------

    // const ped = GetPlayerPed(playerId)
    // const [x,y,z] = await GetEntityCoords(ped);
    // const h = await GetEntityHeading(ped)
    // console.log(`X: ${x}, Y: ${y}, Z: ${z}, H:${h}`);
   
}); 