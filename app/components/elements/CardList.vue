<template>
    <ScrollView>
        <FlexboxLayout flexWrap="wrap">
            <GridLayout rows="auto, auto, *" columns="auto, *" class="card" width="47%" v-for="(item, key) in items" :key="`item-${key}`">
                <Label row="0" :text="item.title" class="bold mb-1" :textWrap="true"/>
                <Label row="1" :text="item.subTitle || ''" :textWrap="true"/>
                <Label col="1" rowSpan="3" :text="item.extra || ''" class="subtitle text-right vertical-center bold"/>
            </GridLayout>
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

