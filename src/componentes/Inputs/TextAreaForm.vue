<template>
    <div class="field " :class="classObject">
        <label :class="classLabel">
            <span v-html='label'></span>
            <slot/>
            <slot name="label"/>
            <template v-if='iconHelp'>
                <i class='pi pi-info-circle pl-1 text-primary text-bold'
                   style='cursor: pointer;'
                   @click.stop='iconHelpClick'
                />
            </template>
        </label>
        <Textarea
            ref="input"
            :rows="rows"
            :disabled="disabled"
            :readonly="readonly"
            :class="dErros ? 'p-invalid' : ''"
            :value="dModelValue"
            :placeholder="placeholder"
            :auto-resize="autoResize"

            :spellcheck='spellcheck'

            v-model="dModelValue"
            v-if="!skeleton"
            v-on:input="onInput"

            class="w-full"
            :style="styleTextArea"

            @focusin="dErros = undefined"
        />
        <skeleton v-else :height="heightSkeleton+'px'"/>
        <small v-if="dErros" id="username-help" class="p-error">{{ dErros[0] }}</small>
    </div>
</template>

<script>
export default {
    name: "TextAreaForm",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        size: {
            type: String,
            default: null
        },
        classLabel: {
            type: String,
            default: null
        },
        rows: {
            type: String,
            default: "5"
        },
        sizeMd: {
            type: String,
            default: null
        },
        sizeLg: {
            type: String,
            default: null
        },
        styleTextArea: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        skeleton: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array,
            default: undefined
        },
        normalCase: {
            type: Boolean,
            default: true
        },
        spellcheck: {
            type: Boolean,
            default: true
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        iconHelp: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            dErros: undefined,
            dModelValue: '',
            heightSkeleton: (22 * this.rows) + 10,
        }
    },
    created() {
        this.dModelValue = this.modelValue
    },

    methods: {
        onInput(event) {
            let value;
            if (this.normalCase)
                value = event.target.value.toString();
            else
                value = event.target.value.toString().toUpperCase();
            this.$emit('update:modelValue', value);
        },
        focus(){
            this.$refs.input.$el.focus();
        },
        iconHelpClick(event) {
            this.$emit('iconHelpClick', event, this.iconHelp);
        },
    },
    watch: {
        errors: function () {
            this.dErros = this.errors;
        },
        modelValue: function () {
            this.dModelValue = this.modelValue;
            this.$emit('update:modelValue', this.modelValue);
        },
    },
    computed: {
        classObject: function () {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 lg:col-${md} xl:col-${lg}`;
            } else {
                let md = parseInt(this.size) > 6 ? '12' : 6;
                return `col-12 lg:col-${md} xl:col-${this.size}`;
            }
        },
    }
}
</script>

<style scoped>

</style>
