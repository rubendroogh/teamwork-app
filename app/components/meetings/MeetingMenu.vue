<template>
    <Page>
        <CustomActionBar title="Vergaderingen"/>
        <GridLayout class="container">
            <ScrollView>
                <StackLayout v-if="meetings.length != 0 && loaded">
                    <GridLayout rows="auto, auto, *" v-for="(meeting, key) in meetings" :key="`item-${key}`" columns="auto, *" class="card" @tap="navigateToMeeting(meeting)">
                        <Label row="0" :text="meeting.subject" class="title m-0" margin="0"/>
                        <Label row="1" :text="meeting.startTime | dateTimeFormat" class="subtitle" :textWrap="true"/>
                        <Label col="1" rowSpan="3" text=">" class="text-right vertical-center title"/>
                    </GridLayout>
                </StackLayout>

                <StackLayout v-else-if="meetings.length == 0 && loaded">
                    <Label class="title text-center" text="Er zijn nog geen vergaderingen!"/>
                </StackLayout>

                <StackLayout v-else>
                    <ActivityIndicator class="text-center"/>
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
    import SingleMeeting from './SingleMeeting.vue'
    import MeetingService from '../../services/MeetingService'

    export default {
        data() {
            return {
                meetings: [],
                meetingCreateForm: MeetingCreateForm,
                loaded: false
            }
        },
        mounted() {
            let meetingService = new MeetingService(this.$firebase, this.$currentUserService.getTeams()[0])
            meetingService.getAllFromTeam().then( meetings => {
                this.meetings = meetings
                this.loaded = true
            })
        },
        methods: {
            navigateToMeeting(meeting) {
                this.$navigateTo(SingleMeeting, {
                    transitionAndroid: {
                        name: "slide"
                    },
                    props: {
                        meeting: meeting
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
