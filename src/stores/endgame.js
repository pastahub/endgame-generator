import { defineStore } from "pinia";

export const useEndgameStore = defineStore('endgame', {
    state: () => {
        return {
            inventory: {

            },
            selectedPalette: 'none',
            selectedInventory: 'none',
            currentCommand: 'none',
        }
    }
})