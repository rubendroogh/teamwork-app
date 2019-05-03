<template>
    <ActionBar class="action-bar">
        <StackLayout orientation="horizontal">
            <Label text="NativeScript" fontSize="24" verticalAlignment="center" />
        </StackLayout>
        <ActionItem @tap="console.log('test')"
            ios.systemIcon="16" ios.position="right"
            text="App instellingen" android.position="popup" />
    </ActionBar>
</template>

<script>
    export default {
        data() {
            return {
               
            };
        }
    };
</script>

<style lang="scss" scoped>
    .action-bar{
        height: 40;
        background-color: #fbfbfb;
        color: #000;
    }
    .page-name{
        text-align: center;
        font-size: 22;
    }
</style>