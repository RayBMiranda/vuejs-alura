import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import roteador from './roteador'
import { key, store } from './store'

/* add icons to the library */
library.add(faUserSecret)

createApp(App)
.use(roteador)
.use(store, key)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
