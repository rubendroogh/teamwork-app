<template>
    <GridLayout height="400" columns="*, 50, 50" rows="auto, *, auto">
        <Label class="title" text="Voeg teamleden toe" colSpan="3" />
        <ListView for="member in members" @itemTap="onItemTap" colSpan="3" row="1">
            <v-template>
                <Label class="member-list-item" :text="member.name" />
            </v-template>
        </ListView>
        <TextField v-model="newNumber" hint="Tel. nr" row="2" />
        <Button class="small-button" text="c" row="2" col="1" @add:contact="addFromContacts($event)" @tap="openContactsList()" />
        <Button class="small-button" text="+" row="2" col="2" @tap="addMember(newNumber)" />
    </GridLayout>
</template>

<script lang="ts">
    const dialogs = require("tns-core-modules/ui/dialogs")

    import ContactSelectList from './ContactSelectList.vue'

    export default {
        data(){
            return{
                members: [],
                newNumber: '',
            }
        },
        mounted(){
            // Add current user to list
            this.members.push({
                uid: this.$userService.getUid(),
                name: this.$userService.getName()
            })
            console.log(this.memberUids)
        },
        methods: {
            openContactsList() {
                this.$showModal(ContactSelectList)
            },
            addFromContacts(contact) {
                // check of het bestaat of niet
                // anders icoontje weergeven van uitnodigen
                console.log('Contact:')
                console.dir(contact)
            },
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
                                resolve(doc)
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
</style>
