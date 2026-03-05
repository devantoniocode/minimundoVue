<template>
    <div class="grid panel-demo">
        <div class="col-12">
            <div class="card">
                <h5 style="font-weight: normal;">{{ $route.meta.title }}</h5>
                <TabView
                        v-model:active-index="activeIndex"
                        ref="tabView"
                >
                    <TabPanel header="Dados">
                        <row-form v-if="showButtons">
                            <group-button-form>
                                <template #left>
                                    <slot name="left-left"></slot>
                                    <button-form label="Incluir" @click="$emit('incluir')" v-if="permissions.store && showButtonCreate"></button-form>
                                    <button-form label="Visualizar" @click="$emit('visualizar')" :disabled="itemSelected.id == null" v-if="permissions.view && showButtonEdit"></button-form>
                                    <button-form label="Exportar" @click="$emit('exportar')" v-if="permissions.export_excel && showButtonExport"/>
                                    <button-form label="Excluir" @click="$emit('excluir')" :disabled="itemSelected.id == null" v-if="permissions.destroy && showButtonDestroy"></button-form>
                                    <button-form label="Imprimir" @click="$emit('imprimir')" :disabled="itemSelected.id == null" v-if="permissions.imprimir && showButtonImprimir"></button-form>

                                    <slot name="left-right"></slot>
                                </template>
                                <template #right>
                                    <slot name="right-left"></slot>
                                    <button-form :label="labelLocalizar" @click="$emit('localizar')" short-cut="F2" v-if="permissions.view && showButtonVisualizar"></button-form>
                                    <slot name="right-right"></slot>
                                </template>
                            </group-button-form>
                        </row-form>

                        <slot name="header"></slot>

                        <divider></divider>
                        <div class="grid">
                            <div class="col-12">
                                <slot name="datatable"></slot>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel v-if="createTab" :key="-1" header="Incluir">
                        <template #header>
                            <i style="margin-left: 10px; font-size: 10px" class="pi pi-times" @mousedown="$parent.closeTabCreate()"></i>
                        </template>
                        <slot name="tab-create"/>
                    </TabPanel>

                    <tab-panel v-for="panel in panelsEdit" :key="panel.id" :header="panel.title">
                        <template #header>
                            <i style="margin-left: 10px; font-size: 10px" class="pi pi-times" @mousedown="$parent.tabRemove(panel.id)"></i>
                        </template>
                        <slot :name="panel.id"/>
                    </tab-panel>

                </TabView>

            </div>
        </div>
    </div>

</template>

<script>
import RowForm from "../Others/RowForm";
import GroupButtonForm from "../Buttons/GroupButtonForm";
import ButtonForm from "../Buttons/ButtonForm";

export default {
    name: "ContainerIndexCadastro",
    components: {ButtonForm, GroupButtonForm, RowForm},
    props: {
        header: {
            type: String,
            default: null
        },
        showCreateTab: {
            type: Boolean,
            default: false
        },
        showButtons: {
            type: Boolean,
            default: false
        },

        labelLocalizar: {
            type: String,
            default: 'Localizar'
        },
        panelsEdit: {
            type: Array,
            default: null,
        },
        activeIndexKey: {
            type: Number,
            default: 0,
        },
        searchKey: {
            type: String,
            default: 'F2',
        },
        disableInsertKey: {
            type: Boolean,
            default: false,
        },
        showButtonDestroy: {
            type: Boolean,
            default: false,
        },
        showButtonExport: {
            type: Boolean,
            default: false,
        },
        showButtonCreate: {
            type: Boolean,
            default: true,
        },

        showButtonEdit: {
            type: Boolean,
            default: true,
        },

        showButtonImprimir: {
            type: Boolean,
            default: false,
        },

        showButtonVisualizar: {
            type: Boolean,
            default: true,
        },
        registros: {
            type: Array,
            default: null,
        },
        itemSelected: {
            type: Object,
            default: null,
        },
        permissions: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            activeIndex: 0,
            createTab: false,
        }
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if (this.activeIndex === 0 && e.key === this.searchKey) {
                if (typeof this.showRegistros === 'function') {
                    this.showRegistros();
                }
            } else if (this.activeIndex === 0 && e.key === "Insert" && !this.disableInsertKey) {
                this.$emit("key-insert");
            }
        });
    },
    watch: {
        panelsEdit: {
            deep: true,
            immediate: true,
            handler: function (newValue) {
                if (newValue.length > 0)
                    this.activeIndex = !this.createTab ? newValue.length : newValue.length + 1;
                else if (newValue && newValue.length === 0)
                    this.activeIndex = 0;
            }
        },
        showCreateTab: {
            deep: true,
            immediate: true,
            handler: function (newValue) {
                this.createTab = newValue;
                if (this.createTab)
                    this.activeIndex = 1;
                else
                    this.activeIndex = 0;
            }
        },
        activeIndexKey: function (newValue) {
            if (this.$refs.tabView == null) return;
            this.$refs.tabView.tabs.forEach((tab, index) => {
                if (tab.key === newValue) {
                    this.activeIndex = index;
                }
            });
        },
    }
}
</script>

<style scoped>

</style>