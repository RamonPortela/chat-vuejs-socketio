var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var salasCriadas = [];

io.on('connection', (socket) => {
    console.log('um usuário se conectou');
    socket.emit('conectado', [socket.id, salasCriadas.map((e) => {return e.sala;})]);

    socket.on('disconnect', () =>{
        console.log('o usuario' + socket.id + 'se desconectou.');
    });

    socket.on('mensagemEnviada', (mensagem) =>{
        let salaConectada = buscarSala(mensagem.sala);
        salaConectada.mensagens.push({mensagem: mensagem.mensagem, idRemetente: mensagem.idRemetente});
        io.to(mensagem.sala).emit('enviarMensagem', mensagem);
    });
    socket.on('criarSala', (sala) =>{

        if(buscarSala(sala) === undefined){
            let novaSala = {sala: sala, mensagens: []};
            salasCriadas.push(novaSala);
            io.emit('salaCriada', novaSala.sala);
        }
        else{
            socket.emit('salaJaExiste');
        }

    });
    socket.on('entrarEmSala', (sala) =>{
        socket.join(sala);

        let salaConectada = buscarSala(sala);

        socket.emit('entrarEmSala', salaConectada);
    });
});

http.listen(3000, () => {
    console.log('servidor ligado');
});

function buscarSala(sala){
    let posicaoVetor = salasCriadas.map((e) => {return e.sala;}).indexOf(sala);
    return salasCriadas[posicaoVetor];
}

const SALA_NAO_ENCONTRADA = -1;

