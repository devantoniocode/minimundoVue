<script>

export default {
    name: "DialogExcluir",
    emits: ['close', 'excluir'],
    props: {
        texto: {
            type: String,
            default: 'Deseja exluir o registro selecionado?'
        },
    },
    data() {
        return {
            show: true,
        }
    },
    methods: {
        excluir() {
            this.show = false;
            this.$emit('excluir');
        },
        close(){
            this.show = false;
            this.$emit('close');
        }
    }
}
</script>

<template>
    <Dialog :visible="show" :style="{width: '380px'}" header="" :modal="true" :closable="false" @update:visible="close">
        <div class="confirmation-content text-center">
            <i class="pi pi-question-circle mr-3" style="font-size: 4rem; color: #FBC02D;"/>
        </div>
        <br>
        <div class="confirmation-content text-center">
            <h5 v-html="texto"/>
<!--            <span>Esta exclusão é irreversível.</span>-->
        </div>
        <template #footer>
            <div class="text-center">
                <Button label="Sim, quero excluir" icon="pi pi-trash" class="p-button-danger" @click="excluir" autofocus/>
                <Button label="Não" icon="pi pi-replay" class="p-button-secondary" @click="close"/>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>

</style>
