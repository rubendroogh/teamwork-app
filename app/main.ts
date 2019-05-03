import Vue from 'nativescript-vue'
import Login from './components/Login.vue'

import UserService from './classes/UserService'

/* Custom Elements */
import CustomActionBar from './components/elements/CustomActionBar.vue'

Vue.component('CustomActionBar', CustomActionBar)

/* Firebase Authentication */
const firebase = require("nativescript-plugin-firebase");

firebase.init({
  onAuthStateChanged: data => {
    Vue.prototype.$loggedIn = data.loggedIn
    
    if (data.loggedIn){
      const userService = new UserService(data.user.uid, firebase)
      Vue.prototype.$user = userService
    }
  }
}).then(
  () => {
    console.log("firebase.init done")
  },
  error => {
    console.log(`firebase.init error: ${error}`)
  }
);

Vue.prototype.$firebase = firebase

new Vue({
  render: h => h('frame', [h(Login)])
}).$start();
