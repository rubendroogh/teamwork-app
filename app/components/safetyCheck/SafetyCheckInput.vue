<template>
    <Page>
        <CustomActionBar title="Safety check" />
        <StackLayout class="container">
            <Label text="Hoe veilig voel jij je?" class="title text-center" />
            <Label textWrap="true" class="text text-center">
                <FormattedString>
                    <Span text="Geef hier aan hoeveel je vind dat je jezelf kan uiten binnen je groep. Het invullen van deze check is " />
                    <Span text="anoniem." fontWeight="bold" />
                </FormattedString>
            </Label>
            <Label text="1 is totaal niet, 5 is totaal wel." class="text text-center mb-3" />
            <Button text="5" class="m-1"/>
            <Button text="4" class="m-1"/>
            <Button text="3" class="m-1"/>
            <Button text="2" class="m-1"/>
            <Button text="1" class="m-1"/>
        </StackLayout>
    </Page>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    Button{
        height: 50;
    }
</style>
