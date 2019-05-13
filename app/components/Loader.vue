<template>
    <Page :actionBarHidden="true" androidStatusBarBackground="#008FEF" >
        <Gradient direction="to bottom" colors="#008FEF, #025D9A" >
            <ActivityIndicator busy="true" margin="auto" marginTop="42%" color="#FDFDFD" />
            <Label class="title" color="#FDFDFD" marginTop="10" text="Laden..." />
        </Gradient>
    </Page>
</template>

<script>
    import TeamMenu from './TeamMenu.vue'
    import Login from './Login.vue'

    export default {
        created() {
            this.$firebase.getCurrentUser().then(user => {
                this.$userService.loadWithUid(user.uid, user.phoneNumber).then(() => {
                    this.$navigateTo(TeamMenu, {
                        clearHistory: true,
                        transitionAndroid: {
                            name: "slide"
                        },
                    })
                })
            }).catch(error => {
                console.log(`Error: ${error}`)
                this.$navigateTo(Login, {
                    clearHistory: true,
                    transitionAndroid: {
                        name: "slide"
                    },
                })
            })
        }
    }
</script>

<style>

</style>
