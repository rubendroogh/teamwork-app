import Vue from 'nativescript-vue';
import Login from './components/Login.vue';
import App from './components/App.vue';
import VueDevtools from 'nativescript-vue-devtools';

const firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  onAuthStateChanged: function(data) {
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
  }
}).then(
  () => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

// firebase.getCurrentUser().then(user => {
//   if(user.id){
//     new Vue({
//       render: h => h('frame', [h(App)])
//     }).$start();
//   } else{
    
//   }
// })

new Vue({
  render: h => h('frame', [h(Login)])
}).$start();