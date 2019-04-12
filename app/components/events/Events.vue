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
  import EventDetails  from './events/EventDetails.vue'
  import CreateEvent  from './events/CreateEvent.vue'
  import UpdateEvents  from './events/UpdateEvents.vue'

  export default {
    data() {
      return {
        TeamMenu: TeamMenu,
        EventDetails: EventDetails,
        CreateEvent: CreateEvent,
        UpdateEvents: UpdateEvents
      }
    }
  }
</script>

<style scoped>

</style>
