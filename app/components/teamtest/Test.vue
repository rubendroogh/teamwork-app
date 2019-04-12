<template>
    <Page>
        <ActionBar>
            <StackLayout orientation="horizontal">
                <Label text="Team Test" class="page-title" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <GridLayout columns="*" rows="*, auto">
            <ListView row="0" for="statement in statements">
                <v-template>
                    <StackLayout class="statement-container">
                        <Label :textWrap="true" :text="statement.text" />
                        <GridLayout class="statement-button-container" columns="*, *, *" rows="*">
                            <Button col="0" text="Zelden" class="score-button" :class="{ selected: statement.score == 1 }" @tap="statement.score = 1" />
                            <Button col="1" text="Soms" class="score-button" :class="{ selected: statement.score == 2 }" @tap="statement.score = 2" />
                            <Button col="2" text="Meestal" class="score-button" :class="{ selected: statement.score == 3 }" @tap="statement.score = 3" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
            <Button row="1" text="Naar resultaten" @tap="getResultsAndContinue()" :class="{ disabled: !allEntered }" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import Results from './Results.vue'

    export default{
        data(){
            return{
                statements: [
                    {
                        text: "De temleden zijn gepassioneerd en nemen bij zakelijke besprekingen geen blad voor de mond.",
                        score: 0,
                        frustration: 2
                    },
                    {
                        text: "Teamleden spreken elkaar aan op tekortkomingen en onproductief gedrag.",
                        score: 0,
                        frustration: 4
                    },
                    {
                        text: "Teamleden weten waar hun collega's aan werken en welke positieve bijdrage zij leveren aan het team.",
                        score: 0,
                        frustration: 3
                    },
                    {
                        text: "Teamleden verontschuldigen zich snel en oprecht tegenover elkaar wanneer zij iets zeggen of doen dat ongepast is.",
                        score: 0,
                        frustration: 1
                    },
                    {
                        text: "Teamleden zijn bereid offers te maken binnen hun afdelingen voor het teambelang.",
                        score: 0,
                        frustration: 5
                    },
                    {
                        text: "Teamleden geven openlijk en eerlijk hun zwakheden en fouten toe",
                        score: 0,
                        frustration: 1
                    },
                    {
                        text: "Teamvergaderingen zijn interessant en niet vervelend.",
                        score: 0,
                        frustration: 2
                    },
                    {
                        text: "Als teamleden vergaderingen verlaten, vertrouwen zij erop dat collega's achter de besluiten staan waarover overeenstemming is bereikt, ook als er aanvankelijk onenigheid heerste.",
                        score: 0,
                        frustration: 3
                    },
                    {
                        text: "Het niet-realiseren van teamdoelstellingen heeft grote invloed op de motivatie.",
                        score: 0,
                        frustration: 5
                    },
                    {
                        text: "Tijdens teambijeenkomsten worden de belangrijkste en lastigste kwesties aan de orde gesteld.",
                        score: 0,
                        frustration: 2
                    },
                    {
                        text: "Teamleden maken zich grote zorgen over het vooruitzicht hun collega's teleur te stellen.",
                        score: 0,
                        frustration: 4
                    },
                    {
                        text: "Teamleden weten iets van elkaars persoonlijke leven en spreken daar onderling gemakkelijk over.",
                        score: 0,
                        frustration: 1
                    },
                    {
                        text: "De teamleden beëindigen discussies met heldere en specifieke oplossingen en met plannen van aanpak.",
                        score: 0,
                        frustration: 3
                    },
                    {
                        text: "De teamleden dagen elkaar uit aangaande plannen en benaderingen.",
                        score: 0,
                        frustration: 4
                    },
                    {
                        text: "Teamleden zoeken niet gretig naar krediet voor hun eigen bijdragen, maar geven dat wel snel aan anderen.",
                        score: 0,
                        frustration: 5
                    }
                ]
            }
        },
        methods: {
            getResultsAndContinue(){
                if (this.allEntered) {
                    let results = [
                        {
                            text: "Afwezigheid van vertrouwen.",
                            score: 0
                        },
                        {
                            text: "Angst voor conflicten.",
                            score: 0
                        },
                        {
                            text: "Een gebrek aan betrokkenheid.",
                            score: 0
                        },
                        {
                            text: "Vermijden van verantwoordelijkheid.",
                            score: 0
                        },
                        {
                            text: "Verwaarlozing van de resultaten.",
                            score: 0
                        },
                    ]

                    // get all values and put them in the right place
                    results.forEach((value, index) => {
                        // get all statements that fit the frustration
                        this.statements.filter(statement => {
                            return statement.frustration === (index + 1)
                        }).forEach(s => {
                            results[index].score += s.score
                        })
                    })
                    
                    // sort scores
                    results = results.sort((a, b) => {
                        return a.score - b.score
                    })

                    this.$navigateTo(Results, {
                        transitionAndroid: {
                            name: "slide"
                        },
                        props: {
                            results: results,
                        }
                    });
                }
            }
        },
        computed: {
            allEntered() {
                return this.statements.filter(s => {return s.score === 0}).length === 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .score-button{
        background-color: white;
    }
    
    .selected{
        background-color: rgb(158, 154, 219);
    }

    .disabled{
        opacity: .3;
    }
    
    .statement-container{
        padding: 30 20;
        border: none;

        Label{
            text-align: center;
            font-size: 16;
        }

        .statement-button-container{
            padding-top: 10;
        }
    }

    .to-results{
        margin: 10;
    }

</style>
