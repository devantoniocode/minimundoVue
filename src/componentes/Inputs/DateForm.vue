<script>
export default {
    name: 'DateForm',
    props: {
        modelValue: {
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
        timeOnly: {
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

        showTime: {
            type: Boolean,
            default: false
        },

        showSeconds: {
            type: Boolean,
            default: false
        },

        view: {
            type: String,
            default: undefined
        },

        dateFormat: {
            type: String,
            default: 'dd/mm/yy'
        },
        hourFormat: {
            type: String,
            default: 'hh:ii:ss'
        },
        skeleton: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array,
            default: undefined
        },
        inputClass: {
            type: String,
            default: undefined
        },
        placeholder: {
            type: String,
            default: undefined
        },
        showOnFocus: {
            type: Boolean,
            default: true
        },
        help: {
            type: String,
            default: undefined
        },
        ifHelp: {
            type: Boolean,
            default: true
        },
        classHelp: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            dErros: undefined
            // inputValue: this.modelValue,
        };
    },
    methods: {
        selectedDate: function (event) {
            if (this.showTime) {
                const data = event.toISOString().split('T')[0];
                const timer = event.toISOString().split('T')[1].split('.')[0];
                const novaData = data + ' ' + timer;
                this.$emit('update:modelValue', event);
                if (novaData.split('-').length === 3) this.inputValue = this.conveteParaDataHora(novaData);
            } else {
                let novaData = event.toISOString().split('T')[0];
                if (this.timeOnly) {
                    console.log(event);
                    const data = new Date(event);
                    const horas = data.getHours();
                    const minutos = data.getMinutes();
                    const segundos = data.getSeconds();
                    novaData = `${horas}:${minutos}:${segundos}`;
                    console.log(novaData);
                } else if (novaData.split('-').length === 3) {
                    this.inputValue = this.conveteParaData(novaData);
                }
                this.$emit('update:modelValue', novaData);
            }
            this.$emit('blur');
        },
        conveteParaData(date) {
            const [year, month, day] = date.split('-');
            return [day, month, year].join('/');
        },
        conveteParaDataHora(date) {
            const [data, hora] = date.split(' ');
            const [year, month, day] = data.split('-');
            const [hour, minute, second] = hora.split(':');
            const adjustedDate = new Date(Date.UTC(year, parseInt(month) - 1, day, hour, minute, second));

            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' };
            const adjustedDateString = adjustedDate.toLocaleString('en-US', options);
            return adjustedDateString;
        },
        conveterParaHorario(hora) {
            const [hour, minute, second] = hora.split(':');
            const adjustedDate = new Date(Date.UTC(hour, minute, second));
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Bahia' };
            const adjustedDateString = adjustedDate.toLocaleString('pt-BR', options);
            return adjustedDateString;
        },
        clearClick() {
            this.inputValue = null;
            this.$emit('update:modelValue', null);
            this.$emit('blur');
        },
        isNumber(evt) {
            const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const keyPressed = evt.key;

            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault();
            } else if (evt.target.value.length == 10) {
                evt.preventDefault();
            } else {
                if (evt.target.value.length === 2) evt.target.value += '/';
                else if (evt.target.value.length === 5) evt.target.value += '/';
            }
        },
        onInput(evt) {
            if (evt.target.value.length === 10) {
                let [day, month, year] = evt.target.value.split('/');
                if (this.isValidDate(new Date(`${year}-${month}-${day}`))) {
                    this.selectedDate(new Date(`${year}-${month}-${day}`));
                }
            } else if (evt.target.value.length === 0) {
                this.$emit('update:modelValue', null);
            }
        },
        isValidDate(d) {
            return d instanceof Date && !isNaN(d);
        },
        onBlur() {
            // this.$refs.date.overlayVisible = false
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.date.input.focus();
            });
        }
    },
    watch: {
        errors: function () {
            this.dErros = this.errors;
        },
        modelValue: function () {
            if (this.modelValue != null && this.modelValue.toString() !== '') {
                const data = this.modelValue.toString().split('-');
                if (data.length === 3) {
                    this.inputValue = this.conveteParaData(this.modelValue);
                } else {
                    this.inputValue = this.modelValue;
                }
            }
        }
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
        inputValue: function () {
            if (this.modelValue != null && this.modelValue.toString() !== '') {
                const data = this.modelValue.toString().split('-');
                if (data.length === 3) {
                    return this.conveteParaData(this.modelValue);
                } else {
                    return this.modelValue;
                }
            } else {
                return null;
            }
        }
    }
};
</script>

<template>
    <div class="field" :class="classObject">
        <label v-if="label">
            {{ label }}
            <slot />
        </label>
        <Calendar
            v-if="!skeleton"
            v-model="inputValue"
            ref="date"
            class="w-full"
            :disabled="disabled"
            :readonly="readonly"
            :class="dErros ? 'p-invalid' : ''"
            :input-class="inputClass"
            :showButtonBar="true"
            :placeholder="placeholder"
            :view="view"
            :dateFormat="dateFormat"
            :showTime="showTime"
            :showSeconds="showSeconds"
            :showOnFocus="showOnFocus"
            :showIcon="!showOnFocus"
            :time-only="timeOnly"
            @keypress="isNumber($event)"
            @input="onInput"
            @blur="onBlur"
            @focusin="dErros = undefined"
            @date-select="selectedDate"
            @clear-click="clearClick"
        />
        <skeleton v-else class="skeleton" />
        <small v-if="dErros" id="username-help" class="p-error">{{ dErros[0] }}</small>
        <small v-if="help && ifHelp" :class="classHelp">{{ help }}</small>
    </div>
</template>

<style lang="css">
.p-datepicker table td {
    padding: 0 !important;
}

.p-datepicker table td > span {
    width: 2rem;
    height: 2rem;
}
</style>

<style scoped>
::v-deep(.p-button.p-button-icon-only) {
    width: 2.357rem !important;
    background-color: #56717d !important;
    color: #ffffff !important;
    border-color: #56717d !important;
}
</style>
