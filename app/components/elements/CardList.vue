<template>
    <StackLayout>
        <WrapLayout class="card" v-for="(item, key) in items" :key="`item-${key}`">
            <Label :text="item.title" />
        </WrapLayout>
    </StackLayout>
</template>

<script>
    export default {
        props: [
            'items'
        ]
    }
</script>

<style>

</style>
