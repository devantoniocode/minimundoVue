<template>
    <div class="formgrid grid" :class="`${this.class}`">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "RowForm",
    props: {
        class: {
            type: String,
            default: null
        },
    },
}
</script>

<style scoped>

</style>