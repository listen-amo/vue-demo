export default {
	namespaced:true,
	state:{
		currentPage:null
	},
	mutations:{
		changePage(state,pageMess){
			state.currentPage = pageMess;
		}
	}
}