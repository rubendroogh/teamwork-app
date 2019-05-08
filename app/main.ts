const firebase = require("nativescript-plugin-firebase")

import Vue from 'nativescript-vue'
import Login from './components/Login.vue'

import UserService from './classes/UserService'

/* Custom Elements */
import CustomActionBar from './components/elements/CustomActionBar.vue'

Vue.component('CustomActionBar', CustomActionBar)

/* Create empty user service */
Vue.prototype.$userService = new UserService('', firebase)

/* Firebase Authentication */
Vue.prototype.$firebase = firebase

firebase.init({}).then(
  () => {
    console.log('Firebase initialized')
  },
  error => {
    console.log(`Firebase error: ${error}`)
  }
)
  
new Vue({
  render: h => h('frame', [h(Login)])
}).$start();
  