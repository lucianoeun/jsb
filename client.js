on('onClientGameTypeStart', () => {  
           
    exports.spawnmanager.setAutoSpawnCallback(() => {
      exports.spawnmanager.spawnPlayer({
        x: 686.245,
        y: 577.950,
        z: 130.461,
        model: 'a_m_m_skater_01'
      });
    });
  
    exports.spawnmanager.setAutoSpawn(true)
    exports.spawnmanager.forceRespawn()
    
  });


  on('onClientGameTypeStop', () => { 
    //const loc = GetEntityCoords(PlayerPedId(), false);
     emitNet('teleporte','Gamer parado por algum motivo');
  });

  //X: 4.624284932271896e-44, Y: 6.726232628759122e-44, Z: -5.8859059260785875e-34

  RegisterCommand('tp', ()=>{
    SetEntityCoords(PlayerPedId(),4.624284932271896e-44, 6.726232628759122e-44, 5.8859059260785875e-34);
  });

  RegisterCommand('tpx', ()=>{
    emitNet('teleporte');
  })

  