<template>
    <Page class="page">
        <ActionBar>
            <StackLayout orientation="horizontal">
                <Label text="Mijn team" class="page-title" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <GridLayout columns="*,*" rows="*" width="*" height="*" margin="20" verticalAlignment="top">

            <StackLayout col="0" >
                <Label text="Deelnemers" class="card" backgroundColor="red" height="150" @tap="$navigateTo(TeamMembers)"/>
                <Label text="Team Test" class="card" backgroundColor="green" height="180" @tap="$navigateTo(teamTestComponent)" />
            </StackLayout>

            <StackLayout col="1" >
                <Label text="Safety check" class="card" backgroundColor="blue" height="180" @tap="$navigateTo(SafetyCheck)" />
                <Label text="Mijn profiel" class="card" backgroundColor="yellow" height="150" @tap="$navigateTo(MyProfile)" />
            </StackLayout>
            
        </GridLayout>
    </Page>
</template>

<script>
    import Introduction from '../TeamTest/Introduction.vue'

    export default {
        data() {
            return {
                teamTestComponent: Introduction
            };
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
        box-shadow: 1px 1px 1px #333;
    }
</style>