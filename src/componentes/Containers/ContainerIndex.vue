<script>
export default {
    name: 'ContainerIndex',
    props: {
        header: {
            type: String,
            default: null
        }
    }
};
</script>

<template>
    <div class="grid panel-demo">
        <div class="col-12">
            <div class="card">
                <h5 style="font-weight: normal">{{ $route.name }}</h5>
                <slot name="buttons"></slot>

                <slot name="header"></slot>

                <divider></divider>
                <div class="grid">
                    <div class="col-12">
                        <slot name="datatable"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
