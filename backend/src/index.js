const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://Renan:Awolfatthedoor7@cluster0-uahlk.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true

});
app.use(cors());
app.use(express.json());
app.use(routes);
//Metodos Http: get,post,put,delete
// Tipos de parametros:
// Querry Params: request.query (filtro,ordenação,paginação..)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Route Params: request.body (Dados para alteração ou criação de um registro)
//MongoDB (Não relacional)



server.listen('3333');