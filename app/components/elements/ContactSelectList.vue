<template>
    <Page>
        <StackLayout class="container" width="600">
            <Label text="Kies uit contacten" class="title" />
            <SearchBar hint="Zoek contacten..." v-model="searchTerm" />
            <ScrollView height="600">
                <ListView for="contact in filteredContacts" @itemTap="$emit('add:contact', contact)">
                    <v-template>
                        <Label :text="contact.display_name" class="single-contact" />
                    </v-template>
                </ListView>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
    const Contacts = require("nativescript-contacts-lite")

    export default {
        data(){
            return{
                searchTerm: '',
                contacts: []
            }
        },
        mounted(){
            let desiredFields = ['display_name','phone']
                
            Contacts.getContacts(desiredFields).then((result) => {
                this.contacts = result
            }, (e) => { console.dir(e) })
        },
        computed: {
            filteredContacts() {
                if (this.searchTerm === '') {
                    return this.contacts
                } else {
                    return this.contacts.filter(contact => {
                        return contact.display_name.toLowerCase().includes(this.searchTerm.toLowerCase())
                    })
                }
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    .single-contact{
        padding: 10 0 10 20;
    }
</style>
