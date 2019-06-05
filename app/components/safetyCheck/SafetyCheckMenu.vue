<template>
    <Page>
        <CustomActionBar title="Safety check" />
        <StackLayout>
            <Banner
                v-if="activeSafetyCheck"
                mode="light"
                title="Huidige safety check"
                :subtitle="subTitle"
                @tap="navigateToSafetyCheck(activeSafetyCheck.createdAt)"
                :hasButton="true"
                image="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Banner
                v-else
                mode="light"
                title="Er is nog geen safety check gestart"
                image="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <StackLayout v-if="prevSafetyChecks.length == 0" class="container" padding="50%">
                <Label text="Klik op de knop om een safety check te starten" class="subtitle text-center m-3" textWrap="true"/>
                <fab
                    @tap="$navigateTo(safetyCheckIntroComponent)"
                    icon="~/assets/images/add-icon.png"
                    rippleColor="#f1f1f1"
                    class="fab-button fab-center"
                ></fab>
            </StackLayout>
            <GridLayout v-if="prevSafetyChecks.length > 0" rows="auto, *, auto" class="container">
                <Label row="0" text="Uitslagen vorige safety checks" class="subtitle mt-2"/>
                <CardList row="1" rowSpan="2" :items="prevSafetyChecks" />
                <fab
                    @tap="$navigateTo(safetyCheckIntroComponent)"
                    row="2"
                    icon="~/assets/images/add-icon.png"
                    rippleColor="#f1f1f1"
                    class="fab-button"
                ></fab>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
    import SafetyCheckService from '../../services/SafetyCheckService'
    import SafetyCheckIntro from './SafetyCheckIntro'
    import SafetyCheckInput from './SafetyCheckInput'

    export default {
        data() {
            return {
                prevSafetyChecks: [],
                safetyCheckIntroComponent: SafetyCheckIntro,
                activeSafetyCheck: null,
                subTitle: ''
            }
        },
        mounted() {
            let safetyCheckService = new SafetyCheckService(this.$firebase, this.$currentUserService.getTeams()[0])
            safetyCheckService.getAllFromTeam().then(checks => {
                // Filter the active check, format to usable array and reverse.
                this.prevSafetyChecks = checks.filter(check => {
                    return (!check.isActive)
                }).map(check => {
                    let rCheck = {}
                    let date = new Date(check.createdAt)
                    rCheck['title'] = 'Safety Check'
                    rCheck['subTitle'] = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                    rCheck['extra'] = `${check.results.length}/${check.expectedResults}`
                    return rCheck
                }).reverse()
            })
            safetyCheckService.getActive().then(check => {
                this.subTitle = `${check.results.length}/${check.expectedResults} ingevuld`
                this.activeSafetyCheck = check
            })
        },
        methods: {
            navigateToSafetyCheck(timestamp) {
                this.$navigateTo(SafetyCheckInput, {
                    props: {
                        timestamp: timestamp,
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
