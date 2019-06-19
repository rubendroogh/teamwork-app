<template>
    <Page>
        <CustomActionBar title="Vergadering"/>
        <GridLayout rows="auto, auto, *, auto" columns="*, *, *, *" class="container">

            <Label row="0" colSpan="4" :text="steps[currentStep-1]" class="title text-center"/>
            <StackLayout @tap="changeStep(index + 1)" row="1" :col="index" v-for="(stepName, index) in steps" :key="`item-${index}`">
                <Label :text="index + 1" class="step" :class="{ 'step-active': currentStep == (index + 1) }"/>
                <Label :text="stepName" class="text-center step-title"/>
            </StackLayout>

            <!-- Subject and purpose step -->
            <StackLayout row="2" colSpan="4" v-show="currentStep === 1">
                <Label text="Onderwerp vergadering*" class="subtitle"/>
                <TextField v-model="meeting.subject"/>
                <Label text="Doel vergadering*" class="subtitle"/>
                <TextField v-model="meeting.purpose"/>
            </StackLayout>

            <!-- Roles step -->
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

            <!-- Agenda items step -->
            <GridLayout rows="auto, *, auto, *" row="2" colSpan="4" v-show="currentStep === 3">
                <Label row="0" text="Agenda punten" class="subtitle"/>
                <GridLayout row="1" rows="*, auto" columns="*, auto">
                    <ListView row="0" colSpan="2" for="(item, index) in meeting.agendaItems">
                        <v-template>
                            <GridLayout columns="*, auto">
                                <Label col="0" :text="item.description" class="list-item"/>
                                <Label col="1" text="X" class="list-item" @tap="removeAgendaItem(index)"/>
                            </GridLayout>
                        </v-template>
                    </ListView>
                    <TextField v-model="newAgendaItem" row="1" margin="10"/>
                    <Button text="+" row="1" col="1" @tap="addAgendaItem(newAgendaItem)"/>
                </GridLayout>
                <Label row="2" text="Kies uit selectie" class="subtitle"/>
                <GridLayout row="3" colSpan="2" rows="*, *" columns="*, *">
                    <Button class="button-secondary m-1" text="Safety checks" row="0" col="0" @tap="selectSafetyCheck()"/>
                    <Button class="button-secondary m-1" text="Teamtest" row="0" col="1" @tap="selectSafetyCheck()"/>
                    <Button class="button-secondary m-1" text="Evenementen" row="1" col="0" @tap="selectSafetyCheck()"/>
                </GridLayout>
            </GridLayout>

            <!-- Date and time step -->
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
    import SafetyCheckSelect from '../elements/SafetyCheckSelect'
    import TeamService from '../../services/TeamService'
    import MeetingService from '../../services/MeetingService'

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
                startTime: new Date(),
                newAgendaItem: ''
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
                    this.meeting.leader = this.selectedLeader.name
                    this.meeting.secretary = this.selectedSecretary.name
                }

                this.meeting.startTime = this.calculateStartDateTime()

                const meetingService = new MeetingService(this.$firebase, this.$currentUserService.getTeams()[0])
                meetingService.create(this.meeting).then(meeting => {
                    this.$navigateBack()
                })
            },
            chooseRandomRoles() {
                // random leader and secretary from members array, ensuring they are not the same
                let leaderIndex = Math.floor(Math.random() * this.teamMembers.length)
                let secretaryIndex = Math.floor(Math.random() * this.teamMembers.length)

                while (leaderIndex == secretaryIndex) {
                    secretaryIndex = Math.floor(Math.random() * this.teamMembers.length)
                }

                this.meeting.leader = this.teamMembers[leaderIndex].name
                this.meeting.secretary = this.teamMembers[secretaryIndex].name
            },
            calculateStartDateTime() {
                let startDateTime = this.startDate
                startDateTime.setHours(this.startTime.getHours())
                startDateTime.setMinutes(this.startTime.getMinutes())

                // To UNIX timestamp
                return Math.round(startDateTime.getTime())
            },
            addAgendaItem(description) {
                if (description !== '') {
                    let newItem = {}
                    newItem['description'] = description
                    newItem['addedBy'] = this.$currentUserService.getUserDoc()

                    this.meeting.agendaItems.push(newItem)
                }

                this.newAgendaItem = ''
            },
            removeAgendaItem(index) {
                this.meeting.agendaItems.splice(index, 1)
            },
            selectSafetyCheck() {
                this.$showModal(SafetyCheckSelect).then( check => {
                    let date = new Date(check.createdAt)
                    let agendaDescription = `Safety check: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}: ${date.getHours()}:${date.getMinutes()}`
                    this.addAgendaItem(agendaDescription)
                })
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
