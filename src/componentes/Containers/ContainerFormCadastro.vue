<template>
    <div class="fluid">
        <slot name="form"/>
        <divider/>
        <row-form v-if="showButtons">
            <group-button-form>
                <template #left>
                    <button-form label="Alterar Cadastro" tooltip="Alterar Cadastro" :disabled="skeleton" @click="$emit('enableForm')" v-if="dRegistroId && permissions.update && showButtonAlterar" :visible="disableForm"></button-form>
                    <button-form tooltip="Log" class-button="p-2 mb-2 mr-2" @click="$emit('open-dialog-log')" v-if="registroId && permissions.log && showButtonLog" icon="pi pi-search"/>
                </template>
                <template #right>
                    <button-form :label="showButtonNext ? 'Salvar e Continuar' : labelStore" :icon="iconButtonStore" :tooltip="showButtonNext ? 'Salvar e Continuar' : labelStore" color="primary" :disabled="disableForm || disableButtonStore" :loading="loadingStore" @click="$emit('store')"
                                 v-if="((permissions.update && registroId) || (permissions.store && registroId == null)) && showButtonStore "

                    ></button-form>
                    <button-form label="Fechar" tooltip="Fechar" @click="$emit('cancel')"></button-form>
                </template>
            </group-button-form>
        </row-form>
        <slot name="buttons"/>
    </div>
</template>

<script>
import RowForm from "../Others/RowForm";
import GroupButtonForm from "../Buttons/GroupButtonForm";
import ButtonForm from "../Buttons/ButtonForm";

export default {
    name: "ContainerFormCadastro",
    components: {ButtonForm, GroupButtonForm, RowForm},
    props: {
        registroId: {
            type: String,
            default: undefined
        },
        enableForm: {
            type: Boolean,
            default: false
        },
        skeleton: {
            type: Boolean,
            default: false
        },
        disableForm: {
            type: Boolean,
            default: false
        },
        disableButtonStore: {
            type: Boolean,
            default: false
        },
        loadingStore: {
            type: Boolean,
            default: false
        },
        labelStore: {
            type: String,
            default: 'Salvar'
        },
        showButtons: {
            type: Boolean,
            default: false
        },
        showButtonAlterar: {
            type: Boolean,
            default: true
        },
        showButtonLog: {
            type: Boolean,
            default: false
        },
        showButtonStore: {
            type: Boolean,
            default: true
        },
        showButtonNext: {
            type: Boolean,
            default: false
        },
        permissions: {
            type: Object,
            default: undefined
        },
        iconButtonStore: {
            type: String,
            default: 'pi pi-save'
        },
    },

    data() {
        return {
            dRegistroId: this.registroId
        }
    },

    watch: {
        'this.registroId'() {
            this.dRegistroId = this.registroId
        }
    },
}
</script>

<style scoped>

</style>