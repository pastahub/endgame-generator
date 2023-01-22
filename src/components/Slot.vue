<script setup lang="ts">
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

const startDrag = (e: DragEventInit) => {
    e.dataTransfer!.dropEffect = "move";
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("oldId", props.id);
    store.selectedInventory = props.id;
}

const dragEnd = (e: DragEvent) => {
    if (e.dataTransfer!.dropEffect === "none") {
        store.selectedInventory = 'none'
        inventory[props.id] = null
    };
}

const onDrop = (e: DragEvent) => {
    if(e.dataTransfer!.effectAllowed !== "move") return;
    const oldId = e.dataTransfer!.getData("oldId");

    if (!!oldId){
        const currentSlot = inventory[props.id];
        inventory[props.id] =  inventory[oldId];
        inventory[oldId] = currentSlot;
    }
    else {
        onClick() 
    }

    store.selectedInventory = props.id;
}

const onDragOver = (e: DragEvent) => {
    if(e.dataTransfer!.effectAllowed === "move") e.preventDefault();
}
</script>

<template>
    <button draggable @dragover="onDragOver" @dragenter.prevent @dragstart=startDrag @dragend=dragEnd @drop=onDrop :class="store.selectedInventory === props.id ? 'slot selected' : 'slot'" @click="onClick">
        <img v-if="inventory[props.id]" :src="'./items/' + inventory[props.id].item + '.png'">
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