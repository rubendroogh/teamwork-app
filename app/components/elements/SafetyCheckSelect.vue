<template>
    <Page>
        <ListView for="check in safetyChecks">
            <v-template>
                <Label class="list-item" :text="check.createdAt | dateFormat" @tap="$modal.close(check)"/>
            </v-template>
        </ListView>
    </Page>
</template>

<script lang="ts">
    import SafetyCheckService from "../../services/SafetyCheckService"

    export default {
        data() {
            return {
                safetyChecks: []
            }
        },
        mounted() {
            let safetyCheckService = new SafetyCheckService(this.$firebase, this.$currentUserService.getTeams()[0])
            safetyCheckService.getAllFromTeam().then( checks => {
                this.safetyChecks = checks
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>
