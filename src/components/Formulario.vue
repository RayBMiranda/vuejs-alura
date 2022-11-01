<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa você deseja iniciar ?"
                    v-model="descricao"
                >
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="projeto.id"
                            v-for="projeto in projetos"
                            :key="projeto.id"
                            >
                            {{projeto.nome}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <MeuTemporizador @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { key } from '@/store'
import { NOTIFICAR } from '@/store/tipo-mutacoes'
import { computed } from '@vue/reactivity'
import {defineComponent} from 'vue'
import { useStore } from 'vuex'
import Temporizador from './Temporizador.vue'
import MeuTemporizador from './Temporizador.vue'

export default defineComponent({
    name: "MeuFormulario",
    emits: ['aoSalvarTarefa'],
    components: { MeuTemporizador },
    data (){
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa (tempoDecorrido: number) : void{
            const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto
            if(!projeto) { // se o projeto não existe...
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.FALHA
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''
        }
    },
    setup () {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>