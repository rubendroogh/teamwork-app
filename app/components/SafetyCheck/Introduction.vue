<template>
    <Page>
        <CustomActionBar title="Safety check" />
        <GridLayout class="container" columns="*" rows="auto, auto, auto, *, auto">
            <Label row="0" class="page-text" :textWrap="true" text="Met de safety check kan je anoniem controleren of mensen in de groep zich op zijn/haar gemak voelen en zich vrij kunnen uitspreken." />
            <Label row="1" class="page-text" :textWrap="true" text="Wanneer op “Start check” wordt gedrukt krijgt ieder van de groep en keuze van een tot vijf. Vijf is hierbij helemaal veilig, en een totaal niet. Deze scores zijn volledig anoniem." />
            <Label row="2" class="page-text" :textWrap="true" text="Wanneer scores als een of twee worden gegeven, is het aan te raden om te kijken of de zaken voor iedereen wel goed verlopen." />
            <Button row="4" text="Start check" @tap="$navigateTo(checkComponent)" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import SafetyCheckLeader from './SafetyCheckLeader.vue'

    export default{
        data(){
            return {
                checkComponent: SafetyCheckLeader
            }
        },
    }
</script>

<style lang="scss" scoped>
    .page-text{
        margin: 10;
        text-align: center;
    }
</style>
