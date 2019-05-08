<template>
    <Page>
        <CustomActionBar title="Team aanmaken" />
        <GridLayout class="container" columns="*" rows="*, auto, *, auto *, auto">
            <TextField v-model="teamName" hint="Team naam" row="1" />
            <AddMembers v-on:members="updateMembers($event)" row="3" />
            <Button text="Team aanmaken" @tap="createTeam()" row="5" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import TeamMenu from '../TeamMenu.vue'

    import TeamService from '../../classes/TeamService'

    export default {
        data(){
            return {
                teamName: '',
                members: []
            }
        },
        mounted(){
            
        },
        methods: {
            createTeam(){
                let team = new TeamService(this.$firebase, {
                    name: this.teamName,
                    members: this.members
                })
                this.$navigateTo(TeamMenu)
            },
            updateMembers(event){
                this.members = event
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
