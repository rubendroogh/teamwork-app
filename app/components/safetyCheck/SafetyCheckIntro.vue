<template>
    <Page>
        <CustomActionBar title="Safety check" />
        <GridLayout class="container" columns="*" rows="auto, auto, auto, auto, *, auto">
            
            <Label row="0" class="title text-center" :textWrap="true" text="Safety check" />
            <Label row="1" class="text text-center" :textWrap="true" text="Met de safety check kan je anoniem controleren of mensen in de groep zich op zijn/haar gemak voelen en zich vrij kunnen uitspreken." />
            <Label row="2" class="text text-center" :textWrap="true" text="Wanneer op “Start check” wordt gedrukt krijgt ieder van de groep en keuze van een tot vijf. Vijf is hierbij helemaal veilig, en een totaal niet. Deze scores zijn volledig anoniem." />
            <Label row="3" class="text text-center" :textWrap="true" text="Wanneer scores als een of twee worden gegeven, is het aan te raden om te kijken of de zaken voor iedereen wel goed verlopen." />
            <Button class="button" row="5" text="Start check" @tap="startCheck()" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import SafetyCheckService from '../../services/SafetyCheckService'  
    import SafetyCheckInput from "./SafetyCheckInput"

    export default{
        methods: {
            startCheck() {
                let safetyCheckService = new SafetyCheckService(this.$firebase, this.$currentUserService.getTeams()[0])
                safetyCheckService.addToTeam()
                this.$navigateTo(SafetyCheckInput)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .text{
        margin: 20;
    }
</style>