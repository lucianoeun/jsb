const conexao = require('./conexao');


//select
async function listar(){
    const conn = await conexao.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

//insert
async function inserir(user){
    const conn = await conexao.connect();
    const sql = 'INSERT INTO usuario(steamcode, ativo) VALUES (?,?);';
    const values = [user.steamcode, user.ativo];
    let rst = await conn.query(sql, values);
    return rst[0];
}

//selecionar por id
async function buscar(id){
    const conn = await conexao.connect();   
    const [rows] = await conn.query("SELECT * FROM usuario where id='"+id+"'");
    return rows;
}

//selecionar por id
async function buscarid(steam){
    const conn = await conexao.connect();   
    const [retorno] = await conn.query("SELECT id FROM usuario where steamcode='"+steam+"'");
    let id = retorno[0];
    return id;
}

//update
async function atualizar(id, user){
    const conn = await conexao.connect();
    const sql = 'UPDATE usuario SET steamcode=?, ativo=? WHERE id=?';
    const values = [user.steamcode, user.ativo, id];
    return await conn.query(sql, values);
}

//update
async function atualizar_ativo(id, ativo){
    const conn = await conexao.connect();
    const sql = 'UPDATE usuario SET ativo=? WHERE id=?';
    const values = [ativo, id];
    return await conn.query(sql, values);
}

//deletar
async function deletar(id){
    const conn = await conexao.connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return await conn.query(sql, [id]);
}

module.exports = {listar, inserir, atualizar, deletar, buscar, atualizar_ativo, buscarid}