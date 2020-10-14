import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";

// Using Icons
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// Using Number formatter
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.filter('numFormat', numFormat(numeral));

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount("#app");
