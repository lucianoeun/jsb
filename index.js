const user = require('./db/usuario');


async function listar(){
    let retornar_lista = await user.listar();
    console.log(retornar_lista);
}

listar()