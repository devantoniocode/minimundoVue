import AxiosMixin from "./AxiosMixin";


export default {
    name: "CadastroFormDialogMixin",
    mixins: [AxiosMixin],
    props: {
        permissions: {
            type: Object,
            default: undefined
        },
        registroId: {
            type: String,
            default: undefined
        },
        showDialog: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            disableForm: this.registroId != null,
            skeleton: this.registroId != null,
            loadingStore: false,
            loadingTable: false,
            form: {},
            locForm: {},
            errors: {},
            itemSelected: {},
            registros: [],
        }
    },
    mounted() {
        if (this.noGetData == null || this.noGetData === false)
            this.getData();
    },
    methods: {

        close() {
            this.$emit('close')
        },
        cancel() {
            this.$emit('cancel')
        },
        enableForm: function () {
            this.disableForm = false
        },
        store() {
            let rota = this.routeStore ?? this.routeLocal
            this.loadingStore = true

            this.axiosStore(`${rota}`, this.form)
                .then(() => {
                    this.$emit('close')
                });
        },
        getData() {
            let rota = this.routeData ?? this.routeLocal

            let formData = {id: this.dRegistroId}
            if (this.formGetData)
                formData = this.formGetData;

            this.axiosData(`${rota}/data`, formData)
                .then((response) => {
                    if (typeof this.setData === 'function') {
                        this.setData(response);
                    }
                    if (this.registroId != null)
                        this.axiosEdit(`${this.routeLocal}/${this.registroId}/edit`)
                            .then((response) => {
                                if (typeof this.showDependencies === 'function') {
                                    this.showDependencies(response);
                                }
                            });
                });
        },
        showRegistros(event) {
            this.loadingTable = true;
            this.form.page = event && event.page ? event.page : 1
            let method = event && event.method ? event.method : 'show'
            this.axiosShow(`${this.routeLocal}/${method}`, this.locForm)
                .then((response) => {
                        if (event && event.selectedFirst && response.data.registros.data.length > 0) {
                            this.itemSelected = response.data.registros.data[0];
                            try {
                                setTimeout(() => {
                                    var form = document.querySelector('#formDialogLoc');
                                    form.querySelectorAll('.p-selectable-row.p-highlight')[0].focus();
                                }, 100);
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }
                )
                .finally(() => {
                    this.loadingTable = false;
                })
        },
        paginator(event) {
            this.showRegistros({page: event})
        }
        ,
        rowSelect(row) {
            this.itemSelected = row.data;
        }
        ,
        showPdf() {
            let rota = this.routePdf ?? `${this.routeLocal}/show`
            this.axiosPdf(rota, this.form)
                .then((response) => {
                    var blob = new Blob([response.data], {type: 'application/pdf'})
                    this.urlPdf = URL.createObjectURL(blob)
                    this.showDialogPdf = true
                })
        },
        selected() {
            if (this.itemSelected.id == null) {
                this.dialogAlert("Nenhum Registro selecionado.")
                return
            }
            this.$emit('selected', this.itemSelected);
        },
    }
}