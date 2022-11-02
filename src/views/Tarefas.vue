<template>
  <MeuFormulario @aoSalvarTarefa="salvarTarefa" />
  <!-- Lista de Tarefas -->
  <div class="lista">
    <MinhaTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"  @aoTarefaClicada="selecionarTarefa"/>
    <MeuBox v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </MeuBox>
    <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Descrição da Tarefa
                </label>
                <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa"/>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import MeuFormulario from '../components/Formulario.vue';
import MinhaTarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa'
import MeuBox from '../components/Box.vue'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';

export default defineComponent({
  name: "App",
  components: { MeuFormulario, MinhaTarefa, MeuBox },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  data () {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa){
      this.tarefaSelecionada = tarefa
    },
    fecharModal(){
      this.tarefaSelecionada = null
    },
    alterarTarefa(){
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    store.dispatch(OBTER_TAREFAS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>

  