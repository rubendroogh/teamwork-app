<template>
    <Page statusBarStyle="light" androidStatusBarBackground="#FDFDFD">
        <CustomActionBar title="Mijn Team"/>
        <GridLayout v-if="hasTeam" columns="*,*" rows="*" class="container" verticalAlignment="top">
            <StackLayout col="0" >
                <Label text="Tests" class="card"
                    backgroundColor="green" height="180" @tap="$navigateTo(teamTestIntroduction)" />
            </StackLayout>
            <StackLayout col="1">
                <Label text="Safety check" class="card"
                    backgroundColor="blue" height="180" @tap="$navigateTo(safetyCheckIntroduction)" />
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
                currentTeam: {}
            };
        },
        mounted(){
            // Check if team exists
            // if(this.$userService.)
        },
        methods: {
            
        }
    };
</script>

<style scoped>
    .card {
        margin-right: 20px;
        margin-bottom: 20px;
        padding-top: 20px;
        text-align: center;
        font-weight: bold;
        border-radius: 10px;
        font-size:16;
    }
    .empty-message{
        text-align: center;
    }
</style>