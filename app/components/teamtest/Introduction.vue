<template>
    <Page>
        <CustomActionBar title="Team test" />
        <GridLayout class="container" columns="*" rows="auto, auto, *, auto, auto">
            <Label row="0" class="page-text" :textWrap="true" text="Wat gaat er goed, en wat gaat er minder goed in het team? Gebruik deze test om erachter te komen!" />
            <Label row="1" class="page-text" :textWrap="true" text="Geef per uitspraak aan in hoeverre het van toepassing is op jouw groep. Het is belangrijk om de uitspraken eerlijk te beantwoorden en er niet te lang over na te denken." />
            <Label row="3" class="page-text italic" :textWrap="true" text="De test bestaat uit 15 uitspraken en duurt ongeveer 5 minuten." />
            <Button row="4" text="Start test" @tap="$navigateTo(testComponent)" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import Test from './Test.vue'

    export default{
        data(){
            return {
                testComponent: Test
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
