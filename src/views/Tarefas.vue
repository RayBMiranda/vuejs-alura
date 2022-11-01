<template>
    <MeuFormulario @aoSalvarTarefa="salvarTarefa" />
    <!-- Lista de Tarefas -->
    <div class="lista">
        <MinhaTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <MeuBox v-if="listaEstaVazia">
        Você não está muito produtivo hoje :(
        </MeuBox>
    </div> 
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import MeuFormulario from '../components/Formulario.vue';
  import MinhaTarefa from '../components/Tarefa.vue';
  import ITarefa from '../interfaces/ITarefa'
  import MeuBox from '../components/Box.vue'
  
  export default defineComponent({
      name: "App",
      components: { MeuFormulario, MinhaTarefa, MeuBox },
      data () {
        return {
          tarefas: [] as ITarefa[]
        }
      },
      computed: {
        listaEstaVazia () : boolean{
          return this.tarefas.length === 0
        }
      },
      methods: {
        salvarTarefa (tarefa: ITarefa) {
          this.tarefas.push(tarefa)
        }
      }
  });
  </script>

  