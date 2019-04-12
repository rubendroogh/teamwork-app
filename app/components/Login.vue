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
    const firebase = require("nativescript-plugin-firebase")
    import {Telephony} from 'nativescript-telephony'
    import TeamMenu from './Team/TeamMenu.vue'

    export default {
        data(){
            return {
                phonenum: '+31636572279'
            }
        },
        mounted(){
            setTimeout(() => {
                this.$firebase.getCurrentUser().then(user => {
                    this.$navigateTo(TeamMenu)
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
                        this.$navigateTo(TeamMenu)
                    },
                    errorMessage => {
                        console.log(`Error: ${errorMessage}`)
                        this.$navigateTo(TeamMenu)
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
