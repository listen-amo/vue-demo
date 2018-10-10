import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from './main'
import detail from './detail'

const state = {

}

const mutations = {

}

const store = new Vuex.Store({
	state,
	mutations,
	modules:{
		main,
		detail
	}
});

export default store;