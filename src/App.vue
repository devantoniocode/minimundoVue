<script>
import EventBus from './event-bus';

export default {
    data() {
        return {
            colorScheme: 'light',

            dialogAlertShow: false,
            dialogAlertMessage: undefined,

            dialogQuestion: false,
            dialogQuestionHeader: undefined,
            dialogQuestionContent: undefined,
            dialogQuestionType: undefined,
            dialogQuestionYesLabel: undefined,
            dialogQuestionYesClass: undefined,
            dialogQuestionYesIcon: undefined,
            dialogQuestionNoLabel: undefined
        };
    },
    computed: {
        containerClass() {
            return [
                'layout-wrapper',
                {
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-slim': this.layoutMode === 'slim',
                    'layout-horizontal': this.layoutMode === 'horizontal',
                    'layout-sidebar-dim': this.colorScheme === 'dim',
                    'layout-sidebar-dark': this.colorScheme === 'dark',
                    'layout-overlay-active': this.overlayMenuActive,
                    'layout-mobile-active': this.staticMenuMobileActive,
                    'layout-static-inactive': this.staticMenuDesktopInactive && this.layoutMode === 'static',
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': !this.$primevue.config.ripple
                },
                this.colorScheme === 'light' ? this.menuTheme : ''
            ];
        }
    },
    mounted() {
        EventBus.on('dialogQuestion', (data) => {
            if (data.type == null) {
                alert('Não implementado o type');
            } else {
                if (data.type.toString() === 'excluir') {
                    this.dialogQuestionYesLabel = 'Sim, quero excluir';
                    this.dialogQuestionNoLabel = 'Não';
                    this.dialogQuestionYesClass = 'p-button-danger';
                    this.dialogQuestionYesIcon = 'pi pi-trash';
                } else if (data.type.toString() === 'confirma') {
                    this.dialogQuestionYesLabel = 'Sim, confirmar';
                    this.dialogQuestionNoLabel = 'Não';
                    this.dialogQuestionYesClass = 'p-button-info';
                    this.dialogQuestionYesIcon = 'pi pi-check';
                }
                if (data.yesLabel) this.dialogQuestionYesLabel = data.yesLabel;
                if (data.noLabel) this.dialogQuestionNoLabel = data.noLabel;
                if (data.yesClass) this.dialogQuestionYesClass = data.yesClass;
                if (data.yesIcon) this.dialogQuestionYesIcon = data.yesIcon;

                this.dialogQuestionContent = data.content;
                this.dialogQuestionFunction = data.function;
                this.dialogQuestionHeader = data.header;
                this.dialogQuestion = true;
            }
        });

        EventBus.on('dialogAlert', (alert) => {
            this.dialogAlertShow = alert.show;
            this.dialogAlertMessage = alert.message;
        });
    },
    methods: {
        onDialogQuestionYes() {
            this.dialogQuestion = false;
            this.dialogQuestionFunction();
        },
        onDialogQuestionNo() {
            this.dialogQuestion = false;
        },
        onDocumentClick() {
            if (!this.searchClick && this.searchActive) {
                this.onSearchHide();
            }

            if (!this.userMenuClick) {
                this.topbarUserMenuActive = false;
            }

            if (!this.notificationMenuClick) {
                this.topbarNotificationMenuActive = false;
            }

            if (!this.rightMenuClick) {
                this.rightMenuActive = false;
            }

            if (!this.menuClick) {
                if (this.isSlim() || this.isHorizontal()) {
                    EventBus.emit('reset-active-index');
                    this.menuActive = false;
                }

                if (this.overlayMenuActive || this.staticMenuMobileActive) {
                    this.hideOverlayMenu();
                }

                this.unblockBodyScroll();
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            this.searchClick = false;
            this.configClick = false;
            this.userMenuClick = false;
            this.rightMenuClick = false;
            this.notificationMenuClick = false;
            this.menuClick = false;
        }
    }
};
</script>

<template>
    <router-view />
    <div :class="containerClass" :data-theme="colorScheme" @click="onDocumentClick($event)">
        <Dialog :visible="dialogAlertShow" :closable="false" :modal="true" style="min-width: 350px">
            <template #header>
                <h5>Atenção</h5>
            </template>
            <div class="fluid">
                <div class="formgrid grid">
                    <div class="col-12 field text-center">
                        <i class="pi pi-exclamation-triangle" style="font-size: 3rem; color: #ffb74d"></i>
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="col-12 field text-center">
                        <p><strong v-html="dialogAlertMessage" /></p>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="grid">
                    <div class="col-12 text-center fluid">
                        <Button style="width: 100% !important" class="p-button p-button-secondary" label="OK" @click="dialogAlertShow = false" autofocus />
                    </div>
                </div>
            </template>
        </Dialog>
        <Dialog :visible="dialogQuestion" :style="{ width: '380px' }" :header="dialogQuestionHeader" :modal="true" :closable="false" @update:visible="dialogQuestion = false">
            <div class="confirmation-content text-center">
                <i class="pi pi-question-circle mr-3" style="font-size: 4rem; color: #fbc02d" />
            </div>
            <br />
            <div class="confirmation-content text-center">
                <h5 v-html="dialogQuestionContent" />
                <!--            <span>Esta exclusão é irreversível.</span>-->
            </div>
            <template #footer>
                <div class="text-center">
                    <Button :label="dialogQuestionYesLabel" :icon="dialogQuestionYesIcon" :class="dialogQuestionYesClass" @click="onDialogQuestionYes" autofocus />
                    <Button :label="dialogQuestionNoLabel" class="p-button-secondary" @click="onDialogQuestionNo" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<style lang="css">
.p-datatable .p-datatable-thead > tr > th {
    background: #ad8c31; /*#607d8b;*/
    color: white;
    border: 1px solid #cccccc;
}

.p-datatable .p-datatable-tfoot > tr > td {
    background: #e1e1e1;
}

.p-datatable-secondary .p-datatable-thead > tr > th {
    background: #42555e;
    color: white;
    border: 1px solid #cccccc;
}

.p-datatable-secondary .p-datatable-thead > tr > th {
    background: #42555e;
    color: white;
    border: 1px solid #cccccc;
}

.p-datatable-table {
    font-size: 90% !important;
}
</style>
