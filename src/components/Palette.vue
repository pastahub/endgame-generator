<script setup>
import PaletteItem from './PaletteItem.vue'
import getItems from '../items'

const items = getItems()
console.log(items)
</script>

<template>
    <div class="palette gui-style">
        <h2>Palette</h2>
        <PaletteItem v-for="item in items.tools" :item="item" />
        <PaletteItem v-for="item in items.blocks" :item="item" />
        <PaletteItem v-for="item in items.crafting" :item="item" />
        <PaletteItem v-for="item in items.explosives" :item="item" />
        <PaletteItem v-for="item in items.food" :item="item" />
        <PaletteItem v-for="item in items.armor" :item="item" />
    </div>
</template>

<style scoped>
.palette {
    grid-template-columns: repeat(9, 72px);
    grid-template-rows: repeat(auto-fit, 72px);
}

h2 {
    color: var(--inv-outline);
    grid-column: span 9;
}

.palette:has(.selected) > .slot:not(.selected) {
    opacity: 75%;
}
</style>