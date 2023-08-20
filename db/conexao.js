async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;
    const mysql = require("mysql2/promise");
     
    const connection = await mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'root',
        database:'jsrp'        
    });   

    global.connection = connection;
    return connection;
}

module.exports = {connect};