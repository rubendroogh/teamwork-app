<template>
    <Page>
        <CustomActionBar/>
        <GridLayout v-if="hasTeam" columns="*,*" rows="*" width="*" height="*" margin="20"
            verticalAlignment="top">
            <StackLayout col="0" >
                <Label text="Tests" class="card"
                    backgroundColor="green" height="180" @tap="$navigateTo(teamTestIntroduction)" />
            </StackLayout>
            <StackLayout col="1">
                <Label text="Safety check" class="card"
                    backgroundColor="blue" height="180" @tap="$navigateTo(safetyCheckIntroduction)" />
            </StackLayout>  
        </GridLayout>
        <StackLayout v-else>
            <Label text="Geen team!" />
        </StackLayout>
    </Page>
</template>

<script>
    import CustomActionBar from './elements/CustomActionBar.vue'

    import TestIntroduction from './TeamTest/Introduction.vue'
    import CheckIntroduction from './SafetyCheck/Introduction.vue'

    export default {
        components: {
            CustomActionBar,
        },
        data() {
            return {
                teamTestIntroduction: TestIntroduction,
                safetyCheckIntroduction: CheckIntroduction,
                hasTeam: false
            };
        },
        mounted(){
            // Check if team exists
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
</style>