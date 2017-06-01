var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('um usuário se conectou');
    console.log(socket.rooms);
    socket.emit('conectado', socket.id);
    socket.on('disconnect', () =>{
        console.log('um usuario desconectou');
    });
    socket.on('mensagemEnviada', (mensagem) =>{
        console.log(mensagem)
        io.emit('enviarMensagem', mensagem);
    });
})

http.listen(3000, () => {
    console.log('conectado');
});