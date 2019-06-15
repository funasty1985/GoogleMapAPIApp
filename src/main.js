import Vue from 'vue'
import App from './App.vue'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places',
  },
})


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
