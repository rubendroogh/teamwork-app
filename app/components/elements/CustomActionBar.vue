<template>
    <ActionBar class="action-bar">
        <NavigationButton text="Go back" v-if="!noBack" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        <StackLayout orientation="horizontal">
            <Label :text="title" class="title" fontSize="20" verticalAlignment="center" margin="0"/>
        </StackLayout>
        <ActionItem ios.systemIcon="16" ios.position="right"
            text="App instellingen" android.position="popup" />
    </ActionBar>
</template>

<script>
    export default {
        props: [
            'title',
            'noBack'
        ]
    }
</script>

<style lang="scss" scoped>
    .action-bar{
        height: 50;
    }
</style>