<template>
    <Button
        v-if="!isMobile"
        :label="label + (shortCut ? ' (' + shortCut + ')' : '')"
        :icon="hideIcon ? '' : dIcon"
        :disabled="disabled"
        :class="'p-button-' + color + ' ' + classObject"
        :loading="loading"
        :icon-pos="iconPos"
        :style="(!visible || hidden ? 'display:none;' : '') + (inLine ? 'height:33px;margin-top:19px' : '')"
        v-tooltip.top="tooltip == null ? label : tooltip"
    />
    <div class="field col-12" v-else>
        <Button
            :label="label + (shortCut ? ' (' + shortCut + ')' : '')"
            :icon="hideIcon ? '' : dIcon"
            :disabled="disabled"
            :class="'w-full p-button-' + color + ' ' + classObject"
            :loading="loading"
            :icon-pos="iconPos"
            :style="(!visible || hidden ? 'display:none;' : '') + (inLine ? 'height:33px;margin-top:19px' : '')"
            v-tooltip.top="tooltip == null ? label : tooltip"
        />
    </div>
</template>

<script>


export default {
    name: "ButtonForm",
    props: {
        label: {
            type: String,
            default: ""
        },
        shortCut: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: "secondary"
        },
        icon: {
            type: String,
            default: undefined
        },
        hideIcon: {
            type: Boolean,
            default: false
        },
        alignRight: {
            type: Boolean,
            default: false
        },
        iconPos: {
            type: String,
            default: 'left'
        },
        inLine: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        classButton: {
            type: String,
            default: undefined
        },
        tooltip: {
            type: String,
            default: undefined
        },
    },
    data() {
        return {
            dIcon: undefined
        }
    },
    mounted() {
        this.dIcon = this.icon;
        if (this.icon === undefined)
            switch (this.label.toString().toUpperCase()) {
                case 'INCLUIR':
                    this.dIcon = "pi pi-plus";
                    break;
                case 'VISUALIZAR':
                    this.dIcon = "pi pi-search-plus";
                    break;
                case 'LOCALIZAR':
                    this.dIcon = "pi pi-search";
                    break;
                case 'SALVAR':
                    this.dIcon = "pi pi-save";
                    break;
                case 'CANCELAR':
                    this.dIcon = "pi pi-ban";
                    break;
                case 'FECHAR':
                    this.dIcon = "pi pi-ban";
                    break;
                case 'EXCLUIR':
                    this.dIcon = "pi pi-trash";
                    break;
                case 'ALTERAR CADASTRO':
                    this.dIcon = "pi pi-pencil";
                    break;
                case 'EXPORTAR':
                    this.dIcon = "pi pi-file-excel";
                    break;
                case 'IMPRIMIR':
                    this.dIcon = "pi pi-print";
                    break;
                case 'SELECIONAR':
                    this.dIcon = "pi pi-check-circle";
                    break;
            }
    },
    computed: {
        classObject: function () {
            if (this.classButton == null) {
                return 'mr-2 mb-2 pr-4';
            } else {
                return this.classButton;
            }
        },
        isMobile() {
            return window.innerWidth <= 1091;
        },
    },
    watch: {
        icon() {
            this.dIcon = this.icon;
        }
    },
}
</script>

<style scoped>

</style>