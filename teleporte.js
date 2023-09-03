onNet('teleporte', async(mensagem)=>{
    console.log(mensagem);  

    const player = global.source;
    const ped = GetPlayerPed(player);
    const [x,y,z] = await GetEntityCoords(ped);
    console.log(x,y,z)  

    // const ret = IsPlayerCommerceInfoLoaded(ped)
    // console.log(ret)

    // const ret2 = IsPlayerCommerceInfoLoadedExt(ped)
    // console.log(ret2)

    // const ret3 = LoadPlayerCommerceData(ped)
    // console.log(ret3)

    // const ret4 = LoadPlayerCommerceDataExt(ped)
    // console.log(ret4)  

});