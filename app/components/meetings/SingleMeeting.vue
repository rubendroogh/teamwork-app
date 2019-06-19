<template>
    <Page>
        <CustomActionBar title="Vergadering inzien"/>
        <Banner :title="meeting.subject" subtitle="Georganiseerd door Ruben" mode="light" image="https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
        <StackLayout class="container">
            <Label class="title" text="Agenda punten"/>
            <Label class="title" text="Voorzitter en notulist"/>
            <Label :text="'Voorzitter: ' + meeting.leader"/>
            <Label :text="'Notulist: ' + meeting.secretary"/>
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
