<script>

export default {
    name: "SelectForm",
    props: {
        label: {
            type: String,
            default: null
        },
        iconHelp: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        filterPlaceholder: {
            type: String,
            default: "Filtrar"
        },
        first: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "text"
        },
        optionLabel: {
            type: String,
            default: "text"
        },
        optionValue: {
            type: String,
            default: "value"
        },
        loading: {
            type: Boolean,
            default: false,
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
        disabled: {
            type: Boolean,
            default: false
        },
        skeleton: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: null
        },
        errors: {
            type: Array,
            default: undefined
        },
        append: {
            type: Array,
            default: undefined
        },
        modelValue: {
            type: String
        },
        characterSearch: {
            type: Number,
            default: 3
        },
        editable: {
            type: Boolean,
            default: false,
        },
        search: {
            type: Boolean,
            default: true,
        },
        filter: {
            type: Boolean,
            default: true,
        },
        help: {
            type: String,
            default: undefined,
        },
        classDiv: {
            type: String,
            default: null
        },
        classLabel: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {
            dErros: undefined,
            dOptions: [],
            dShowClear: false,
        }
    },
    mounted() {
        this.createFirst();
        if (this.options != null && this.options.length > 0)
            this.options.forEach((item) => {
                item.value = item.value == null ? null : item.value.toString();
            })
    },
    emitFilterChange: null,
    methods: {
        iconHelpClick(event){
            this.$emit('iconHelpClick', event, this.iconHelp);
        },
        updateValue(event) {
            this.dShowClear = event.value !== null;
            this.$emit('update:modelValue', event.value == null ? '' : event.value.toString());
            this.$emit('change', event);
            this.dErros = undefined
        },
        createFirst() {
            this.dOptions = this.first ? [{value: '', text: this.first}] : [];
            if (this.append != null) {
                Array.prototype.push.apply(this.dOptions, this.append);
            }

            Array.prototype.push.apply(this.dOptions, this.options);
        },
        hideFilters() {
            this.$refs.dropdown.filterValue = null
        },
        showFilters() {
            if (this.emitFilterChange) {
                this.$emit("clearOptions")
                this.$emit('update:modelValue', '');
            }
        },
        onFilterChange(event) {
            if (this.emitFilterChange) {
                clearTimeout(this.emitFilterChange);
            }

            if (event.value.length >= this.characterSearch) {
                this.emitFilterChange = setTimeout(() => {
                    this.$emit("filterChange", event.value)
                    clearTimeout(this.emitFilterChange);
                }, 1000)
            } else {
                this.$emit("filterChange", null)
            }
        },
        focus: function () {
            this.$nextTick(() => {
                this.$refs.dropdown.$refs.focusInput.focus();
            });
        },
    },
    watch: {
        errors: function () {
            this.dErros = this.errors;
        },
        options: function () {
            this.options.forEach((item) => {
                item[this.optionValue] = item[this.optionValue] == null ? null : item[this.optionValue].toString();
            })
            this.createFirst();
        },
        modelValue: {
            immediate: true,
            handler(newVal) {
                this.dShowClear = newVal != null && newVal !== '';
            }
        }
    },
    computed: {
        classObject: function () {
            if (this.size === null) {
                let md = this.sizeMd ?? '12';
                let lg = this.sizeLg ?? '12';
                return `col-12 lg:col-${md} xl:col-${lg} ${this.classDiv}`;
            } else {
                let md = parseInt(this.size)
                return `col-12 lg:col-${md} xl:col-${this.size} ${this.classDiv}`;
            }
        },
        localModelValue: function () {
            return this.modelValue == null ? '' : this.modelValue.toString();
        }
    }
}
</script>

<template>
    <div class="field " :class="classObject">
        <label :class="classLabel">
            {{ label }}
            <slot name="label"/>
            <slot/>
            <template v-if="iconHelp">
                <i class='pi pi-info-circle pl-2 text-primary text-bold'
                   style='cursor: pointer;'
                   @click.stop='iconHelpClick'
                />
            </template>
        </label>

        <Dropdown
            :option-label="optionLabel"
            :option-value="optionValue"
            :disabled="disabled"
            :editable="editable"
            :readonly="readonly"
            :options="dOptions"
            :placeholder="placeholder"
            :class="dErros ? 'p-invalid' : ''"
            :filter="filter"
            :filterPlaceholder="filterPlaceholder"
            :loading="loading"
            :show-clear="search && dShowClear && options?.length > 0"
            :auto-filter-focus="true"
            :select-on-focus="true"
            :auto-option-focus="false"

            v-model="localModelValue"
            v-if="!skeleton"

            @hide="hideFilters"
            @show="showFilters"
            @change="updateValue"
            @focusin="dErros = undefined"
            @filter="onFilterChange"
            @keydown.enter="$refs.dropdown.overlayVisible = false"

            ref="dropdown"
            class="w-full"
        />
        <skeleton v-else class="skeleton"/>
        <small v-if="dErros" id="username-help" class="p-error">{{ dErros[0] }}</small>
        <small v-if="help" class="">{{ help }}</small>

    </div>
</template>

<style scoped>

</style>