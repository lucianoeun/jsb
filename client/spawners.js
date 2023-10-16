Delay = (ms) => new Promise(res => setTimeout(res, ms));

var primeira = true;

on('onClientGameTypeStart', () => {
    exports.spawnmanager.setAutoSpawnCallback(() => {     
      exports.spawnmanager.spawnPlayer(
        {             
          x: -2360.79,
          y: 3245.13,
          z: 92.90,
          heading: 291.71,
          model: 'mp_m_freemode_01',
          skipFade: false
        }   
      );
    });   
    exports.spawnmanager.setAutoSpawn(true)
    exports.spawnmanager.forceRespawn()  
  });

setTick(()=>{
   
    if(IsControlJustReleased(1, 54)){     
        SetNuiFocus(true, true)
        SendNuiMessage(JSON.stringify({ item: "abrir"}))
    }
})


RegisterNuiCallbackType("btnx")
on('__cfx_nui:btnx', (data, cb) =>{       
    const e = data.item;
    if( e === "fechar"){
        SetNuiFocus(false);      
        emitNet('player:tp');
    }    
})