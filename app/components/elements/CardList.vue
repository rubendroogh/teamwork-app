<template>
    <ScrollView>
        <FlexboxLayout flexWrap="wrap">
            <StackLayout class="card" width="46%" v-for="(item, key) in items" :key="`item-${key}`">
                <Label :text="item.title" :textWrap="true"/>
            </StackLayout>
        </FlexboxLayout>
    </ScrollView>
</template>

<script>
    import { screen } from 'tns-core-modules/platform'

    export default {
        props: {
            items: {
                type: Object
            }
        },
        data() {
            return {
                screenWidth: screen.mainScreen.widthPixels
            }
        },
        methods: {
            calcWidth() {
                console.log(screen.mainScreen.widthPixels)
                return (screen.mainScreen.widthPixels / 2) - 20
            }
        }
    }
</script>

<style>

</style>
