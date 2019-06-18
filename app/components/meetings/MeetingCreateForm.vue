<template>
    <Page>
        <CustomActionBar title="Vergadering"/>
        <GridLayout rows="auto, auto, *, auto" columns="*, *, *, *" class="container">
            <Label row="0" colSpan="4" :text="steps[currentStep-1]" class="title text-center"/>
            <StackLayout @tap="changeStep(index + 1)" row="1" :col="index" v-for="(stepName, index) in steps" :key="`item-${index}`">
                <Label :text="index + 1" class="step" :class="{ 'step-active': currentStep == (index + 1) }"/>
                <Label :text="stepName" class="text-center step-title"/>
            </StackLayout>

            <StackLayout row="2" colSpan="4" v-show="currentStep === 1">
                <Label text="Onderwerp vergadering*" class="subtitle"/>
                <TextField v-model="meeting.subject"/>
                <Label text="Doel vergadering*" class="subtitle"/>
                <TextField v-model="meeting.purpose"/>
            </StackLayout>

            <ScrollView row="2" colSpan="4" v-show="currentStep === 2">
                <GridLayout rows="auto, auto" columns="*, *, *, *">
                    <Label colSpan="3" text="Willekeurige voorzitter en notulist?" class="subtitle" height="18"/>
                    <Switch col="3" v-model="randomRoles" class="mb-3"/>
                    <StackLayout v-if="!randomRoles"  row="1" col="0" colSpan="2">
                        <Label text="Voorzitter" class="subtitle text-center"/>
                        <ListPicker :items="teamMemberNames" v-model="leaderIndex"/>
                    </StackLayout>
                    <StackLayout v-if="!randomRoles"  row="1" col="2" colSpan="2">
                        <Label text="Notulist" class="subtitle text-center"/>
                        <ListPicker :items="teamMemberNames" v-model="secretaryIndex"/>
                    </StackLayout>
                </GridLayout>
            </ScrollView>

            <ScrollView row="2" colSpan="4" v-show="currentStep === 4">
                <StackLayout>
                    <Label text="Datum*" class="subtitle"/>
                    <DatePicker v-model="startDate"/>
                    <Label text="Begintijd*" class="subtitle"/>
                    <TimePicker v-model="startTime"/>
                </StackLayout>
            </ScrollView>

            <Button row="3" colSpan="4" :text="buttonText" @tap="(currentStep < steps.length) ? changeStep(currentStep + 1) : saveMeeting()"/>
        </GridLayout>
    </Page>
</template>

<script>
    import TeamService from '../../services/TeamService'

    export default {
        data() {
            return {
                currentStep: 1,
                steps: [
                    'Vergadering',
                    'Rollen kiezen',
                    'Agenda punten',
                    'Vergaderdatum'
                ],
                randomRoles: false,
                meeting: {
                    startTime: 0,
                    subject: '',
                    purpose: '',
                    leader: {},
                    secretary: {},
                    agendaItems: []
                },
                teamMembers: [],
                teamMemberNames: [],
                leaderIndex: null,
                secretaryIndex: null,
                buttonText: 'Volgende stap',
                startDate: new Date(),
                startTime: new Date()
            }
        },
        mounted() {
            let teamService = new TeamService(this.$firebase)
            teamService.loadWithDocRef(this.$currentUserService.getTeams()[0]).then( () => {
                teamService.getMembers().then( members => {
                    this.teamMembers = members
                    this.teamMemberNames = members.map( member => {
                        return member.name
                    })
                })
            })
        },
        methods: {
            changeStep(newStep) {
                this.currentStep = newStep
                this.buttonText = (this.currentStep == this.steps.length) ? 'Opslaan' : 'Volgende stap'
            },
            saveMeeting() {
                if (this.randomRoles) {
                    this.chooseRandomRoles()
                } else {
                    this.meeting.leader = this.selectedLeader
                    this.meeting.secretary = this.selectedSecretary
                }

                this.meeting.startTime = this.calculateStartDateTime()

                console.log(this.meeting.startTime)
            },
            chooseRandomRoles() {
                // random leader and secretary from members array, ensuring they are not the same
                let leaderIndex = Math.floor(Math.random() * this.teamMembers.length)
                let secretaryIndex = Math.floor(Math.random() * this.teamMembers.length)

                while (leaderIndex == secretaryIndex) {
                    secretaryIndex = Math.floor(Math.random() * this.teamMembers.length)
                }

                this.meeting.leader = this.teamMembers[leaderIndex]
                this.meeting.secretary = this.teamMembers[secretaryIndex]
            },
            calculateStartDateTime() {
                let startDateTime = this.startDate
                startDateTime.setHours(this.startTime.getHours())
                startDateTime.setMinutes(this.startTime.getMinutes())

                return startDateTime
            }
        },
        computed: {
            selectedLeader() {
                return this.teamMembers[leaderIndex]
            },

            selectedSecretary() {
                return this.teamMembers[secretaryIndex]
            }
        }
    }
</script>

<style lang="scss" scoped>
    TextField{
        margin-bottom: 15;
    }

    .step{
        border-radius: 50%;
        width: 40;
        height: 40;
        font-size: 20;
        text-align: center;
        padding: 10;
        margin-bottom: 5;
        font-size: 16;
        background-color: #ddd;
    }

    .step-active{
        border-width: 1;
        border-color: #333;
    }

    .step-title{
        margin-bottom: 15;
        font-size: 10;
    }
</style>
