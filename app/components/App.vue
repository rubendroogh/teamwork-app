<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Label class="message" :text="msg" col="0" row="0"/>
              <Button text="MyTeam page" @tap="$navigateTo(TeamMenu)" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
  import TeamMenu  from './Team/TeamMenu.vue'

  export default {
    data() {
      return {
        TeamMenu: TeamMenu,
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
