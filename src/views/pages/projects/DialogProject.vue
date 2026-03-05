<template>
    <Dialog v-bind:visible="show" :style="{ width: '900px' }" :header="title" :modal="true" class="p-fluid" :closable="false" position="top">
        <row-form>
            <TextForm label="Name" v-model="form.name" :size="12" :skeleton="skeleton" :disabled="disableForm" :errors="errors.name" />
            <number-form label="Budget available" v-model="form.available_budget" :size="6" :skeleton="skeleton" :disabled="disableForm" :errors="errors.available_budget" />
            <select-form label="Status" v-model="form.status" placeholder="Selecione" :options="optStatus" :disabled="disableForm" :size="6" :skeleton="skeleton" :errors="errors.status" />
            <text-area-form label="Description" rows="5" v-model="form.description" :size="12" :skeleton="skeleton" :disabled="disableForm" :errors="errors.description" />
        </row-form>

        <template #footer>
            <divider />
            <group-button-form>
                <template #left>
                    <button-form label="Alterar Cadastro" icon="pi pi-pencil" @click="enableForm" :visible="disableForm" />
                </template>
                <template #right>
                    <button-form label="Salvar" icon="pi pi-save" @click="store" :disabled="disableForm" color="primary" />
                    <button-form label="Fechar" icon="pi pi-times" @click="$emit('cancel')" />
                </template>
            </group-button-form>
        </template>
    </Dialog>
</template>

<script>
import TextForm from '@/componentes/Inputs/TextForm.vue';
import RowForm from '@/componentes/Others/RowForm.vue';
import SelectForm from '@/componentes/Inputs/SelectForm.vue';
import NumberForm from '@/componentes/Inputs/NumberForm.vue';
import TextAreaForm from '@/componentes/Inputs/TextAreaForm.vue';
import CadastroFormDialogMixin from '@/mixins/CadastroFormDialogMixin';
import ButtonForm from '@/componentes/Buttons/ButtonForm.vue';
import GroupButtonForm from '@/componentes/Buttons/GroupButtonForm.vue';

export default {
    name: 'DialogCreateAluno',
    mixins: [CadastroFormDialogMixin],
    components: { NumberForm, GroupButtonForm, ButtonForm, TextAreaForm, SelectForm, RowForm, TextForm },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: undefined
        },
        registroId: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            routeLocal: 'http://127.0.0.1:8000/api/projects',
            optStatus: []
        };
    },
    created() {
        this.form.status = 'ATIVO';
    },
    methods: {
        setData(response) {
            this.optStatus = response.status;
        }
    }
};
</script>

<style scoped></style>
