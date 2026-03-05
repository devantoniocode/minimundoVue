<template>
    <div class="p-fluid">
        <row-form>
            <group-button-form class="mb-1">

                <template #left>
                    <button-form label="Visualizar" @click="$emit('visualizar')" :disabled="!itemSelected" v-if="permissions.view && showButtonVisualizar"></button-form>
                </template>

                <template #right>
                    <button-form label="Localizar" @click="$emit('show')" short-cut="F2" v-if="permissions.view && showButtonLocalizar"></button-form>
                </template>
            </group-button-form>
        </row-form>
        <slot></slot>
        <row-form v-if="showButtonFooter">
            <divider/>
            <group-button-form>
                <template #left>
                    <button-form label="Alterar Cadastro" @click="$emit('enableForm')" v-if="registroId && permissions.update && showButtonAlterar" :visible="disableForm"></button-form>
                </template>
                <template #right>
                    <button-form :label="labelButtonStore" color="primary" :icon="iconButtonStore" :disabled="disableForm || disableButtonStore" :loading="loadingStore" @click="$emit('store')" v-if="permissions.update && showButtonStore || permissions.store && showButtonStore"></button-form>
                    <button-form label="Fechar" @click="$emit('cancel')" v-if="showButtonFechar"></button-form>
                </template>
            </group-button-form>
        </row-form>
    </div>
</template>

<script>
import RowForm from "../Others/RowForm";
import GroupButtonForm from "../Buttons/GroupButtonForm";
import ButtonForm from "../Buttons/ButtonForm";

export default {
    name: "ContainerFormDialogCadastro",
    components: {ButtonForm, GroupButtonForm, RowForm},
    props: {
        disableForm: {
            type: Boolean,
            default: false
        },
        disableButtonStore: {
            type: Boolean,
            default: false
        },
        showButtonFechar: {
            type: Boolean,
            default: true
        },
        showButtonFooter: {
            type: Boolean,
            default: true
        },
        iconButtonStore: {
            type: String,
            default: 'pi pi-save'
        },
        registroId: {
            type: String,
            default: undefined
        },

        itemSelected: {
            type: Object,
            default: null,
        },
        permissions: {
            type: Object,
            default: undefined
        },

        loadingStore: {
            type: Boolean,
            default: false
        },
        showButtonAlterar: {
            type: Boolean,
            default: true
        },
        showButtonStore: {
            type: Boolean,
            default: true
        },
        labelButtonStore: {
            type: String,
            default: 'Salvar'
        },
        showButtonLocalizar: {
            type: Boolean,
            default: false
        },
        showButtonVisualizar: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>

</style>