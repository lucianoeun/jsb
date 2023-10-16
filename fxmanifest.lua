-- Resource Metadata
fx_version 'cerulean'
games { 'rdr3', 'gta5' }

author 'LucianoEun'
description 'Primeira base feita em javascript'
version '1.0.0'

client_script{ 
    'client/spawners.js' 
}

server_script {    
    'server/players.js'    
}

ui_page 'ui/index.html'
files {
    'ui/index.html',
    'ui/app.css',
    'ui/app.js'
}