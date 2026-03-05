import AxiosMixin from './AxiosMixin';
import EventBus from '../event-bus';


export default {
    name: 'CadastroIndexMixin',
    mixins: [AxiosMixin],
    data() {

        return {
            permissions: {},
            user: {},
            itemSelected: {},
            locForm: {},
            errors: {},
            registroSelected: {},

            activeIndexKey: 0,

            panelsEdit: [],

            registros: undefined,
            urlPdf: undefined,

            showTabCreate: false,
            loadingTable: false,
            showIndex: false,
            showDialogPdf: false,
            tituloPdfName: 'tituloPdfName',
        };
    },
    async created() {
        if (this.noGetData == null || this.noGetData === false)
            await this.getData();
        window.addEventListener('keyup', this.shortCuts, false);
    },
    methods: {
        shortCuts: function (e) {
            if (e.key === 'F2') this.showRegistros();
        },
        getData() {
            this.axiosData(`${this.routeIndex}/data`)
                .then((response) => {
                    this.showIndex = true;
                    EventBus.emit('showProgressBar', false);

                    this.$nextTick(() => {
                        if (typeof this.setData === 'function') {
                            this.setData(response);
                        }
                    });
                });
        },
        rowSelect(row) {
            this.itemSelected = row.data;
        },
        tabClose: function (tab) {
            this.tabRemove(tab);
        },
        tabRemove: function (id) {
            this.panelsEdit = this.panelsEdit.filter(obj => obj.id !== id);
        },
        tabCreate() {
            if (this.showTabCreate) {
                this.activeIndexKey = -1;
            } else {
                this.showTabCreate = true;
            }
        },
        editAfterCreate(row) {
            this.itemSelected = row;
            this.tabEdit();
        },
        tabEdit() {
            if (this.itemSelected.id && this.permissions.view) {
                if (this.panelsEdit.filter(e => e.id === this.itemSelected.id).length > 0) {
                    this.activeIndexKey = this.itemSelected.id;
                } else {
                    let tab = '';
                    if (this.nameTabEditLabel) {
                        tab = this.nameTabEditLabel;
                    } else {
                        let title = 'nameTabEdit';
                        if (this.nameTabEdit && this.itemSelected[this.nameTabEdit.split('|')[0]] != null) {
                            title = this.itemSelected[this.nameTabEdit.split('|')[0]].toString().substring(0, 20);
                            if (this.nameTabEdit.split('|').length > 1) {
                                title += ' - ' + this.itemSelected[this.nameTabEdit.split('|')[1]].substring(0, 20);
                            }
                        }
                        tab = {
                            id: this.itemSelected.id,
                            title: title,
                        };
                    }

                    this.panelsEdit.push(tab);
                }
            }
        },
        closeTabCreate() {
            this.showTabCreate = false;
            this.showRegistros();
        },
        closeTabEdit(id) {
            this.tabRemove(id);
            this.showRegistros();
        },
        onSort(event) {
            this.locForm.sortField = event.sortField;
            this.locForm.sortOrder = event.sortOrder;
            this.locForm.per_page = event.rows;
            this.locForm.page = 1;
            this.showRegistros();
        },

        showRegistros(event) {
            this.loadingTable = true;
            this.locForm.page = event && event.page ? event.page : 1;
            let rota = this.routeRelatorio ?? `${this.routeIndex}/show`
            this.axiosShow(rota, this.locForm)
                .then((response) => {
                    this.loadingTable = false;
                    this.errors = {};
                    if (typeof this.showDependencias === 'function') {
                        this.showDependencias(response);
                    }
                });

        },

        paginator(event) {
            this.showRegistros({page: event});
        },

        destroy() {
            EventBus.emit('dialogQuestion', {
                type: 'excluir',
                content: `Deseja excluir o registro selecionado?`,
                yesLabel: 'Sim, quero excluir',
                function: this.excluir,
            });
        },

        excluir() {
            this.dialogWait(true);
            this.axiosDestroy(`${this.routeIndex}/${this.itemSelected.id}`)
                .then(() => {
                    this.itemSelected = {};
                    this.dialogWait(false);
                    this.showRegistros();
                });
        },
        // destroy() {
        //     let isExecuted = confirm("Confirma a exclusão?");
        //     if (isExecuted) {
        //         axios.delete(`${this.routeIndex}/${this.itemSelected.id}`)
        //             .then(() => {
        //                 this.showRegistros();
        //             })
        //     }
        // },
        showPdf() {
            let rota = this.routePdf ?? `${this.routeIndex}/show`;
            this.axiosPdf(rota, this.locForm)
                .then((response) => {
                    var blob = new Blob([response.data], {type: 'application/pdf'});
                    this.urlPdf = URL.createObjectURL(blob);
                    this.showDialogPdf = true;
                });
        },
        exportExcel(metodo = '/exportar_excel') {
            let formData = JSON.parse(JSON.stringify(this.locForm));
            formData.exportar_excel = true;
            this.axiosExport(`${this.routeIndex}${metodo}`, formData);
        },
        close() {
            this.$emit('close')
        },
    },
};
