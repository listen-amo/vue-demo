// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import resource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'

Vue.use(resource)
Vue.use(plugin)

// import 'mint-ui/lib/style.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
});

// rem
(function(){
	const BASE_WIDTH = 500;// 1:1 基本宽度
	const BASE_SIZE = 100;// 1:1 等比字体大小
	// var eventType = 'onorientationchange' in window?'orientationchange':'resize';
	var eventType = 'resize';
	var dHtml = document.documentElement;
	var wW = 0;
	setRootFontSize();
	window.addEventListener(eventType,setRootFontSize,false);
	function setRootFontSize(){
		wW = dHtml.clientWidth || document.body.cilentWidth;
		dHtml.style.fontSize = wW/BASE_WIDTH*BASE_SIZE + 'px';
	}
})();

