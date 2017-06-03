<template>
    <div class="holder borda-arredondada">
        <div class="col-xs-12 borda-arredondada salas">
            <div class="header">
                <h2>Salas</h2>
            </div>
            <div style="height: calc(100% - 63px); overflow-y: auto; width: 100%">
                <ul v-if="salas.length > 0" class="menu">
                    <li v-for="(sala, index) in salas" @click="selecionarSala(sala, index)" class="sala" :class="{ativo: salaSelecionada === index}">{{sala}}</li>
                </ul>
                <p v-else>crie uma sala abaixo</p>
            </div>


        </div>
        <div id="div-btn-adicionar">
            <input type="text" class="form-control" placeholder="Criar uma sala..." v-model="nomeSala" @keyup.enter="criarNovaSala">
            <button class="btn btn-outline-success" @click="criarNovaSala">+</button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                salaSelecionada: -1,
                salas: [],
                nomeSala: ''
            }
        },
        sockets:{
            conectado(data){
              this.salas = data[1];
            },
            salaCriada(data){
                this.salas.push(data);
            },
            entrarEmSala(data){
                this.mensagens = data.mensagens;
            }

        },
        methods:{
            criarNovaSala(){
                if(this.nomeSala === '')
                    return;
                this.$socket.emit('criarSala', this.nomeSala);
                this.nomeSala = '';
            },
            selecionarSala(sala, index){
                this.salaSelecionada = index;
                this.$socket.emit('entrarEmSala', sala);
                this.$emit('selecionarSala', sala);
            }
        }
    }
</script>
<style scoped>
    .menu{
        padding: 0px;
        text-align: center;
    }

    .header{
        margin-right: auto;
        margin-left: auto;
    }

    .salas{
        position: relative;
        display: flex;
        flex-direction: column;
        height: calc(100% - 44px);
        border-right: 0;
        border-top: 0;
        border-left: 0;
        border-radius: 10px 0 0 0;
        padding: 0;

    }

    .sala{
        list-style: none;
        flex-grow: 1;
        padding: 5px 0 5px 0;

    }
    .sala:not(:first-child){
        border-top: 1px solid lightgrey;
    }
    .sala:hover{
        cursor: pointer;
        background-color: lightgrey;
    }

    .ativo{
        background-color: aliceblue;
        font-weight: bold;
    }

    .holder{
        width: 25%;
        height: 600px;
        float: left;
        position: relative;
        border-radius: 10px 0 0 0;
        border-right: 0px;
    }

    #div-btn-adicionar{
        left: 12px;
    }

    #div-btn-adicionar > input{
        width: 70%;
        margin-right: 5px;
        float: left;
    }
</style>