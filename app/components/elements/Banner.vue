<template>
    <GridLayout rows="*, auto, auto, *" columns="auto, *" class="banner" :class="mode" :backgroundImage="`url('${image}')`">
        <Label row="1" :text="title" class="title" marginBottom="0"/>
        <Label row="2" :text="subtitle" class="subtitle" marginTop="0"/>
        <Button row="1" rowSpan="2" col="1" text=">" class="button-rounded" @tap="$emit('tap')"/>
    </GridLayout>
</template>

<script>
    export default {
        props: [
            'title',
            'subtitle',
            'image',
            'mode'
        ]
    }
</script>

<style lang="scss" scoped>
    .banner{
        height: 150;
        width: 100%;
        padding-left: 10;
        vertical-align: center;
        margin: 0;
        margin-bottom: 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .light{
        color: #fff;
    }

    .dark{
        color: #333;
    }
</style>
