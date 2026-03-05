<template>
    <SplitButton
        v-if="!isMobile()"
        ref="splitbutton"
        :label="label + (shortCut ? ' (' + shortCut + ')' : '')"
        :icon="hideIcon ? '' : dIcon"
        :disabled="disabled"
        :class="'p-button-' + color + ' ' + classObject"
        :loading="loading"
        :style="(!visible || hidden ? 'display:none;' : '') + (inLine ? 'height:33px; margin-top:24px' : '')"
        :model="model"
        v-tooltip.top="tooltip == null ? label : tooltip"
        @click="onClickSliptButton($event)"
    />
    <div class="field col-12" v-else>
        <SplitButton
            ref="splitbutton"
            :label="label + (shortCut ? ' (' + shortCut + ')' : '')"
            :icon="hideIcon ? '' : dIcon"
            :disabled="disabled"
            :class="'w-full p-button-' + color + ' ' + classObject"
            :loading="loading"
            :style="(!visible || hidden ? 'display:none;' : '') + (inLine ? 'height:33px; margin-top:24px' : '')"
            :model="model"
            v-tooltip.top="tooltip == null ? label : tooltip"
            @click="onClickSliptButton($event)"
        />
    </div>
</template>

<script>


import functionMixin from "../../mixins/FunctionMixin";

export default {
    name: "SplitButtonForm",
    mixins: [functionMixin],
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
        model: {
            type: Array,
        },
        teste: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dIcon: undefined,
            pTieredmenuStyle: '12.5rem',

            menuOpen: false,
        }
    },
    mounted() {
        this.dIcon = this.icon;

        // if (this.teste){
        //     // this.pTieredmenuStyle = 'width: auto !important;'
        //     this.pTieredmenuStyle = 'auto'
        // }
        //
        // console.log(this.pTieredmenuStyle)

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
            }
    },
    computed: {
        classObject: function () {
            if (this.classButton == null) {
                return 'mr-2 mb-2';
                // return 'mr-2 mb-2 pr-4';
            } else {
                return this.classButton;
            }
        },
    },
    methods: {
        onClickSliptButton(event) {
            if (!this.menuOpen)
                this.$nextTick(() => {
                    this.$refs.splitbutton.$refs.menu.show(event, {currentTarget: this.$el})
                    this.menuOpen = true
                })
            else
                this.menuOpen = false
        }
    },
    watch: {
        icon() {
            this.dIcon = this.icon;
        }
    }
}
</script>

<style lang="scss">
.p-splitbutton {
    padding-right: 0 !important;
}

</style>

<style lang="scss">

.p-tieredmenu {
    //width: v-bind(pTieredmenuStyle);
    width: auto !important;
}

</style>