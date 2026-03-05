<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Cadastro',
        icon: 'pi pi-fw pi-briefcase',
        to: '/cadastro',
        items: [
            {
                label: 'Projects',
                icon: 'pi pi-fw pi-chart-line',
                to: '/projects'
            },
            {
                label: 'Tasks',
                icon: 'pi pi-fw pi-heart',
                to: '/tasks'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
