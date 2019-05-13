<template>
    <GridLayout height="400" columns="*, 40, 50" rows="auto, *, auto">
        <Label class="title" text="Voeg teamleden toe" colSpan="3" />
        <ListView for="member in members" @itemTap="onItemTap" colSpan="3" row="1">
            <v-template>
                <GridLayout columns="*, auto">
                    <Label class="member-list-item" :text="member.name" col="0"/>
                    <Label class="member-list-item" text="!" col="1" v-if="!member.isUser"/>
                </GridLayout>
            </v-template>
        </ListView>
        <TextField class="phone-input" v-model="newNumber" hint="Tel. nr" row="2" />
        <Image class="contacts-button" src="~/assets/images/contacts-icon.png" row="2" col="1" @tap="getContactsList()" />
        <Button class="small-button" text="+" row="2" col="2" @tap="addMember(newNumber)" />
    </GridLayout>
</template>

<script lang="ts">
    const dialogs = require("tns-core-modules/ui/dialogs")

    import ContactSelectList from './ContactSelectList.vue'

    export default {
        data() {
            return{
                members: [],
                newNumber: '',
            }
        },
        mounted() {
            // Add current user to list
            this.members.push({
                uid: this.$userService.getUid(),
                name: this.$userService.getName(),
                isUser: true
            })
            // don't remove this console.log
            console.log(this.memberUids)
        },
        methods: {
            getContactsList() {
                this.$showModal(ContactSelectList, { fullscreen: true }).then(contacts => {
                    contacts.forEach(contact => {
                        this.addFromContacts(contact)
                    })
                })
            },
            addFromContacts(contact) {
                // Check if user exists
                // Else show icon of invite user to app
                this.getUserByNumber(contact.phone[0].number).then(
                    uid => {
                        this.members.push({
                            uid: uid,
                            name: contact.display_name,
                            isUser: true
                        })
                    },
                    error => {
                        this.members.push({
                            uid: '',
                            name: contact.display_name,
                            isUser: false
                        })
                    }
                )
                
            },
            /**
             * @returns Promise<uid {string}, false>
             */
            getUserByNumber(number) {
                return new Promise((resolve, reject) => {
                    const userCollection = this.$firebase.firestore.collection('users')

                    const query = userCollection
                        .where("number", "==", number)

                    query.get()
                    .then(querySnapshot => {
                        if(querySnapshot.docs.length == 0) {
                            reject(false)
                        }
                        // TODO: add check for duplication
                        querySnapshot.forEach(doc => {
                            if(doc.exists) {
                                resolve(doc.data().uid)
                            }
                            
                        })
                    })
                })
            },
            addMember(newNumber) {
                // Check if user exists
                // Get UID and name by number if they do

                this.getUserByNumber(newNumber).then( doc => {
                    this.members.push({
                        uid: doc.id,
                        name: doc.data().name
                    })
                }, () => {
                    dialogs.alert({
                        title: "Let op!",
                        message: "Dit is niet een nummer dat wij herkennen. Probeer het nog eens.",
                        okButtonText: "Ok"
                    })
                })
            }
        },
        computed: {
            memberUids: function() {
                let uids = this.members.map(user => user.uid)
                this.$emit('members', uids)
                return uids
            }
        }
    }
</script>

<style lang="scss" scoped>
    .member-list-item{
        padding: 20;
    }
    .small-button{
        margin-left: 10;
    }
    .contacts-button{
        height: 40;
        border-width: 1;
        border-color: #A0B4CE;
        border-style: solid;
        border-top-right-radius: 20;
        border-bottom-right-radius: 20;
        border-left-width: 0;
    }
    .phone-input{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right-width: 0;
    }
</style>
