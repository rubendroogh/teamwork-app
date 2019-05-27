<template>
    <Label :text="text" class="title banner" :class="mode" :backgroundImage="`url('${image}')`"/>
</template>

<script>
    export default {
        props: [
            'text',
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
        padding-top: 50%;
        vertical-align: center;
        margin: 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .light{
        color: #fff;
    }
</style>
