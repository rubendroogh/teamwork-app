<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Label class="message" text="Events list" col="0" row="0"/>
         
        </GridLayout>
    </Page>
</template>

<script lang="ts">
  import TeamMenu  from './Team/TeamMenu.vue'
  import Events  from './events/Events.vue'

  export default {
    data() {
      return {
        TeamMenu: TeamMenu,
        vents: Events
      }
    }
  }
</script>

<style scoped>

</style>
