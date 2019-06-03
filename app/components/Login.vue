<template>
    <Page :actionBarHidden="true" >
        <GridLayout columns="*" rows="80, auto, 80, auto, auto, *, auto, auto, auto">
            <Image src="~/assets/images/logo.png" marginLeft="30" marginRight="30" row="1" />
            <Label :textWrap="true" class="hint" text="Voer je telefoonnummer in om een account aan te maken of in te loggen." row="3"/>
            <TextField v-model="phonenum" hint="Enter phone number..." row="4"/>
            <ActivityIndicator busy="true" v-if="isLoading" row="6" color="#E34580" />
            <Label text="Wachten op code..." class="title text-center" marginBottom="15" marginTop="5" v-if="isLoading" row="7"/>
            <Button text="Verstuur code" @tap="submit" class="button" row="8"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const dialogs = require("tns-core-modules/ui/dialogs")

    import {Telephony} from 'nativescript-telephony'
    import TeamMenu from './TeamMenu.vue'
    import RegisterName from './RegisterName.vue'

    export default {
        data() {
            return {
                phonenum: '+31636572279',
                isLoading: false
            }
        },
        mounted() {
            this.getTelephoneNumber()
        },
        methods: {
            /**
             * @description Authenticate user with login type of phone.
             */
            submit() {
                this.isLoading = true
                this.$firebase.login({
                    type: this.$firebase.LoginType.PHONE,
                    phoneOptions: {
                        phoneNumber: this.phonenum,
                        verificationPrompt: "The received verification code"
                    }
                }).then(
                    result => {
                        this.isLoading = false
                        this.$currentUserService.loadWithUid(result.uid, result.phoneNumber).then(() => {
                            this.$navigateTo(RegisterName, {
                                clearHistory: true,
                                transitionAndroid: {
                                    name: "slide"
                                },
                            })
                        })
                    },
                    errorMessage => {
                        this.isLoading = false
                        dialogs.alert({
                            title: "Oeps!",
                            message: `Er is iets mis gegaan met het inloggen: ${errorMessage}`,
                            okButtonText: "Oké"
                        })
                    }
                );
            },
            /**
             * @description Get telephone number from device and fill input.
             */
            getTelephoneNumber() {
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
