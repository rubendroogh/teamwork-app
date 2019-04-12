import Vue from 'nativescript-vue';
import Login from './components/Login.vue';

const firebase = require("nativescript-plugin-firebase");

firebase.init({
  onAuthStateChanged: function(data) {
    Vue.prototype.$loggedIn = data.loggedIn;
  }
}).then(
  () => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

Vue.prototype.$firebase = firebase;

new Vue({
  render: h => h('frame', [h(Login)])
}).$start();
