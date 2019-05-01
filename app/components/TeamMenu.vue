<template>
    <Page>
        <ActionBar title="My Team"/>
        <GridLayout columns="*,*" rows="*" width="*" height="*" margin="20"
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
    </Page>
</template>

<script>
    import TestIntroduction from './TeamTest/Introduction.vue'
    import CheckIntroduction from './SafetyCheck/Introduction.vue'

    export default {
        data() {
            return {
                teamTestIntroduction: TestIntroduction,
                safetyCheckIntroduction: CheckIntroduction
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
        font-size:16;
    }
</style>