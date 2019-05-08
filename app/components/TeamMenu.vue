<template>
    <Page androidStatusBarBackground="#008FEF">
        <CustomActionBar :title="currentTeam.name ? currentTeam.name : 'Team Menu'"/>
        <GridLayout v-if="hasTeam" columns="*,*" rows="*" class="container" verticalAlignment="top">
            <StackLayout col="0" >
                <Label text="Mijn team" class="card" height="100" @tap="$navigateTo(teamTestIntroduction)" />
                <Label text="Events" class="card" height="100" @tap="$navigateTo(teamTestIntroduction)" />
                <Label text="Team handleiding" class="card" height="100" @tap="$navigateTo(teamTestIntroduction)" />
                <Label text="Links" class="card" height="100" @tap="$navigateTo(teamTestIntroduction)" />
            </StackLayout>
            <StackLayout col="1">
                <Label text="Team test" class="card" height="100" @tap="$navigateTo(safetyCheckIntroduction)" />
                <Label text="Vergaderingen" class="card" height="100" @tap="$navigateTo(safetyCheckIntroduction)" />
                <Label text="Safety check" class="card" height="100" @tap="$navigateTo(safetyCheckIntroduction)" />
            </StackLayout>  
        </GridLayout>
        <GridLayout v-else class="container" rows="*, auto, *, auto">
            <Label row="1" class="empty-message" text="He, je zit nog niet in een team!" />
            <Button row="3" text="Maak team" @tap="$navigateTo(createTeam)" />
        </GridLayout>
    </Page>
</template>

<script>
    import TestIntroduction from './teamTest/Introduction.vue'
    import CheckIntroduction from './safetyCheck/Introduction.vue'
    import CreateTeam from './teamAdmin/CreateTeam.vue'

    export default {
        data() {
            return {
                teamTestIntroduction: TestIntroduction,
                safetyCheckIntroduction: CheckIntroduction,
                createTeam: CreateTeam,
                hasTeam: false,
                currentTeam: {
                    id: '',
                    name: ''
                }
            };
        },
        created(){
            // Check if team exists
            if(this.$userService.getTeams().length > 0) {
                this.hasTeam = true
                this.$userService.getTeams()[0].get().then(doc => {
                    this.currentTeam = doc.data()
                })
            }
        }
    };
</script>

<style scoped>
    .empty-message{
        text-align: center;
    }
</style>