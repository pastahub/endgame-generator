<script setup>
import { ref } from 'vue'
import getItems from '../items';
import { useEndgameStore } from '../stores/endgame';

const store = useEndgameStore()

function onClick() {
    store.inventory[store.selectedInventory] = null
    store.selectedInventory = 'none'
}

const items = getItems();
</script>

<template>
    <div class="item-editor">
        <p v-if="store.selectedInventory !== 'none' 
            && store.inventory[store.selectedInventory]
            && !items.armor.includes(store.inventory[store.selectedInventory].item)
            && !items.tools.includes(store.inventory[store.selectedInventory].item)
            && !store.inventory[store.selectedInventory].item.includes('potion')">
            Count: 
        </p>
        <input v-if="store.selectedInventory !== 'none' 
            && store.inventory[store.selectedInventory]
            && !items.armor.includes(store.inventory[store.selectedInventory].item)
            && !items.tools.includes(store.inventory[store.selectedInventory].item)
            && !store.inventory[store.selectedInventory].item.includes('potion')" 
            type="number"
            v-model.lazy.number="store.inventory[store.selectedInventory].count"
            min="1"
            max="64">

        <p v-if="store.selectedInventory !== 'none' 
            && store.inventory[store.selectedInventory]
            && store.inventory[store.selectedInventory].item.includes('boots')">
            Soul speed: 
        </p>
        <input v-if="store.selectedInventory !== 'none' 
            && store.inventory[store.selectedInventory]
            && store.inventory[store.selectedInventory].item.includes('boots')" 
            type="number"
            v-model.lazy.number="store.inventory[store.selectedInventory].soul_speed"
            min="0"
            max="3">

        <button v-if="store.selectedInventory !== 'none' 
            && store.inventory[store.selectedInventory]"
            @click="onClick">
            Delete
        </button>
    </div>
</template>

<style scoped>
.item-editor {
    background: black;
    grid-row: span 4;
    grid-column: span 3;
    height: 100%;
}

p {
    margin: .5rem;
}

input {
    font-family: 'MinecraftiaRegular';
    color: white;
    background: var(--inv-fg);
    border: 2px solid var(--inv-outline);
    margin: .5rem;
}

button {
    font-family: 'MinecraftiaRegular';
    color: white;
    background: red;
    border: 2px solid #BF000F;
}
</style>