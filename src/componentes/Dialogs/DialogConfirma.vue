<script>

import ButtonForm from "../Buttons/ButtonForm";

export default {
    name: 'DialogConfirma',
    components: {ButtonForm},
    props: {
        dados: Object,
        btnAccept: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: false,
            confirmation: null,
            btnCancel: false,
            btnReject: false,
            acceptVisible: false,
            compStyle: null,
        }
    },
    mounted() {
        this.confirmation = this.dados;
        this.btnCancel = this.confirmation.cancel ?? false;
        this.btnReject = this.confirmation.reject ?? false;
        this.acceptVisible = this.confirmation.acceptVisible ?? false;
        this.compStyle = this.confirmation.style ?? null;
        this.visible = true;
    },
    methods: {
        accept() {
            if (this.confirmation.accept) {
                this.confirmation.accept();
            }

            this.visible = this.acceptVisible;
        },
        reject() {
            if (this.confirmation.reject) {
                this.confirmation.reject();
            }

            this.visible = false;
        },
        cancel() {
            if (this.confirmation.cancel) {
                this.confirmation.cancel();
            }

            this.visible = false;
        }
    },
    computed: {
        header() {
            return this.confirmation ? this.confirmation.header : "Atenção!";
        },
        message() {
            return this.confirmation ? this.confirmation.message : null;
        },
        blockScroll() {
            return this.confirmation ? this.confirmation.blockScroll : true;
        },
        position() {
            return this.confirmation ? this.confirmation.position : 'center';
        },
        iconClass() {
            return ['p-confirm-dialog-icon', this.confirmation ? this.confirmation.icon : 'pi pi-info-circle'];
        },
        labelAccept() {
            return this.confirmation && this.confirmation.label_accept ? this.confirmation.label_accept : 'Sim';
        },
        labelReject() {
            return this.confirmation && this.confirmation.label_reject ? this.confirmation.label_reject : 'Não';
        },
    },
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        :modal="true"
        :header="header"
        :blockScroll="blockScroll"
        :position="position"
        :closable="false"
        class="p-confirm-dialog"
        :style="compStyle"
    >
        <i :class="iconClass" v-if="iconClass"/>
        <span class="p-confirm-dialog-message" v-html="message" v-if="message"/>
        <slot name="content"></slot>
        <template #footer>
            <button-form :label="labelAccept" v-if="btnAccept" @click="accept()" :autofocus="true" color="p-button-primary" class=" px-6" icon="pi pi-check"/>
            <button-form :label="labelReject" @click="reject()" v-if="btnReject" class="px-6" icon="pi pi-times"/>
            <button-form label="Cancelar" @click="cancel()" v-if="btnCancel" icon="pi pi-ban"/>
        </template>
    </Dialog>
</template>
