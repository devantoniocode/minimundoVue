<script>
import DialogTask from '@/views/pages/tasks/DialogTask.vue';
import EventBus from '@/event-bus';
import FunctionMixin from '@/mixins/FunctionMixin';
import DataTableForm from '@/componentes/DataTable/DataTableForm.vue';
import RowForm from '@/componentes/Others/RowForm.vue';
import SelectForm from '@/componentes/Inputs/SelectForm.vue';
import TextForm from '@/componentes/Inputs/TextForm.vue';
import ButtonForm from '@/componentes/Buttons/ButtonForm.vue';
import DateForm from '@/componentes/Inputs/DateForm.vue';
import ContainerIndex from '@/componentes/Containers/ContainerIndex.vue';
import CadastroIndexMixin from '@/mixins/CadastroIndexMixin';

export default {
    components: { ContainerIndex, DateForm, ButtonForm, TextForm, SelectForm, RowForm, DataTableForm, DialogTask },
    mixins: [FunctionMixin, CadastroIndexMixin],
    data() {
        return {
            routeIndex: 'http://127.0.0.1:8000/api/tasks',
            registros: [],
            optProjects: [],
            optTasks: [],
            optStatus: [],
            itemSelected: {},
            locForm: {},
            loadingTable: false,
            showDialogTask: false,
            url: undefined
        };
    },
    created() {
        this.getData();
    },
    methods: {
        setData(response) {
            this.optProjects = response.projects;
            this.optTasks = response.tasks;
            this.optStatus = response.status;
            this.showRegistros();
        },
        paginator(event) {
            this.showRegistros({ page: event });
        },
        showRegistros(event = {}) {
            this.loadingTable = true;
            let formData = {
                page: event.page ?? 1,
                ...this.locForm
            };
            this.axiosGet(this.routeIndex, formData).then((response) => {
                this.registros = response.data.registros;
                this.loadingTable = false;
                this.itemSelected = {};
            });
        },
        createTask() {
            this.itemSelected = {};
            this.$nextTick(() => {
                this.showDialogTask = true;
            });
        },
        editTask() {
            this.showDialogTask = true;
        },
        refreshProjects() {
            this.showRegistros();
            this.$nextTick(() => {
                this.showDialogTask = false;
            });
        },
        deleteTask() {
            EventBus.emit('dialogQuestion', {
                type: 'excluir',
                content: `Tem certeza que deseja excluir a task <br>${this.itemSelected.description}?`,
                yesLabel: 'Sim, desejo excluir',
                function: this.onDeleteTask
            });
        },
        onDeleteTask() {
            this.dialogWait(true);
            this.axiosDestroy(`${this.routeIndex}/${this.itemSelected.id}`)
                .then(() => {
                    this.showRegistros();
                })
                .finally(() => {
                    this.dialogWait(false);
                });
        },

        exportCSV() {
            this.dialogWait(true);
            this.axiosGet(`${this.routeIndex}`, { export_excel: true })
                .then((response) => {
                    this.ondExportCSV(response.data.registros);
                })
                .finally(() => {
                    this.dialogWait(false);
                });
        },
        ondExportCSV(registros) {
            const dadosParaExportar = registros.map((item) => ({
                Project: item.project.name,
                Description: item.description,
                'Start Date': item.start_date_br,
                'End Date': item.end_date_br,
                Status: item.status_br
            }));

            this.downloadCSV(dadosParaExportar);
        },
        downloadCSV(data) {
            // CORREÇÃO AQUI: usa this.$papa.unparse() em vez de Papa.unparse()
            const csv = this.$papa.unparse(data); // Converte JSON → CSV

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', 'dados.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Limpa a URL para liberar memória
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 100);
        }
    }
};
</script>

<template>
    <container-index v-if="showIndex" :active-index-key="activeIndexKey" :permissions="permissions">
        <template #header>
            <Toolbar class="mb-2">
                <template v-slot:start>
                    <ButtonForm label="Incluir" @click="createTask" />
                    <ButtonForm label="Visualizar" @click="editTask" :disabled="!itemSelected.id" />
                    <ButtonForm label="Excluir" @click="deleteTask" :disabled="!itemSelected.id" />
                    <ButtonForm label="Gerar Relatório" icon="pi pi-file-excel" @click="exportCSV" :disabled="loadingTable" />
                </template>
                <template v-slot:end>
                    <ButtonForm label="Localizar" @click="showRegistros" />
                </template>
            </Toolbar>
            <row-form>
                <select-form label="Project" v-model="locForm.project_id" placeholder="Todos" :options="optProjects" :size="4" />
                <select-form label="Predecessor Task" v-model="locForm.predecessor_task_id" placeholder="Todos" :options="optTasks" :size="4" />
                <text-form label="Description" v-model="locForm.description" :size="4" :search="true" />
                <date-form label="Start Date (from)" v-model="locForm.start_date1" :size="2" :show-on-focus="false" />
                <date-form label="Start Date (to)" v-model="locForm.start_date2" :size="2" :show-on-focus="false" />
                <date-form label="End Date (from)" v-model="locForm.end_date1" :size="2" :show-on-focus="false" />
                <date-form label="End Date (to)" v-model="locForm.end_date2" :size="2" :show-on-focus="false" />
                <select-form label="Status" v-model="locForm.status" placeholder="Todos" :options="optStatus" :size="4" />
            </row-form>
        </template>
        <template #datatable>
            <DataTableForm :table="registros" @row-select="rowSelect" :selection="itemSelected" :loading="loadingTable" @row-dblclick="editTask" @paginator="paginator($event)" show-empty>
                <Column field="project.name" header="PROJECT" />
                <Column field="description" header="DESCRIPTION" />
                <Column field="start_date_br" header="START DATE" class="text-right" style="min-width: 100px;"/>
                <Column field="end_date_br" header="END DATE" class="text-right" style="min-width: 100px;"/>
                <Column field="status" header="STATUS" class="text-center" style="white-space: nowrap">
                    <template #body="{ data }">
                        <Badge :value="data.status_br" :severity="data.class_status"></Badge>
                    </template>
                </Column>
            </DataTableForm>
        </template>
    </container-index>
    <DialogTask
        v-if="showDialogTask"
        :show="showDialogTask"
        :opt-projects="optProjects"
        :opt-tasks="optTasks"
        :title="itemSelected.id ? 'Edit task' : 'New task'"
        :registro-id="itemSelected.id"
        @cancel="showDialogTask = false"
        @close="refreshProjects"
    />
</template>

<style lang="scss" scoped></style>
