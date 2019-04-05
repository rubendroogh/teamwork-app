<template>
    <Page>
        <ActionBar title="Login" />
        <GridLayout columns="*" rows="*, auto, *">
            <StackLayout row="1">
                <Label text="Enter your phone number:" />
                <TextField v-model="phonenum" hint="Enter phone number..."/>
                <Button text="Submit" @tap="submit" class="button"/>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const firebase = require("nativescript-plugin-firebase");
    import {Telephony} from 'nativescript-telephony';
    import App from './App.vue'

    export default {
        data(){
            return {
                phonenum: '+316'
            }
        },
        mounted(){
            setTimeout(() => {
                this.$firebase.getCurrentUser().then(user => {
                    this.$navigateTo(App)
                }).catch(error => {
                    console.log(`Error: ${error}`)
                    this.getTelephoneNumber()
                })
            }, 10);
        },
        methods: {
            submit(){
                this.$firebase.login({
                    type: firebase.LoginType.PHONE,
                    phoneOptions: {
                        phoneNumber: this.phonenum,
                        verificationPrompt: "The received verification code" // default "Verification code"
                    }
                }).then(
                    result => {
                        this.$navigateTo(App)
                    },
                    errorMessage => {
                        console.log(`Error: ${errorMessage}`)
                        this.$navigateTo(App)
                    }
                );
            },
            getTelephoneNumber(){
                Telephony().then(resolved => {
                    if (resolved.phoneNumber !== "") {
                        this.phoneNumber = resolved.phoneNumber
                    }
                }).catch(error => {
                    console.dir(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    GridLayout{
        padding: 20;
    }
    .button{
        background-color: rgb(77, 209, 226);
    }
</style>
