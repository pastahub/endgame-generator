<script lang="ts" setup>
import PaletteItem from './PaletteItem.vue'
import getItems from '../items'

const items = getItems()
console.log(items)
</script>

<template>
    <div class="palette gui-style">
        <h2>Palette</h2>
        <PaletteItem v-for="item in items.tools" :key="item" :item="item" />
        <PaletteItem v-for="item in items.blocks" :key="item" :item="item" />
        <PaletteItem v-for="item in items.crafting" :key="item" :item="item" />
        <PaletteItem v-for="item in items.explosives" :key="item" :item="item" />
        <PaletteItem v-for="item in items.food" :key="item" :item="item" />
        <PaletteItem v-for="item in items.armor" :key="item" :item="item" />
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