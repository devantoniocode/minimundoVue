<script>
import EventBus from "@/event-bus";

export default {
    name: "NumberForm",
    emits: ['input', 'change'],
    props: {
        modelValue: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        help: {
            type: String,
            default: undefined,
        },

        size: {
            type: String,
            default: null
        },
        sizeMd: {
            type: Number,
            default: 12
        },
        sizeLg: {
            type: Number,
            default: 12
        },
        decimalPlaces: {
            type: Number,
            default: 2
        },
        value: {
            type: String
        },
        textUpperCase: {
            type: Boolean,
            default: true,
        },
        autocomplete: {
            type: Boolean,
            default: false,
        },
        iconHelp: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        skeleton: {
            type: Boolean,
            default: false,
        },
        search: {
            type: Boolean,
            default: false,
        },
        format: {
            type: Boolean,
            default: true,
        },
        maxlength: {
            type: Number,
        },
        prefix: {
            type: String,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        min: {
            type: Number,
            default: 0
        },
        errors: {
            type: Array,
            default: undefined
        },
        readonly: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        classInput: {
            type: String,
            default: null
        },
        suffix: {
            type: String,
            default: undefined
        },
        updateValueOnlyFocusOut: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            dErros: undefined,
            dModelValue: undefined
        }
    },
    mounted() {
        this.dModelValue = this.modelValue
    },
    watch: {
        errors: function () {
            this.dErros = this.errors;
        },
        modelValue: function () {
            this.dModelValue = this.modelValue;
        }
    },
    methods: {
        iconHelpClick(event) {
            this.$emit('iconHelpClick', event, this.iconHelp);
        },
        onCut() {
            this.$emit('update:modelValue', '');
        },

        updateValue(event) {
            if (!this.updateValueOnlyFocusOut) {
                this.$emit('update:modelValue', event.value == null ? '' : event.value);
                this.$emit("change", event.value);
            }
        },
        onFocusOut(event) {
            if (this.updateValueOnlyFocusOut) {
                this.$emit('update:modelValue', this.convertToDecimal(event.srcElement.value, this.decimalPlaces));
                this.$emit("change", this.convertToDecimal(event.srcElement.value, this.decimalPlaces));
            }
        },
        onFocusIn(event) {
            this.dErros = undefined
            event.target.select();
        },
        enterPressed(e) {
            const inputs = Array.from(document.querySelectorAll('input'));
            const index = inputs.indexOf(e.target);

            if (index < inputs.length) {
                if (inputs[index + 1] != null) {
                    if (inputs[index + 1].tagName == 'SPAN') {
                        EventBus.emit(`focus:${inputs[index + 1].parentNode.getAttribute('data-key-id')}`);
                    }
                    inputs[index + 1].focus();
                }
            }
        },
        clearInput: function () {
            this.$emit('update:modelValue', null);
            this.$emit("change", null);
        },
        focus: function () {
            this.$refs.inputNumber.$refs.input.$el.focus();
        }
    },
    computed: {
        classObject: function () {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 lg:col-${md} xl:col-${lg}`;
            } else {
                let md = parseInt(this.size)
                return `col-12 lg:col-${md} xl:col-${this.size}`;
            }
        },
        containerClass() {
            return {
                'text-uppercase': this.textUpperCase === true,
            };
        },
        containerInputClass() {
            return {
                'w-full': true,
                'p-invalid': this.dErros != null,
                [this.classInput]: this.classInput != null,
            };
        },
    },
}
</script>

<template>
    <div class="field " :class="classObject + ' compact'">
        <label>
            {{ label }}
            <template v-if="iconHelp">
                <i class='pi pi-info-circle pl-2 text-primary text-bold'
                   style='cursor: pointer;'
                   @click.stop='iconHelpClick'
                />
            </template>
            <slot/>
        </label>
        <InputNumber
            ref="inputNumber"
            :format="format"
            :mode="'decimal'"
            :locale="'pt-BR'"
            :minFractionDigits="decimalPlaces"
            :maxFractionDigits="decimalPlaces"
            :inputStyle="'text-align:right;'"
            :type="search ? 'search' : ''"
            :class="containerClass"
            :inputClass="containerInputClass"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :prefix="prefix"
            :max="max"
            :min="min"
            :maxlength="maxlength"
            :readonly="readonly"
            :suffix='suffix'
            class="w-full"

            v-model="dModelValue"

            @cut="onCut($event)"
            @keydown.enter="enterPressed"
            @focusin="onFocusIn"
            @focusout="onFocusOut"
            @search="clearInput"
            @change="$emit('change')"
            @blur="$emit('blur')"
            v-on:input="updateValue($event)"
            v-if="!skeleton"
        />
        <skeleton v-else class="skeleton"/>
        <small v-if="dErros" id="username-help" class="p-error">{{ dErros[0] }}</small>
        <small v-if="help" class="">{{ help }}</small>
    </div>
</template>

<style scoped>
</style>
