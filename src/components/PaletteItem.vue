<script setup lang="ts">
import { useEndgameStore } from '../stores/endgame';

const props = defineProps(['item'])

const store = useEndgameStore()

function onClick() {
    if (store.selectedInventory !== 'none') {
        store.inventory[store.selectedInventory] = {
            item: props.item,
            count: 1,
        }
    } else {
        if (store.selectedPalette === props.item) {
            store.selectedPalette = 'none'
        } else {
            store.selectedPalette = props.item
        }
    }
}

const startDrag = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = "move";
    e.dataTransfer!.effectAllowed = "move";
    store.selectedPalette = props.item;
}
</script>

<template>
    <button draggable @dragstart=startDrag @dragend="store.selectedPalette = 'none'" :class="store.selectedPalette === props.item ? 'slot selected' : 'slot'" @click="onClick">
        <img :src="'./items/' + props.item + '.png'">
    </button>
</template>