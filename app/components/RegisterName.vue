<template>
    <Page :actionBarHidden="true" >
        <GridLayout columns="*" rows="80, auto, 80, auto, auto, *, auto">
            <Label :textWrap="true" class="lead" text="Je account is succesvol geactiveerd!" row="1"/>
            <Label :textWrap="true" class="hint" text="Voer je voor- en achternaam in om door te gaan. " row="2"/>
            <TextField v-model="name" hint="Naam" row="4"/>
            <Button text="Volgende" @tap="submit()" class="button" row="6"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const firebase = require("nativescript-plugin-firebase")
    import TeamMenu from './TeamMenu.vue'

    export default {
        data() {
            return {
                name: 'Jan Sneeuw'
            }
        },
        methods: {
            submit() {
                try{
                    this.$currentUserService.setName(this.name)
                } catch(e){
                    console.log(e)
                }
                
                this.$navigateTo(TeamMenu, {
                    clearHistory: true,
                    transitionAndroid: {
                        name: "slide"
                    },
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    GridLayout{
        padding: 20;
    }
    .lead{
        text-align: center;
        font-size: 32;
    }
    .hint{
        text-align: center;
        padding: 30 0 15;
    }
    .button{
        background-color: #3498DB;
        color: white;
    }
</style>
