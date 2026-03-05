<template>
    <SplitButton ref="splitbutton" class="p-button-raised px-0 p-button-secondary" v-bind:class="computedClass" @click="this.$emit('click')">
        <Button class="text-center p-split-button-raised-erp pl-5" @click="onClickSliptButton">
            <i :class="icon" class="mt-1"></i><br>
            <p v-html="label" class="mb-1"></p>
        </Button>
    </SplitButton>
</template>

<script>
export default {
    name: "SplitButtonRaisedForm",
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
        }
    },
    methods: {
        onClickSliptButton() {
            this.$refs.splitbutton.$refs.menu.toggle({currentTarget: this.$el})
            this.$emit('click')
        }
    },
    computed: {
        computedClass() {
            return this.class;
        }
    }
}
</script>

<style scoped>
.p-split-button-raised-erp {
    width: 100% !important;
    text-align: center !important;
    display: inline-block !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    color: #ffffff;
    background: #607d8b;
}
</style>
