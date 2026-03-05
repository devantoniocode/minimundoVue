<template>
    <div class="flex justify-content-between" :class="classObject" v-if="!isMobile">
        <div :class="classLeft">
            <div class="flex col-12 p-0">
                <slot name="left"></slot>
            </div>
        </div>
        <div class="fluid ml-sm-auto">
            <div class="flex col-12 p-0">
                <slot name="center"></slot>
            </div>
        </div>
        <div class="text-right">
            <div class="flex col-12 p-0">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
    <template v-else>
        <slot name="left"/>
        <slot name="right"/>
    </template>
</template>

<script>
export default {
    name: "GroupButtonForm",
    props: {
        size: {
            type: String,
            default: null
        },
        sizeMd: {
            type: String,
            default: null
        },
        sizeLg: {
            type: String,
            default: null
        },
        class: {
            type: String,
            default: 'p-x-3'
        },
        classLeft: {
            type: String,
            default: null
        },
        right: {
            type: String,
            default: null
        },
    },
    computed: {
        classObject: function () {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 md:col-${md} lg:col-${lg} ${this.class}`;
            } else {
                let md = parseInt(this.size) > 6 ? '12' : 6;
                return `col-12 md:col-${md} lg:col-${this.size} ${this.class}`;
            }
        },
        isMobile() {
            return window.innerWidth <= 1091;
        },
    },
}
</script>

<style scoped>

</style>