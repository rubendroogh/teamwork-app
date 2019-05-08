const firebase = require("nativescript-plugin-firebase")

import Vue from 'nativescript-vue'
import Login from './components/Login.vue'

import UserService from './classes/UserService'

/* Plugin elements */
Vue.registerElement(
  "Gradient",
  () => require("nativescript-gradient").Gradient
)

/* Custom elements */
import AddMembers from './components/elements/AddMembers.vue'
import CustomActionBar from './components/elements/CustomActionBar.vue'

Vue.component('AddMembers', AddMembers)
Vue.component('CustomActionBar', CustomActionBar)

/* Create empty user service */
Vue.prototype.$userService = new UserService('', '', firebase)

/* Firebase initialization */
Vue.prototype.$firebase = firebase

firebase.init({}).then(
  () => {
    console.log('Firebase initialized')
  },
  error => {
    console.log(`Firebase error: ${error}`)
  }
)

/* Create vue instance to start application */
new Vue({
  render: h => h('frame', [h(Login)])
}).$start()
