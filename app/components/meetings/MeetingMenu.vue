<template>
    <Page>
        <CustomActionBar title="Vergaderingen"/>
        <GridLayout class="container">
            <ScrollView>
                <StackLayout>
                    <GridLayout rows="auto, auto, *" v-for="(meeting, key) in meetings" :key="`item-${key}`" columns="auto, *" class="card">
                        <Label row="0" :text="meeting.subject" class="title m-0" margin="0"/>
                        <Label row="1" :text="meeting.startTime | dateFormat" class="subtitle" :textWrap="true"/>
                        <Label col="1" rowSpan="3" text=">" class="text-right vertical-center title"/>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <fab
                @tap="$navigateTo(meetingCreateForm)"
                row="1"
                icon="~/assets/images/add-icon.png"
                rippleColor="#f1f1f1"
                class="fab-button"
            ></fab>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import MeetingCreateForm from './MeetingCreateForm.vue'

    export default {
        data() {
            return {
                meetings: [
                    {
                        startTime: 2445664769625,
                        subject: "Eerste coole vergadering."
                    },
                    {
                        startTime: 3445664769625,
                        subject: "Tweede coole vergadering."
                    },
                ],
                meetingCreateForm: MeetingCreateForm
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
