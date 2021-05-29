import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/User";
import product from "./modules/Product";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        product
    }
});
