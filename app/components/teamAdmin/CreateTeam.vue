<template>
    <Page>
        <CustomActionBar title="Team aanmaken"/>
        <GridLayout class="container" columns="*" rows="auto, auto, *, auto">
            <Label class="title" text="Vul naam in" row="0"/>
            <TextField v-model="teamName" hint="Team naam" row="1"/>
            <AddMembers v-on:members="updateMembers($event)" row="2"/>
            <Button text="Team aanmaken" @tap="createTeam()" row="3"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const dialogs = require("tns-core-modules/ui/dialogs")

    import TeamMenu from '../TeamMenu.vue'

    import TeamService from '../../classes/TeamService'

    export default {
        data(){
            return {
                teamName: '',
                members: []
            }
        },
        methods: {
            createTeam(){
                if(this.teamName === '') {
                    dialogs.alert({
                        title: "Let op!",
                        message: "Je hebt nog geen naam ingevuld. Een team heeft een naam nodig.",
                        okButtonText: "Ok"
                    })
                } else {
                    let team = new TeamService(this.$firebase, {
                        name: this.teamName,
                        members: this.members
                    })
                    this.$navigateTo(TeamMenu)
                }
            },
            updateMembers(event){
                this.members = event
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
