<template>
    <GridLayout rows="auto, auto, *" columns="auto, *" class="card" :width="width" :height="height">
        <Label row="0" :text="item.title" class="bold" :textWrap="true"/>
        <Label row="1" :text="item.subTitle || ''" :textWrap="true"/>
        <Label col="1" rowSpan="3" :text="item.extra || ''" class="subtitle text-right vertical-center bold"/>
    </GridLayout>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object
            },
            width: {
                default: "100%"
            },
            height: {}
        }
    }
</script>

<style lang="scss" scoped>

</style>

