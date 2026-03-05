<script>
import DialogProject from '@/views/pages/projects/DialogProject.vue';
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
    components: { ContainerIndex, DateForm, ButtonForm, TextForm, SelectForm, RowForm, DataTableForm, DialogProject },
    mixins: [FunctionMixin, CadastroIndexMixin],
    data() {
        return {
            routeIndex: 'http://127.0.0.1:8000/api/projects',
            optStatus: [],
            showDialogcProject: false,
            expandedRows: [],
            tasks: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        setData(response) {
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
        createProject() {
            this.itemSelected = {};
            this.showDialogcProject = true;
        },
        editProject() {
            this.showDialogcProject = true;
        },
        refreshProjects() {
            this.showRegistros();
            this.$nextTick(() => {
                this.showDialogcProject = false;
            });
        },
        deleteProject() {
            EventBus.emit('dialogQuestion', {
                type: 'excluir',
                content: `Tem certeza que deseja excluir o projeto <br>${this.itemSelected.name}?`,
                yesLabel: 'Sim, desejo excluir',
                function: this.onDeleteProject
            });
        },
        onDeleteProject() {
            this.dialogWait(true);
            this.axiosDestroy(`${this.routeIndex}/${this.itemSelected.id}`)
                .then(() => {
                    this.showRegistros();
                })
                .finally(() => {
                    this.dialogWait(false);
                });
        },
        paginatorTask(event, row) {
            this.showTasks(row, { page: event });
        },
        onRowExpand(row) {
            this.showTasks(row);
        },
        showTasks(row, event = null) {
            row.data.loading = true;
            this.axiosGet(`${this.routeIndex}/show_tasks`, { project_id: row.data.id, page: event?.page ?? 1 })
                .then((response) => {
                    row.data.tasks = response.data.tasks;
                })
                .finally(() => {
                    row.data.loading = false;
                });
        }
    }
};
</script>

<template>
    <container-index v-if="showIndex" :active-index-key="activeIndexKey" :permissions="permissions">
        <template #header>
            <Toolbar class="mb-2">
                <template v-slot:start>
                    <ButtonForm label="Incluir" @click="createProject" />
                    <ButtonForm label="Visualizar" @click="editProject" :disabled="!itemSelected.id" />
                    <ButtonForm label="Excluir" @click="deleteProject" :disabled="!itemSelected.id" />
                </template>
                <template v-slot:end>
                    <ButtonForm label="Localizar" @click="showRegistros" />
                </template>
            </Toolbar>
            <row-form>
                <text-form label="Nome" v-model="locForm.name" :size="3" :search="true" />
                <text-form label="Description" v-model="locForm.description" :size="3" :search="true" :normal-case="true" />
                <date-form label="Date (from)" v-model="locForm.date1" :size="2" :show-on-focus="false" />
                <date-form label="Date (to)" v-model="locForm.date2" :size="2" :show-on-focus="false" />
                <select-form label="Status" v-model="locForm.status" placeholder="Todos" :options="optStatus" :size="2" />
            </row-form>
        </template>
        <template #datatable>
            <DataTableForm
                :table="registros"
                @row-select="rowSelect"
                :selection="itemSelected"
                :loading="loadingTable"
                @row-dblclick="editProject"
                @paginator="paginator($event)"
                @row-expand="onRowExpand"
                v-model:expandedRows="expandedRows"
                show-empty
            >
                <Column :expander="true" headerStyle="width: 35px" />
                <Column field="name" header="NAME" />
                <Column field="description" header="DESCRIPTION" />
                <Column field="date_br" header="DATA" class="text-right" style="white-space: nowrap" />
                <Column field="total" header="TASKS" class="text-right" />
                <Column field="finish" header="TASKS FINISH" class="text-right" />
                <Column field="progress" header="PROGRESS" class="text-right" />
                <Column field="status" header="STATUS" class="text-center">
                    <template #body="{ data }">
                        <Badge :value="data.status" :severity="data.class_status"></Badge>
                    </template>
                </Column>
                <template #expanded_header="row">
                    <DataTableForm :table="row.data.tasks" :loading="row.data.loading" @paginator="paginatorTask($event, row)">
                        <Column field="description" header="DESCRIPTION" />
                        <Column field="start_date_br" header="START DATE" class="text-right" style="white-space: nowrap" />
                        <Column field="end_date_br" header="END DATE" class="text-right" style="white-space: nowrap" />
                        <Column field="status" header="STATUS" class="text-center" style="white-space: nowrap">
                            <template #body="{ data }">
                                <Badge :value="data.status_br" :severity="data.class_status"></Badge>
                            </template>
                        </Column>
                    </DataTableForm>
                </template>
            </DataTableForm>
        </template>
    </container-index>
    <DialogProject v-if="showDialogcProject" :show="showDialogcProject" :title="itemSelected.id ? 'Edit project' : 'New project'" :registro-id="itemSelected.id" @cancel="showDialogcProject = false" @close="refreshProjects" />
</template>

<style lang="scss" scoped></style>
