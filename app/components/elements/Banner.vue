<template>
    <StackLayout class="banner" :class="mode" :backgroundImage="`url('${image}')`">
        <Label :text="title" class="title" marginBottom="0"/>
        <Label :text="subtitle" class="subtitle" marginTop="0"/>
    </StackLayout>
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
