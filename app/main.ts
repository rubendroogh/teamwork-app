const firebase = require("nativescript-plugin-firebase")

import Vue from 'nativescript-vue'
import Loader from './components/Loader.vue'

import UserService from './services/UserService'

/* Plugin elements */
Vue.registerElement(
  "Gradient",
  () => require("nativescript-gradient").Gradient
)

Vue.registerElement(
  'Fab',
  () => require('nativescript-floatingactionbutton').Fab
)

/* Custom elements */
import AddMembers from './components/elements/AddMembers.vue'
import Banner from './components/elements/Banner.vue'
import Card from './components/elements/Card.vue'
import CardList from './components/elements/CardList.vue'
import ContactSelectList from './components/elements/ContactSelectList.vue'
import CustomActionBar from './components/elements/CustomActionBar.vue'

Vue.component('AddMembers', AddMembers)
Vue.component('Banner', Banner)
Vue.component('Card', Card)
Vue.component('CardList', CardList)
Vue.component('ContactSelectList', ContactSelectList)
Vue.component('CustomActionBar', CustomActionBar)

/* Custom filters */

Vue.filter('dateFormat', function (timestamp) {
  if (!timestamp) return ''
  let date = new Date(timestamp)
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
})

/* Create empty user service */
Vue.prototype.$currentUserService = new UserService('', '', firebase)

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
  render: h => h('frame', [h(Loader)])
}).$start()
