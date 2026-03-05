<template>
    <Button class="p-button-raised p-button-raised-erp px-0 " v-bind:class="computedClass" @click="$emit('click')">
        <div class="flex flex-column">
            <div class="p-0 text-center">
                <i :class="icon"></i><br>
                <p v-html="label"></p>
            </div>
        </div>
    </Button>
</template>

<script>
export default {
    name: "ButtonRaised",
    emits: ["click"],
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        class: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: "secondary"
        },
    },
    computed: {
        computedClass() {
            return this.class + ` p-button-${this.color}`
        }
    }
}
</script>

<style scoped>
.p-button-raised-erp {
    width: 100% !important;
    text-align: center !important;
    display: inline-block !important;
}
</style>
