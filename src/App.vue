<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import Inventory from './components/Inventory.vue'
import Palette from './components/Palette.vue'
import { useEndgameStore } from './stores/endgame';

const store = useEndgameStore()

document.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    store.selectedInventory = 'none'
    store.selectedPalette = 'none'
  }
})
</script>

<template>
<div class="content">
  <Inventory />
  <Palette />
</div>
</template>

<style scoped>
.content {
  display: grid;
  justify-content: center;
}

@media (min-width: 1600px) {
  .content {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
