<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <salas @selecionarSala="selecionarSala"></salas>
        <div class="col-xs-9 mensagens borda-arredondada">
          <div v-for="m in mensagens" :class="{mensagem: true, direita: m.idRemetente === chatId, esquerda: m.idRemetente !== chatId}">{{m.mensagem}}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="input-group">
            <input type="text" v-model="mensagem" class="form-control" placeholder="Digite uma mensagem..." id="txt-mensagem">
            <span class="input-group-btn">
              <button @click.prevent="enviarMensagem" class="btn btn-default" id="btn-enviar">-></button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import salas from './components/salas.vue'

export default {
  name: 'app',
  components: {
    'salas': salas
  },
  data () {
    return {
      chatId: '',
      salaConectada: undefined,
      mensagem: '',
      mensagens: [],

    }
  },
    sockets:{
      connect: function(){
      },
      disconnect() {
      },
      enviarMensagem(data) {
          console.log(data);
          if(data.sala === this.salaConectada)
            this.mensagens.push(data);
      },
      conectado(data){
          this.chatId = data[0];
      },
      entrarEmSala(data){
          console.log(data);
          this.salaConectada = data.sala;
          this.mensagens = data.mensagens;
      },
      salaJaExiste(){
          alert("Sala já criada!");
      }
  },
  methods: {
      enviarMensagem(){
          if(this.mensagem === '')
              return;
          this.$socket.emit('mensagemEnviada', { mensagem: this.mensagem, idRemetente: this.chatId, sala: this.salaConectada });
          this.mensagem = '';
      },
      selecionarSala(sala){
          this.$socket.emit('entrarEmSala', sala);
      }
  }
}
</script>

<style>
  .container{
    padding: 15px;
    min-width: 295px;
  }

  .borda-arredondada{
    border: 1px solid lightgrey;
    border-radius: 10px;
  }

  .mensagens{
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    padding: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    border-radius: 0;
  }

  .mensagem{
    border-radius: 10px;
    padding: 5px 15px 5px 15px;
    position: relative;
    margin-right: auto;
    clear: both;
    margin: 3px 0 3px 0;
    max-width: 60%;
  }

  .esquerda{
    align-self: flex-start;
    background-color: #d8d6db;
  }

  .esquerda:before{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid;
    top: 5px;
    left:-5px;
    border-color: #d8d6db #d8d6db transparent transparent;
  }

  .direita{
    align-self: flex-end;
    background-color: #b3ffe7;
  }

  .direita:before{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid;
    top: 5px;
    right: -5px;
    border-color: #b3ffe7 transparent transparent #b3ffe7;
  }

  #txt-mensagem{
    border-top: 0 ;
    border-radius: 0 0 0 10px ;
  }

  #btn-enviar{
    border-top: 0;
    height: 34px;
    border-radius: 0 0 10px 0;
  }

  #div-btn-adicionar{
    width: calc(100% - 30px);
    position: absolute;
    bottom: 5px;
  }

  .btn-outline-success {
    color: #5cb85c;
    background-color: transparent;
    border-color: #5cb85c;
    border-radius: 100%;
    font-weight: 700;
  }

  .btn-outline-success:hover{
    color: #FFFFFF;
    background-color: #5cb85c;
  }
</style>
