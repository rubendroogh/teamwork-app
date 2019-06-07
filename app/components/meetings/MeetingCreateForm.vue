<template>
    <Page>
        <CustomActionBar title="Vergadering"/>
        <GridLayout rows="auto, auto, *, auto" columns="*, *, *, *" class="container">
            <Label row="0" colSpan="4" :text="steps[currentStep-1]" class="title text-center"/>
            <StackLayout @tap="currentStep = (index + 1)" row="1" :col="index" v-for="(stepName, index) in steps" :key="`item-${index}`">
                <Label :text="index + 1" class="step" :class="{ 'step-active': currentStep == (index + 1) }"/>
                <Label :text="stepName" class="text-center step-title"/>
            </StackLayout>

            <StackLayout row="2" colSpan="4" v-if="currentStep == 1">
                <Label text="Onderwerp vergadering*" class="subtitle"/>
                <TextField/>
                <Label text="Doel vergadering*" class="subtitle"/>
                <TextField/>
            </StackLayout>

            <ScrollView row="2" colSpan="4" v-if="currentStep == 2">
                <GridLayout rows="auto, auto" columns="*, *, *, *">
                    <Label colSpan="3" text="Willekeurige voorzitter en notulist?" class="subtitle" height="18"/>
                    <Switch col="3" v-model="randomRoles" class="mb-3"/>
                    <StackLayout v-if="!randomRoles"  row="1" col="0" colSpan="2">
                        <Label text="Voorzitter" class="subtitle text-center"/>
                        <ListPicker :items="steps" v-model="selectedItem"/>
                    </StackLayout>
                    <StackLayout v-if="!randomRoles"  row="1" col="2" colSpan="2">
                        <Label text="Notulist" class="subtitle text-center"/>
                        <ListPicker :items="steps" v-model="selectedItem"/>
                    </StackLayout>
                </GridLayout>
            </ScrollView>

            <Button row="3" colSpan="4" text="Volgende stap" @tap="currentStep += 1"/>
        </GridLayout>
    </Page>
</template>

<script>
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
                teamMembers: []
            }
        },
        mounted() {
            console.dir(this.$currentUserService.getTeams()[0])
            // this.teamMembers
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
