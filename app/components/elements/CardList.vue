<template>
    <ScrollView>
        <FlexboxLayout flexWrap="wrap">
            <Card width="47%" v-for="(item, key) in items" :key="`item-${key}`" :item="item"/>
        </FlexboxLayout>
    </ScrollView>
</template>

<script>
    export default {
        props: {
            items: {
                type: Object
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

