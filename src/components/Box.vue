<template>
    <div class="box has-text-weght-bold" :style="estilos">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MeuBox',
    data () {
        return {
            estilos: {
                background: '#FAF0CA'
            }
        }
    }
})
</script>