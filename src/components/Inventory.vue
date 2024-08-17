<script setup>
import { useEndgameStore } from '../stores/endgame'
import Slot from './Slot.vue'
import ItemEditor from './ItemEditor.vue'

const store = useEndgameStore()

function generate() {
    const commands = [];
    commands.push('gamerule commandBlockOutput false')
    commands.push('clear @a')
    commands.push('spreadplayers 0 0 1280 1728 false @a')
    for (const [slot, item] of Object.entries(store.inventory)) {
        if (item) {
            let command = 'replaceitem entity @p ' + slot + ' ' + item.item
            if (item.soul_speed && item.soul_speed !== 0) {
                command += '{Enchantments:[{id:\\"minecraft:soul_speed\\",lvl:' + item.soul_speed + 's}]}'
            }
            if (item.item.includes('potion')) {
                command += '{Potion:\\"minecraft:fire_resistance\\"}'
            }
            command += ' ' + item.count
            commands.push(command)
        }
    }
    commands.push('gamemode survival @a')
    commands.push('execute at @p run fill ~-1 ~-1 ~1 ~2 ~3 ~1 minecraft:obsidian')
    commands.push('execute at @p run fill ~ ~ ~1 ~1 ~2 ~1 minecraft:nether_portal')
    commands.push('effect give @p minecraft:fire_resistance 120')
    commands.push('setblock ~ ~1 ~ command_block{auto:1,Command:\\"fill ~ ~ ~ ~ ~-3 ~ air\\"}')
    commands.push('kill @e[type=command_block_minecart,distance=..1]')
    let passengers = ''
    for (let command of commands) {
        passengers += '{id:command_block_minecart,Command:\'' + command + '\'},'
    }
    passengers = passengers.substring(0, passengers.length - 1)

    const innerCommand = 
        `summon falling_block ~ ~1 ~ {Time:1,BlockState:{Name:redstone_block},Passengers:[{id:falling_block,Passengers:[{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[${passengers}]}]}]}`
    
    const command = `give @p command_block{BlockEntityTag:{Command:"${innerCommand}",auto:1b}}`
    navigator.clipboard.writeText(command)
    store.currentCommand = command
    alert('Command copied to clipboard.')
}

function clear() {
    for (const [key, value] of Object.entries(store.inventory)) {
        if (value) {
            store.inventory[key] = null
        }
    }
    store.selectedInventory = 'none'
    store.selectedPalette = 'none'
    store.currentCommand = 'none'
}
</script>

<template>
    <div class="inventory gui-style">
        <Slot id="armor.head"/>

        <ItemEditor />
        <h1>Endgame Command Generator</h1>

        <Slot id="armor.chest"/>

        <h2>by pastafied</h2>

        <Slot id="armor.legs"/>

        <div class="socials">
        <a href="https://www.youtube.com/pastafied"><img src="./icons/youtube.png" /></a>
        <a href="https://www.twitter.com/pastafied"><img src="./icons/twitter.png" /></a>
        <a href="https://www.github.com/pastahub"><img src="./icons/github.png" /></a>
        </div>

        <Slot id="armor.feet"/>

        <Slot id="weapon.offhand"/>

        <button class="generate" @click="generate">GENERATE</button>

        <button class="slot" @click="clear" style="cursor: pointer;"><img src="./icons/delete.png"></button>

        <div class="section-gap"></div>

        <Slot id="inventory.0" />
        <Slot id="inventory.1" />
        <Slot id="inventory.2" />
        <Slot id="inventory.3" />
        <Slot id="inventory.4" />
        <Slot id="inventory.5" />
        <Slot id="inventory.6" />
        <Slot id="inventory.7" />
        <Slot id="inventory.8" />
        <Slot id="inventory.9" />
        <Slot id="inventory.10" />
        <Slot id="inventory.11" />
        <Slot id="inventory.12" />
        <Slot id="inventory.13" />
        <Slot id="inventory.14" />
        <Slot id="inventory.15" />
        <Slot id="inventory.16" />
        <Slot id="inventory.17" />
        <Slot id="inventory.18" />
        <Slot id="inventory.19" />
        <Slot id="inventory.20" />
        <Slot id="inventory.21" />
        <Slot id="inventory.22" />
        <Slot id="inventory.23" />
        <Slot id="inventory.24" />
        <Slot id="inventory.25" />
        <Slot id="inventory.26" />

        <div class="section-gap"></div>

        <Slot id="hotbar.0" />
        <Slot id="hotbar.1" />
        <Slot id="hotbar.2" />
        <Slot id="hotbar.3" />
        <Slot id="hotbar.4" />
        <Slot id="hotbar.5" />
        <Slot id="hotbar.6" />
        <Slot id="hotbar.7" />
        <Slot id="hotbar.8" />
    </div>
</template>

<style scoped>
.inventory {
    grid-template-columns: repeat(9, 72px);
    grid-template-rows: repeat(4, 72px) 16px repeat(3, 72px) 16px 72px;
}

.inventory h1 {
    grid-column: span 5;
    font-size: 1.5rem;
    color: var(--inv-outline);
}

.inventory h2 {
    grid-column: span 5;
    font-size: 1rem;
}

.socials {
    grid-column: span 5;
}
.section-gap {
    grid-column: span 9;
}

.generate {
    background: #105E51;
    border: 4px solid #032620;
    color: white;
    font-family: 'MinecraftiaRegular';
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    height: 100%;
    grid-column: span 3;
    transition: background .15s;
}

.generate:hover {
    background: #2CCDB1;
}

.inventory:has(.selected) > .slot:not(.selected) {
    opacity: 75%;
}
</style>
