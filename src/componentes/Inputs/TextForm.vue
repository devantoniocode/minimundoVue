<template>
    <div class="field " :class="classObject">
        <label :class="classLabel">
            {{ label }}
            <slot/>
        </label>
        <InputText
            ref="input"
            :type="search ? 'search' : 'text'"
            :disabled="disabled"
            :readonly="readonly"
            :value="modelValue"
            :class="dErros ? 'p-invalid' : ''"
            :placeholder="placeholder"
            :style="styleObjectInput"
            class="w-full"

            @focusin="dErros = undefined"
            @input="onInput"

            v-if="!skeleton"

        />
        <skeleton v-else class='skeleton'/>

        <small v-if="dErros" id="username-help" class="p-error">{{ dErros[0] }}</small>
        <small v-if="help && ifHelp" :class="classHelp">{{ help }}</small>
    </div>
</template>

<script>
export default {
    name: "TextForm",
    props: {
        modelValue: {
            type: String,
            default: null
        },

        placeholder: {
            type: String,
            default: null
        },

        label: {
            type: String,
            default: null
        },
        search: {
            type: Boolean,
            default: false
        },
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
        onlyNumbers: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lower: {
            type: Boolean,
            default: false
        },
        normalCase: {
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
        textRight: {
            type: Boolean,
            default: false
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
        classLabel: {
            type: String,
            default: undefined,
        },
        inputStyles: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {
            dErros: undefined
        }
    },
    methods: {
        onInput(event) {
            let value;
            if(event.target.value == null)
                value = null;
            else if(this.lower)
                value = event.target.value.toString().toLowerCase()
            else if(this.normalCase)
                value = event.target.value.toString()
            else
                value = event.target.value.toString().toUpperCase()
            this.$emit('update:modelValue', value);
            this.$emit('update:erros', undefined);
            this.$emit('change', value);
        },
        focus(){
            this.$refs.input.$el.focus();
        }
    },
    watch:{
        errors: function (){
            this.dErros = this.errors;
        }
    },
    computed: {

        classObject: function () {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 lg:col-${md} xl:col-${lg} ${this.classDiv}`;
            } else {
                let md = parseInt(this.size) > 6 ? '12' : 6;
                return `col-12 lg:col-${md} xl:col-${this.size} ${this.classDiv}`;
            }
        },
        styleObjectInput: function () {
            return {
                ...(this.textRight === true && {'text-align': 'right'}),...(this.inputStyles ?? {})
            };
        },
    }
}
</script>

<style scoped>

</style>