<template>
    <MeuBox>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D'}}
            </div>
            <div class="column">
                <MeuCronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </MeuBox>
</template>
<script lang="ts">
    import ITarefa from '@/interfaces/ITarefa';
import {defineComponent, PropType} from 'vue'
    import MeuCronometro from './Cronometro.vue'
    import MeuBox from './Box.vue'

    export default defineComponent({
        name: 'MinhaTarefa',
        emits: ['aoTarefaClicada'],
        components: {
            MeuCronometro, MeuBox
        },
        props: {
            tarefa: {
                type: Object as PropType<ITarefa>,
                required: true
            }
        },
        methods: {
            tarefaClicada () : void {
                this.$emit('aoTarefaClicada', this.tarefa)
            }
        }
    })
</script>

<style>
.clicavel {
    cursor: pointer;
}
</style>

