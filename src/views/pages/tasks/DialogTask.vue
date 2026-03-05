<script>
import RowForm from '@/componentes/Others/RowForm.vue';
import SelectForm from '@/componentes/Inputs/SelectForm.vue';
import DateForm from '@/componentes/Inputs/DateForm.vue';
import TextAreaForm from '@/componentes/Inputs/TextAreaForm.vue';
import CadastroFormDialogMixin from '@/mixins/CadastroFormDialogMixin';
import ButtonForm from '@/componentes/Buttons/ButtonForm.vue';
import GroupButtonForm from '@/componentes/Buttons/GroupButtonForm.vue';

export default {
    name: 'DialogCreateAluno',
    mixins: [CadastroFormDialogMixin],
    components: { GroupButtonForm, ButtonForm, TextAreaForm, SelectForm, RowForm, DateForm },
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
        },
        optProjects: {
            type: Array,
            default: undefined
        },
        optTasks: {
            type: Array,
            default: undefined
        }
    },
    data() {
        return {
            routeLocal: 'http://127.0.0.1:8000/api/tasks',
            optStatus: [],
            dOptTasks: []
        };
    },
    created() {
        this.form.status = 'NAO_CONCLUIDA';

        this.dOptTasks = this.optTasks;
        if (this.registroId) {
            this.dOptTasks = this.optTasks.filter((x) => x.value != this.registroId);
        }
    },
    methods: {
        setData(response) {
            this.optStatus = response.status;
        }
    }
};
</script>

<template>
    <Dialog v-bind:visible="show" :style="{ width: '900px' }" :header="title" :modal="true" class="p-fluid" :closable="false" position="top">
        <row-form>
            <select-form label="Project" v-model="form.project_id" placeholder="Todos" :skeleton="skeleton" :disabled="disableForm" :options="optProjects" :size="12" :errors="errors.project_id" :search="false" />
            <select-form label="Predecessor Tak" v-model="form.predecessor_task_id" placeholder="Todos" :skeleton="skeleton" :disabled="disableForm" :options="dOptTasks" :size="12" :errors="errors.predecessor_task_id" />
            <text-area-form label="Description" rows="5" v-model="form.description" :size="12" :skeleton="skeleton" :disabled="disableForm" :errors="errors.description" />
            <date-form label="Start Date" v-model="form.start_date" :size="3" :disabled="disableForm" :errors="errors.start_date" :show-on-focus="false" />
            <date-form label="End Date" v-model="form.end_date" :size="3" :disabled="disableForm" :skeleton="skeleton" :errors="errors.end_date" :show-on-focus="false" />
            <select-form label="Status" v-model="form.status" placeholder="Selecione" :options="optStatus" :skeleton="skeleton" :disabled="disableForm" :size="6" :errors="errors.status" :search="false" />
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

<style scoped></style>
