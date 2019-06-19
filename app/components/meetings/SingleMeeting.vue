<template>
    <Page>
        <CustomActionBar title="Vergadering inzien"/>
        <StackLayout class="container-fluid">
            <Banner
                :title="meeting.subject"
                subtitle="Georganiseerd door Ruben"
                mode="dark"
                image="https://images.pexels.com/photos/926987/pexels-photo-926987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <StackLayout class="container">
                <Label class="m-1" :text="meeting.startTime | dateTimeFormat"/>
                <Label class="title mb-1" text="Agenda punten"/>
                <ListView for="item in meeting.agendaItems" height="180">
                    <v-template>
                        <Label class="list-item" :text="item.description"/>
                    </v-template>
                </ListView>
                <Label class="title mb-1" text="Informatie"/>
                <Label class="ml-1" :text="'Voorzitter: ' + meeting.leader"/>
                <Label class="ml-1" :text="'Notulist: ' + meeting.secretary"/>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
    export default {
        props: [
            'meeting'
        ]
    }
</script>

<style lang="scss" scoped>

</style>
