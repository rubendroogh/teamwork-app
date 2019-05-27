<template>
    <ScrollView>
        <FlexboxLayout flexWrap="wrap">
            <StackLayout class="card" width="47%" v-for="(item, key) in items" :key="`item-${key}`">
                <Label :text="item.title" :textWrap="true"/>
            </StackLayout>
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

<style>

</style>
