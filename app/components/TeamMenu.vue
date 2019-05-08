<template>
    <Page androidStatusBarBackground="#008FEF">
        <CustomActionBar :title="currentTeam.name ? currentTeam.name : 'Team Menu'"/>
        <GridLayout v-if="hasTeam" columns="*,*" rows="*" class="container" verticalAlignment="top">
            <StackLayout col="0" >
                <Gradient direction="to bottom" colors="#2DA9EE, #328C98" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Mijn team" />
                </Gradient>
                <Gradient direction="to bottom" colors="#E96092, #EC1060" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Events" />
                </Gradient>
                <Gradient direction="to bottom" colors="#9D50BB, #6E48AA" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Team handleiding" />
                </Gradient>
                <Gradient direction="to bottom" colors="#00C6FF, #0072FF" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(teamTestIntroduction)" >
                    <Label class="card-title" text="Links"/>
                </Gradient>
            </StackLayout>
            <StackLayout col="1">
                <Gradient direction="to bottom" colors="#F2C94C, #F2994A" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(safetyCheckIntroduction)" >
                    <Label class="card-title" text="Team test" />
                </Gradient>
                <Gradient direction="to bottom" colors="#84D258, #6AA549" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(safetyCheckIntroduction)" >
                    <Label class="card-title" text="Vergaderingen" />
                </Gradient>
                <Gradient direction="to bottom" colors="#FF9068, #FF4B1F" height="100" borderRadius="10" padding="10" margin="5" @tap="$navigateTo(safetyCheckIntroduction)" >
                    <Label class="card-title" text="Safety check" />
                </Gradient>
            </StackLayout>  
        </GridLayout>
        <GridLayout v-else class="container" rows="*, auto, *, auto">
            <Label row="1" class="empty-message" text="He, je zit nog niet in een team!" />
            <Button row="3" text="Maak team" @tap="$navigateTo(createTeam)" />
        </GridLayout>
    </Page>
</template>

<script>
    import TestIntroduction from './teamTest/Introduction.vue'
    import CheckIntroduction from './safetyCheck/Introduction.vue'
    import CreateTeam from './teamAdmin/CreateTeam.vue'

    export default {
        data() {
            return {
                teamTestIntroduction: TestIntroduction,
                safetyCheckIntroduction: CheckIntroduction,
                createTeam: CreateTeam,
                hasTeam: false,
                currentTeam: {
                    id: '',
                    name: ''
                }
            };
        },
        created(){
            // Check if team exists
            if(this.$userService.getTeams().length > 0) {
                this.hasTeam = true
                this.$userService.getTeams()[0].get().then(doc => {
                    this.currentTeam = doc.data()
                })
            }
        }
    };
</script>

<style scoped>
    .empty-message{
        text-align: center;
    }
</style>