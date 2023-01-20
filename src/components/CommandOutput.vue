<script setup>
import { useEndgameStore } from '../stores/endgame';

const store = useEndgameStore()

function onClick() {
    document.querySelector('.command-output').select()
    
}
</script>

<template>
    <textarea class="command-output" readonly @click="onClick" draggable="false">{{ store.currentCommand }}</textarea>
</template>

<style scoped>
.command-output {
    background: var(--inv-bg);
    border: 2px solid white;
    color: var(--inv-outline);
    font-family: 'MinecraftiaRegular';
    padding: 1rem;
    resize: none;
}

@media (min-width: 1600px) {
  .command-output {
    grid-column: span 2;
  }
}
</style>