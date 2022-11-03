<template>
  <MeuFormulario @aoSalvarTarefa="salvarTarefa" />
  <!-- Lista de Tarefas -->
  <div class="lista">
    <MeuBox v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </MeuBox>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>
    <MinhaTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"  @aoTarefaClicada="selecionarTarefa"/>
    <MeuModal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
              <label for="descricaoDaTarefa" class="label">
                  Descrição da Tarefa
              </label>
              <input type="text" class="input" v-if="tarefaSelecionada" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa"/>
          </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </MeuModal>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import MeuFormulario from '../components/Formulario.vue';
import MinhaTarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa'
import MeuBox from '../components/Box.vue'
import MeuModal from '../components/modal.vue'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';

export default defineComponent({
  name: "App",
  components: { MeuFormulario, MinhaTarefa, MeuBox, MeuModal },
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

    const filtro = ref('')

    //const tarefas = computed(() => store.state.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefas),
      store,
      filtro
    }
  }
});
</script>

  