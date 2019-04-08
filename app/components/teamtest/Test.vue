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
                            <Button col="0" text="Zelden" :class="{ selected: statement.score == 1 }" @tap="statement.score = 1" />
                            <Button col="1" text="Soms" :class="{ selected: statement.score == 2 }" @tap="statement.score = 2" />
                            <Button col="2" text="Meestal" :class="{ selected: statement.score == 3 }" @tap="statement.score = 3" />
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
                        text: "Teamleden spreken elkaar aan op tekortkomingen en onproductieve gedragingen.",
                        score: 0,
                        frustration: 4
                    },
                    {
                        text: "Teamleden weten waar hun collega's aan werken en welke positieve bijdrage zij leveren aan het team.",
                        score: 0,
                        frustration: 3
                    },
                    {
                        text: "Teamleden verontschuldigen zich snel en oprecht tegenover elkaar wanneer zij iets zeggen of doen dat ongepast is of het team kan schaden.",
                        score: 0,
                        frustration: 1
                    },
                    {
                        text: "Omwille van het teambelang zijn teamleden bereid hop him afdelingen of de terreinen waarop zij deskundig zijn offers te brengen in termen van budgetten, zeggenschap of het aantal personeelsleden.",
                        score: 0,
                        frustration: 5
                    },
                    {
                        text: "Teamleden geven openlijk hun zwakheden en fouten toe.",
                        score: 0,
                        frustration: 1
                    },
                    {
                        text: "Teamvergaderingen zijn fascinerend en niet vervelend.",
                        score: 0,
                        frustration: 2
                    },
                    {
                        text: "Als teamleden vergaderingen verlaten, vertrouwen zij erop dat collega's zich zonder voorbehoud zullen scharen achter de besluiten waarover overeenstemming wordt bereikt, ook als er aanvankelijk onenigheid heerste.",
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
                        text: "Teamleden maken zich grote zorgen over het vooruitzicht hun collega's af te vallen.",
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

                    results.forEach((value, index) => {
                        this.statements.filter(statement => {
                            return statement.frustration === (index + 1)
                        }).forEach(s => {
                            results[index].score += s.score
                        })
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
    .statement-container{
        padding: 20;
        border: none;

        Label{
            text-align: center;
        }

        .statement-button-container{
            padding-top: 10;
        }
    }

    .to-results{
        margin: 10;
    }

    .selected{
        background-color: red;
    }

    .disabled{
        opacity: .3;
    }
</style>
