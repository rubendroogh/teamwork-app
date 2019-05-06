<template>
    <Page>
        <CustomActionBar />
        <StackLayout>
            <Label text="Team aanmaken" />
            <TextField v-model="teamName" hint="Team naam" />
            <Button text="Team aanmaken" @tap="createTeam()" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
    import TeamMenu from '../TeamMenu.vue'

    import TeamService from '../../classes/TeamService'

    export default {
        data(){
            return {
                teamName: ''
            }
        },
        mounted(){
            
        },
        methods: {
            createTeam(){
                let team = new TeamService(this.$firebase, {
                    name: this.teamName,
                    members: [this.$userService.getUid()]
                })
                this.$navigateTo(TeamMenu)
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
