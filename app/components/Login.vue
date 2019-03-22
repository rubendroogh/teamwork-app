<template>
    <Page>
        <ActionBar title="Login" />
        <GridLayout columns="*" rows="*, auto, *">
            <StackLayout row="1">
                <Label text="Enter your phone number:" />
                <TextField v-model="phonenum" hint="Enter phone number..."/>
                <Button text="Submit" @tap="submit" class="button"/>
                <Button text="Check login" @tap="checkLogin" class="button"/>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const firebase = require("nativescript-plugin-firebase");

    export default {
        data(){
            return {
                phonenum: ''
            }
        },
        mounted(){

        },
        methods: {
            submit(){
                firebase.login({
                    type: firebase.LoginType.PHONE,
                    phoneOptions: {
                        phoneNumber: this.phonenum,
                        verificationPrompt: "The received verification code" // default "Verification code"
                    }
                }).then(
                    function (result) {
                        console.log(result);
                    },
                    function (errorMessage) {
                        console.log(errorMessage);
                    }
                );
            },
            checkLogin(){
                firebase.getCurrentUser().then(user => {console.log(user)})
            }
        }
    }
</script>

<style lang="scss" scoped>
    GridLayout{
        padding: 20;
    }
    .button{
        background-color: gold;
    }
</style>
