<template>
    <section class="projetos">
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo Projeto</span>
        </RouterLink>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Nome
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{projeto.id}}</td>
                    <td>{{projeto.nome}}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import IProjeto from '../../interfaces/IProjeto'
export default defineComponent({
    name: 'MinhaLista',
    methods: {
        excluir(id: string) {
            this.store.commit(EXCLUIR_PROJETO, id)
        }
    },
    setup () {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})
</script>