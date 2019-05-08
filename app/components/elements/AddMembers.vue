<template>
    <GridLayout height="400" columns="*, 50" rows="auto, *, auto">
        <Label class="title" text="Voeg teamleden toe" colSpan="2" />
        <ListView for="member in members" @itemTap="onItemTap" colSpan="2" row="1">
            <v-template>
                <Label class="member-list-item" :text="member.name" />
            </v-template>
        </ListView>
        <TextField v-model="newNumber" hint="Tel. nr" row="2" />
        <Button text="+" row="2" col="2" @tap="addMember()" />
    </GridLayout>
</template>

<script lang="ts">
    const dialogs = require("tns-core-modules/ui/dialogs")
    import UserService from '../../classes/UserService'
    import TeamService from '../../classes/TeamService'

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
            addMember(){
                // Check if user exists
                // Get UID and name by number if they do
                const userCollection = this.$firebase.firestore.collection('users')

                const query = userCollection
                    .where("number", "==", this.newNumber)

                query.get()
                    .then(querySnapshot => {
                        console.dir(querySnapshot.docs)
                        if(querySnapshot.docs.length == 0) {
                            dialogs.alert({
                                title: "Let op!",
                                message: "Dit is niet een nummer dat wij herkennen. Probeer het nog eens.",
                                okButtonText: "Ok"
                            })
                        }
                        // TODO: add check for duplication
                        querySnapshot.forEach(doc => {
                            if(doc.exists) {
                                this.members.push({
                                    uid: doc.id,
                                    name: doc.data().name
                                })
                            }
                    })
                })
            }
        },
        computed: {
            memberUids: function() {
                let uids = this.members.map(user => user.uid)
                // according to vue.js convention
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
</style>
