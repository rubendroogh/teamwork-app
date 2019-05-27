<template>
    <Page>
        <CustomActionBar title="Safety check" />
        <GridLayout class="container-fluid" rows="auto, *, auto">
            <Banner row="0" mode="light" text="Huidige safety check" image="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
            <CardList row="1" rowSpan="2" :items="prevSafetyChecks" />
            <fab
                @tap="$navigateTo()"
                row="2"
                icon="~/assets/images/add-icon.png"
                rippleColor="#f1f1f1"
                class="fab-button"
            ></fab>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import SafetyCheckService from '../../services/SafetyCheckService'

    export default{
        data() {
            return {
                prevSafetyChecks: []
            }
        },
        mounted() {
            let safetyCheckService = new SafetyCheckService(this.$firebase, this.$currentUserService.getTeams()[0])
            safetyCheckService.getAllFromTeam().then(checks => {
                this.prevSafetyChecks = checks.map(check => {
                    let rCheck = {}
                    rCheck['title'] = new Date(check.createdAt).toLocaleDateString("nl-NL")
                    return rCheck
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
