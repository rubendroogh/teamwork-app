<template>
    <Page>
        <ActionBar>
            <StackLayout orientation="horizontal">
                <Label text="Team Test" class="page-title" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <StackLayout class="content">
            <StackLayout v-for="(result, index) in results" :key="index" class="results">
                <Label class="frustration-name" :text="result.text" />
                <Label :text="result.score" />
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
        .frustration-name{
            font-size: 18;
            font-style: italic;
        }

        Label{
            text-align: center;
        }
    }
</style>
