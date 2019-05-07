<template>
    <ActionBar class="action-bar">
        <StackLayout orientation="horizontal">
            <Label :text="title" class="title" fontSize="20" verticalAlignment="center" />
        </StackLayout>
        <ActionItem @tap="console.log('test')"
            ios.systemIcon="16" ios.position="right"
            text="App instellingen" android.position="popup" />
    </ActionBar>
</template>

<script>
    export default {
        props: [
            'title'
        ],
        data() {
            return {
               
            };
        }
    };
</script>

<style lang="scss" scoped>
    .action-bar{
        height: 40;
        background-color: #fdfdfd;
        color: #000;
    }
    .page-name{
        text-align: center;
        font-size: 22;
    }
</style>