Delay = (ms) => new Promise(resolve =>  setTimeout(resolve, ms));


  on('onClientGameTypeStart', () => {
    
    let firstSpawn = true;

    exports.spawnmanager.setAutoSpawnCallback( function(){
        if(firstSpawn){
            exports.spawnmanager.spawnPlayer({              
                x: 686.245,
                y: 577.950,
                z: 130.461,
                heading: 291.71,
                model: 'mp_m_freemode_01',
                skipFade:false
            })
            firstSpawn = false;
        }else
        {
            exports.spawnmanager.spawnPlayer({
                x: 354.09,
                y: -603.54,
                z: 28.78,
                heading: 260.0,
                skipFade: false                
            }, function(spawn){
                ClearPedBloodDamage(PlayerPedId())
            })              
        } 
    })               
    exports.spawnmanager.setAutoSpawn(true)    
  
});