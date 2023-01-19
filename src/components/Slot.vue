<script setup>
import { useEndgameStore } from '../stores/endgame';

const props = defineProps(['id'])

const store = useEndgameStore()
const inventory = store.inventory;

function onClick() {
    if (store.selectedPalette !== 'none') {
        if (store.inventory[props.id] && store.inventory[props.id].item === store.selectedPalette) {
            store.selectedPalette = 'none'
            store.selectedInventory = props.id
        } else {
            inventory[props.id] = {
                item: store.selectedPalette,
                count: 1
            }
        }
    } else {
        if (store.selectedInventory === props.id) {
            store.selectedInventory = 'none'
        } else {
            store.selectedInventory = props.id
        }
    }
}
</script>

<template>
    <button :class="store.selectedInventory === props.id ? 'slot selected' : 'slot'" @click="onClick">
        <img v-if="inventory[props.id]" :src="'/items/' + inventory[props.id].item + '.png'">
        <p v-if="inventory[props.id] && inventory[props.id].count !== 1">{{ inventory[props.id].count }}</p>
    </button>
</template>

<style scoped>
.slot {
    position: relative;
}

.slot p {
    position: relative;
    top: -36px;
    left: 22px;
    color: white;
    font-family: 'MinecraftiaRegular';
    text-align: center;
}

.slot.selected p {
    color: black;
}
</style>