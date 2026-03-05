<template>
    <DataTable
        v-if="table || showEmpty"

        ref="datatable"
        :class="'p-datatable-gridlines p-datatable-sm  ' + (secondary ? 'p-datatable-secondary' : '')"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        stripedRows

        v-model:expandedRows="expandedRows"
        v-model:selection="rowSelected"

        :dataKey="dataKey"
        :responsive-layout="responsiveLayout"
        :selection-mode="selectionMode"
        :row-class="rowClass"
        :row-style="rowStyle"
        :value="table?.data"
        :paginator="paginator"
        :lazy="true"
        :rows="table?.per_page"
        :total-records="table?.total"
        :rowHover="true"
        :first_XXXX="table?.from - 1"

        @page="onPaginate($event)"
    >
        <template #empty>
            Nenhum resultado encontrado
        </template>

        <template #header>
            <td class="p-text-bold p-text-uppercase"></td>
        </template>

        <template #footer>
            <div class="col-12 p-0 m-0 text-center"  v-if="paginator && table?.total > 0">
                <span class="text-center">Mostrando de {{ table?.from }} até {{ table?.to }} de {{ formataFloat(table?.total) }} registros encontrados</span>
            </div>
            <div class="col-12 p-0 m-0 text-center"  v-if="table && !paginator && table?.length > 0">
                <span class="text-center">{{ formataFloat(table?.length) }} {{table?.length === 1 ? 'registro encontrado' : 'registros encontrados'}}</span>
            </div>
        </template>

        <ColumnGroup type="header" v-if="columnGroup">
            <slot name="columnGroup"></slot>
        </ColumnGroup>

        <slot :totais="table?.totais"></slot>

        <template #expansion="slotProps">
            <div class="orders-subtable">
                <slot name="expanded_header" :data="slotProps.data ?? []"></slot>

                <DataTable v-if="$slots.table_columns_expanded" :value="slotProps.data[expandedDataKey] == null ? [] : slotProps.data[expandedDataKey].data" responsiveLayout="scroll" style="margin-top: 20px">
                    <slot name="table_columns_expanded"/>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>

<script>
import functionMixin from "../../mixins/FunctionMixin";

export default {
    name: "DataTableForm",
    mixins: [functionMixin],
    emits: ["paginator"],
    props: {
        table: {
            type: Array,
            default: undefined
        },
        dblclick: {
            type: String,
            default: "edit"
        },
        secondary: {
            type: Boolean,
            default: false
        },
        expandedDataKey: {
            type: String,
            default: "id"
        },
        showEmpty: {
            type: Boolean,
            default: false
        },
        paginator: {
            type: Boolean,
            default: true
        },
        selectionMode: {
            type: String,
            default: 'single'
        },
        dataKey: {
            type: String,
            default: 'id'
        },
        rowClass: {
            type: String,
            default: ''
        },
        rowStyle: {
            type: String,
            default: ''
        },
        columnGroup: {
            type: Boolean,
            default: false,
        },
        textPaginator: {
            type: String,
            default: '',
        },
        responsiveLayout: {
            type: String,
            default: 'stack'
        }
    },
    data() {
        return {
            rowSelected: this.selection,
            expandedRows: [],
        }
    },
    methods: {
        rowSelect: function (rowSelectedData) {
            this.$emit("row-select", rowSelectedData)
        },
        onPaginate(event) {
            this.$emit('paginator', event.page + 1);
        },
        onSort: function (event) {
            this.$emit("onsort", event);
        },
    },

}
</script>

<style lang="css" scoped>
.p-column-title {
    text-transform: uppercase !important;
}

.orders-subtable {
    padding: 15px !important;
}

.p-datatable .p-column-header-content {
    display: block !important;
}

::v-deep(.p-datatable-row-expansion) {
    background-color: #E0E0E0 !important;
}

::v-deep(.p-paginator) {
    padding: 0 !important;
}

::v-deep(.p-datatable-footer) {
    border: none !important;
}

</style>
