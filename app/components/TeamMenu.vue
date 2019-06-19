<template>
    <Page>
        <CustomActionBar :noBack="true" :title="currentTeam.name ? currentTeam.name : 'Team Menu'"/>
        <GridLayout v-if="hasTeam" columns="*,*" rows="*" class="container" verticalAlignment="top">
            <StackLayout col="0" >
                <!-- <Gradient direction="to bottom" colors="#2DA9EE, #328C98" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Mijn team" />
                    <Image src="~/assets/images/mijn-team-icon.png" class="card-icon" />
                </Gradient> -->
                <Gradient direction="to bottom" colors="#E96092, #EC1060" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Events" />
                    <Image src="~/assets/images/events-icon.png" class="card-icon" />
                </Gradient>
                <Gradient direction="to bottom" colors="#FF9068, #FF4B1F" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(safetyCheckMenu)" >
                    <Label class="card-title" text="Safety check" />
                    <Image src="~/assets/images/safety-check-icon.png" class="card-icon" />
                </Gradient>
            </StackLayout>
            <StackLayout col="1">
                <Gradient direction="to bottom" colors="#F2C94C, #F2994A" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Team test" />
                    <Image src="~/assets/images/team-test-icon.png" class="card-icon" />
                </Gradient>
                <Gradient direction="to bottom" colors="#84D258, #6AA549" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(meetingMenu)" >
                    <Label class="card-title" text="Vergaderingen" />
                    <Image src="~/assets/images/vergaderingen-icon.png" class="card-icon" />
                </Gradient>
            </StackLayout>
        </GridLayout>
        <GridLayout v-else class="container" rows="*, auto, auto, *, auto">
            <Label row="1" text="🏝" class="big-emoji"/>
            <Label row="2" class="empty-message" text="He, je zit nog niet in een team! Je kan zelf één aanmaken, of wachten tot je uitgenodigd wordt." textWrap="true"/>
            <Button row="4" text="Maak team" @tap="$navigateTo(createTeam)" />
        </GridLayout>
    </Page>
</template>

<script>
    import TestIntroduction from './teamTest/Introduction.vue'
    import SafetyCheckMenu from './safetyCheck/SafetyCheckMenu.vue'
    import CreateTeam from './teamAdmin/CreateTeam.vue'
    import MeetingMenu from './meetings/MeetingMenu.vue'

    export default {
        data() {
            return {
                teamTestIntroduction: TestIntroduction,
                safetyCheckMenu: SafetyCheckMenu,
                createTeam: CreateTeam,
                meetingMenu: MeetingMenu,
                hasTeam: false,
                currentTeam: {
                    id: '',
                    name: ''
                }
            };
        },
        created() {
            // Check if team exists
            if(this.$currentUserService.getTeams().length > 0) {
                this.hasTeam = true
                this.$currentUserService.getTeams()[0].get().then(doc => {
                    this.currentTeam = doc.data()
                })
            }
        }
    };
</script>

<style scoped>
    .empty-message{
        text-align: center;
        margin: 0 10;
    }
    .big-emoji{
        text-align: center;
        font-size: 120;
        padding: 0 0 60 0;
    }
</style>