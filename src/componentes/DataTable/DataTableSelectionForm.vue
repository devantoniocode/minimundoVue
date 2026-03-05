<template>
    <!--    TODO Everton, ao clicar em localizar, que os registeos vem do início, a página não fica apontando para a págoina 1-->
    <DataTable
        v-if="table"
        ref="datatable"
        dataKey="id"
        class="p-datatable-gridlines p-datatable-sm"
        stripedRows
        responsive-layout="scroll"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        current-page-report-template="Exibindo de {first} até {last} do total de {totalRecords} registros"
        @page="onPaginate($event)"
        @sort="onSort($event)"
        v-model:selection="rowSelecteds"
        :value="table.data"
        :paginator="paginator"
        :lazy="true"
        :rows="table.per_page"
        :total-records="table.total"
        :rowHover="true"
    >
        <Column selectionMode="multiple" headerStyle="width: 3em" class="text-center header-text-center"/>
        <slot :totais="table.totais"></slot>
        <template #empty>
            Nenhum resultado encontrado
        </template>
    </DataTable>
</template>

<script>
export default {
    name: "DataTableSelectionForm",
    emits: ["paginator", "row-selecteds"],
    props: {
        table: {
            type: Array,
            default: undefined
        },
        dblclick: {
            type: String,
            default: "edit"
        },
        paginator: {
            type: Boolean,
            default: true
        },
        selection: {
            type: Array,
            default: undefined
        },
    },
    data() {
        return {
            rowSelecteds: this.selection,
        }
    },
    methods: {
        onPaginate(event) {
            this.$emit('paginator', event.page + 1);
        },

        onSort: function (event) {
            this.$emit("onsort", event);
        },
    },
    watch: {
        rowSelecteds: {
            immediate: true,
            handler(newValue) {
                this.$emit('rowselecteds', newValue)
            }
        },
    }

}
</script>

<style scoped>

</style>
