<template>
    <Page class="page">
        <ActionBar title="My Team" class="action-bar" />
        <GridLayout columns="*,*" rows="*" width="*" height="*" margin="20"
            verticalAlignment="top">
            <StackLayout col="0" >
                <Label text="Deelnemers" class="card"
                    backgroundColor="#C70039" height="150" @tap="$navigateTo(Members)"/>
                <Label text="Tests" class="card"
                    backgroundColor="#19564c" height="180" @tap="$navigateTo(Tests)" />
                <Label text="Events" class="card"
                    backgroundColor="#f3814d" height="180" @tap="$navigateTo(Events)" />
            </StackLayout>
            <StackLayout col="1">
                <Label text="Safety check" class="card"
                    backgroundColor="#006080" height="180" @tap="$navigateTo(SafetyChecks )" />
                <Label text="Tips & Tricks" class="card"
                    backgroundColor="#f7c741" height="150" @tap="$navigateTo(Tips)" />
                <Label text="links" class="card"
                    backgroundColor="#77c9f8" height="180" @tap="$navigateTo(Links)" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {};
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