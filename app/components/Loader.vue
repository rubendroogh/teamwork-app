<template>
    <Page :actionBarHidden="true" androidStatusBarBackground="#008FEF" >
        <Gradient direction="to bottom" colors="#008FEF, #025D9A" >
        </Gradient>
    </Page>
</template>

<script>
    import TeamMenu from './TeamMenu.vue'
    import Login from './Login.vue'

    export default {
        created(){
            this.$firebase.getCurrentUser().then(user => {
                this.$userService.loadWithUid(user.uid).then(currentUser => {
                    this.$navigateTo(TeamMenu)
                })
                
            }).catch(error => {
                console.log(`Error: ${error}`)
                this.$navigateTo(Login)
            })
        }
    }
</script>

<style>

</style>
