<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-12 mensagens">
          <div v-for="m in mensagens" :class="{mensagem: true, direita: m.idRemetente === chatId, esquerda: m.idRemetente !== chatId}">{{m.mensagem}}</div>
        </div>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="input-group">
            <input type="text" v-model="mensagem" class="form-control">
            <span class="input-group-btn">
              <button @click.prevent="enviarMensagem" class="btn btn-default">-></button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      chatId: '',
      mensagem: '',
      mensagens: []
    }
  },
    sockets:{
      connect: function(){
      },
      disconnect() {
      },
      enviarMensagem(data) {
          this.mensagens.push(data);
      },
      conectado(data){
          this.chatId = data;
          console.log(data);
      }
  },
  methods: {
      enviarMensagem(){
          this.$socket.emit('mensagemEnviada', { mensagem: this.mensagem, idRemetente: this.chatId });
          this.mensagem = '';
      }
  }
}
</script>

<style>
  .mensagens{
    height: 600px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    padding: 10px 20px 10px 20px;
  }

  .mensagem{
    border-radius: 10px;
    padding: 5px 15px 5px 15px;
    position: relative;
    margin-right: auto;
    clear: both;
    margin: 3px 0 3px 0;
  }

  .esquerda{
    float: left;
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
    float: right;
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
</style>
