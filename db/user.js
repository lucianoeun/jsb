const db = require('./db');

//ID, STEAMKEY, ATIVO, DATACAD, DATAACESSO

async function listarUser(){
    try {
       
        const conn = await db.connect();         
        const sql = "SELECT * FROM user ";
        let [retorno] = await conn.query(sql);
        console.log(retorno)
    
    } catch (error) {
        console.log(error)
    }     
}


async function verificarSteam(steamkey){
    try {
       
        const conn = await db.connect();         
        const sql = "SELECT * FROM user WHERE steamkey=?";
        const values = [steamkey];
        let [retorno] = await conn.query(sql, values);

        if(retorno.length > 0){              
            return retorno[0].id;  
        }else{            
            return false;  
        }          
    
    } catch (error) {
        console.log(error)
    }     
}

async function verificarAtivado(id){
    try {
       
        const conn = await db.connect();         
        const sql = "SELECT * FROM user WHERE id=?";
        const values = [id];
        let [retorno] = await conn.query(sql, values);

        if(retorno.length > 0){  
            if(retorno[0].ativo == '1'){
                return retorno[0].id;
            }else{
                return false;
            }         
             
        }else{            
            return false;
        }          
    
    } catch (error) {
        console.log(error)
    }     
}



async function inserirSteam(steamkey){
    try {

        const conn = await db.connect();         
        const sql = "INSERT INTO user(steamkey, ativo, datacad, dataacesso) VALUES (?,?,?,?)";
        const values = [steamkey,'0','20/02/2323','20/02/2323'];
        let rst = await conn.query(sql, values);
        return rst[0].insertId;     
    
    } catch (error) {
        console.log(error)
    }   
}

async function ativarUser(id, ativo){
    try {

        const conn = await db.connect();         
        const sql = "UPDATE user SET ativo=? WHERE id=?";
        const values = [ativo, id];
        let rst = await conn.query(sql, values);        
        return rst[0].affectedRows;     
    
    } catch (error) {
        console.log(error)
    }   
}

module.exports = { inserirSteam, verificarAtivado, verificarSteam, ativarUser }

//ativarUser(1, '1')

async function teste(){


    
    // var steamkey = 'steamkey16';
    
    // if(steamkey){

    //     //verificar se ela ja existe no cadastro e retornar o id ou false;
    //     var user_id = await verificarSteam(steamkey)
    
    //     if(user_id){     
    //          //existe, verificar se esta ativado e retornar true ou false
    //          let ativado = await verificarAtivado(user_id);
    
    //          if(ativado){
    //             //ativado, fazer login, entrar na cidade
    //             console.log("Entrando na cidade")
    
    //          }else{
    //             //nao ativado, aguarde sua ativação
    //             console.log("Este e o seu Id:, aguardar a ativação pelo Discord")
    //          }
    
    //     }else{
    //         //nao existe, fazer o cadastro
    //         let id = inserirSteam(steamkey);
    
    //         if(id){
    //             console.log("Este e o seu Id:, aguardar a ativação pelo Discord")
    //         }else{
    //             console.log("Erro ao inserir a steamkey no banco de dados, tente mais tarde")
    //         }
    //     }
    
    // }else{
    //     console.log("Voce precisa estar com a steam aberta para ser feita a verificação da steamkey")
    // }
}
//teste()

