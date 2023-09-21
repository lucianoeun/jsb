const pos = [ 508.70770263671875, 5579.5517578125, 789.52685546875 ];

var uid = null;

on('onClientGameTypeStart', () => {  
              
    exports.spawnmanager.setAutoSpawnCallback(() => {
      exports.spawnmanager.spawnPlayer({
        x: pos[0],
        y: pos[1],
        z: pos[2],
        model: 'a_m_m_skater_01'
      });
    });
  
    exports.spawnmanager.setAutoSpawn(true)
    exports.spawnmanager.forceRespawn()
    
});


//pedindo
RegisterCommand('pid',()=>{ 
  emitNet('pegarid', 1);
  console.log(uid)
},false);

//recebendo do server
onNet('meuid', (prm)=>{ uid = prm; console.log("Meu ID: "+prm); })

//------------------------------------------------------------------

var controle = true;

setTick(()=>{ 
  if(controle){
    SetNuiFocus(true, true);  }
})


RegisterNuiCallbackType("entrada");
on('__cfx_nui:entrada', (data, cb) =>{  
  let item = data.item;
  if(item === "close"){
      SetNuiFocus(false);
      controle = false;
  }  
});