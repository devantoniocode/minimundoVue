<script>
export default {
    name: 'PasswordForm',
    props: {
        modelValue: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        size: {
            type: String,
            default: null,
        },
        sizeMd: {
            type: String,
            default: null,
        },
        sizeLg: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        skeleton: {
            type: Boolean,
            default: false,
        },
        autocomplete: {
            type: String,
            default: "on",
        },
        errors: {
            type: Array,
            default: undefined,
        },
        help: {
            type: String,
            default: undefined,
        },
        ifHelp: {
            type: Boolean,
            default: true,
        },
        classHelp: {
            type: String,
            default: undefined,
        },
        classDiv: {
            type: String,
            default: undefined,
        },
        toggleMask: {
            type: Boolean,
            default: true,
        },
        feedback: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dErros: undefined,
            inputValue: this.modelValue,
        };
    },
    methods: {
        focus() {
            this.$refs.input.$el.focus();
        },
    },
    watch: {
        errors: function() {
            this.dErros = this.errors;
        },
        inputValue: function() {
            this.$emit('update:modelValue', this.inputValue);
        },
    },
    computed: {

        classObject: function() {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 lg:col-${md} xl:col-${lg} ${this.classDiv}`;
            } else {
                let md = parseInt(this.size)
                return `col-12 lg:col-${md} xl:col-${this.size} ${this.classDiv}`;
            }
        },
        styleObjectInput: function() {
            return {
                ...(this.textRight === true && { 'text-align': 'right' }),
            };
        },
    },
};
</script>

<template>
    <div class='field ' :class='classObject'>
        <label>
            {{ label }}
            <slot />
        </label>
        <Password
            ref='input'
            v-model='inputValue'
            class='w-full'
            input-class='w-full'

            :toggleMask='toggleMask'
            :disabled='disabled'
            :readonly='readonly'
            :class="dErros ? 'p-invalid' : ''"
            :placeholder='placeholder'
            :style='styleObjectInput'
            :feedback='feedback'
            :autocomplete='autocomplete'

            @focusin='dErros = undefined'

            v-if='!skeleton'
        />
        <skeleton v-else class='skeleton' />
        <small v-if='dErros' id='username-help' class='p-error'>{{ dErros[0] }}</small>
        <small v-if='help && ifHelp' :class='classHelp'>{{ help }}</small>

    </div>
</template>

<style scoped>

</style>