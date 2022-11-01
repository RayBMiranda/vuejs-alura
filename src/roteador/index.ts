import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import MeusProjetos from '../views/Projetos.vue'
import MeuFormulario from '../views/Projetos/Formulario.vue'
import MinhaLista from '../views/Projetos/Lista.vue'

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tarefas
}, 
{
    path: '/projetos',
    component: MeusProjetos,
    children: [
        {
            path: '',
            name: 'Projetos',
            component: MinhaLista
        }, 
        {
            path: 'novo',
            name: 'Novo Projeto',
            component: MeuFormulario
        }, 
        {
            path: ':id',
            name: 'Editar Projeto',
            component: MeuFormulario,
            props: true
        },
    ]
}

]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;