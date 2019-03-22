<template>
    <Page class="page">
      <ActionBar title="Teamwork!" class="action-bar"/>
      <GridLayout columns="*" rows="*, *, *">
          <Label class="message" :text="msg" col="0" row="0"/>
          <TextField v-model="name" col="0" row="1"/>
          <Button text="Save" @tap="saveData" col="0" row="2"/>
      </GridLayout>
    </Page>
</template>

<script lang="ts">
  const firebase = require("nativescript-plugin-firebase/app");

  export default {
    data() {
      return {
        msg: 'Vul je ellende in!',
        name: '',
        users: {}
      }
    },
    mounted(){
      firebase.initializeApp({
        persist: true
      });

      this.users = firebase.firestore().collection("users");
    },
    methods: {
      saveData(){
        this.users.add({
          id: 69,
          name: this.name
        }).then(ref => {
          console.log(ref.id)
        })
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
