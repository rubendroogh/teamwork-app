<template>
    <Page>
        <CustomActionBar title="Team test" />
        <StackLayout class="container">
            <StackLayout v-for="(result, index) in results" :key="index" class="results">
                <Label :textWrap="true" class="frustration-name" :text="result.text" />
                <Label :textWrap="true" v-if="result.score > 7" text="Dit gaat goed zo!" />
                <Label :textWrap="true" v-if="result.score === 6 || result.score === 7" text="Dit zou potentieel een probleem kunnen vormen! Denk hierom." />
                <StackLayout v-if="result.score < 6" class="result-container">
                    <Label text="Dit kan beter aangepakt worden!" />
                    <Button text="Hoe kan ik hier mee omgaan?" />
                </StackLayout>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
    export default{
        props: {
            results: Array
        }
    }
</script>

<style lang="scss" scoped>
    .results{
        padding: 10;
        border-bottom: 1 solid #ccc;

        .frustration-name{
            font-size: 18;
            font-style: italic;
        }

        Label{
            text-align: center;
        }
    }
</style>
