<template>
    <Page androidStatusBarBackground="#008FEF">
        <GridLayout class="container" rows="auto, auto, *, auto, auto">
            <Label text="Kies uit contacten" class="title" row="0"/>
            <SearchBar hint="Zoek contacten..." v-model="searchTerm" row="1"/>
            <ScrollView row="2">
                <ListView for="contact in filteredContacts" @itemTap="addContact" separatorColor="transparent">
                    <v-template>
                        <GridLayout columns="*, *" class="single-contact" v-if="!contact.selected">
                            <Label :text="contact.display_name" col="0"/>
                            <Label :text="contact.phone[0].number" col="1" color="#AAA" textAlign="right"/>
                        </GridLayout>
                    </v-template>
                </ListView>
            </ScrollView>
            <ListView class="selected-list" height="140" for="contact in selectedContacts" separatorColor="transparent" @itemTap="removeContact" v-if="selectedContacts.length !== 0" row="3">
                <v-template>
                    <GridLayout columns="*, auto" class="single-contact">
                        <Label :text="contact.display_name" col="0"/>
                        <Label v-if="contact.selected" text="✔" col="1" paddingRight="10"/>
                    </GridLayout>
                </v-template>
            </ListView>
            <Button text="Voeg toe" @tap="$modal.close(selectedContacts)" row="4"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    const Contacts = require("nativescript-contacts-lite")

    export default {
        data() {
            return {
                searchTerm: '',
                contacts: [],
                selectedContacts: []
            }
        },
        mounted() {
            let desiredFields = ['display_name','phone']
                
            Contacts.getContacts(desiredFields).then((result) => {
                this.contacts = result.map(result => {
                    result.selected = false
                    return result
                })
            }, (e) => { console.dir(e) })
        },
        methods: {
            addContact(result) {
                // get index to add value to show it's been selected
                let contact = result.item
                console.dir(contact)
                if(!contact.selected) {
                    if(this.searchTerm === '') {
                        this.contacts[result.index].selected = true
                    } else {
                        this.filteredContacts[result.index].selected = true
                    }
                    this.selectedContacts.push(contact)
                }
            }
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
        border-top-width: 1;
        border-top-color: #F0F0F0;
        padding: 10 0 10 20;
    }
    .selected-list{
        height: 160;
        border-top-width: 2;
        padding-top: 10;
    }
</style>
