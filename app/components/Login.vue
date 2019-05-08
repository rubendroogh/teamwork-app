<template>
    <Page :actionBarHidden="true" >
        <GridLayout columns="*" rows="80, auto, 80, auto, auto, *, auto">
            <Image src="~/assets/images/logo.png" row="1" />
            <Label :textWrap="true" class="hint" text="Voer je telefoonnummer in om een account aan te maken." row="3"/>
            <TextField v-model="phonenum" hint="Enter phone number..." row="4"/>
            <Button text="Verstuur code" @tap="submit" class="button" row="6"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import {Telephony} from 'nativescript-telephony'
    import TeamMenu from './TeamMenu.vue'
    import RegisterName from './RegisterName.vue'

    export default {
        data(){
            return {
                phonenum: '+31636572279'
            }
        },
        mounted(){
            this.$firebase.getCurrentUser().then(user => {
                this.$userService.loadWithUid(user.uid)
                this.$navigateTo(TeamMenu)
            }).catch(error => {
                console.log(`Error: ${error}`)
                this.getTelephoneNumber()
            })
        },
        methods: {
            submit(){
                this.$firebase.login({
                    type: this.$firebase.LoginType.PHONE,
                    phoneOptions: {
                        phoneNumber: this.phonenum,
                        verificationPrompt: "The received verification code" // default "Verification code"
                    }
                }).then(
                    result => {
                        this.$navigateTo(RegisterName)
                    },
                    errorMessage => {
                        console.log(`Error: ${errorMessage}`)
                        this.$navigateTo(RegisterName)
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
    .hint{
        text-align: center;
        padding: 30 0 15;
    }
    .button{
        background-color: #3498DB;
        color: white;
    }
</style>
