import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import paths from './paths'

import vMian from '@C/frame/Frame'
const routes = [
	{
		path:paths.HOME,
		alias: '/',
		component:vMian,
		children:[
			{
				path:paths.HOME,
				component:()=>import('@C/main/Home'),
				meta:{
					title:'首页',
					id:0
				}
			},
			{
				path:paths.DISCOVER,
				component:()=>import('@C/main/Discover'),
				meta:{
					title:'发现',
					id:1
				}
			},
			{
				path:paths.INDENT,
				component:()=>import('@C/main/Indent'),
				meta:{
					title:'订单',
					id:2
				}
			},
			{
				path:paths.MY,
				component:()=>import('@C/main/My'),
				meta:{
					title:'我的',
					id:3
				}
			}
		]
	},
	{
		path:paths.DETAIL,
		redirect:paths.MENU,
		name:paths.DETAIL,
		component:()=>import('@C/detail/Detail'),
		children:[
			{
				path:paths.MENU,
				name:paths.MENU,
				component:()=>import('@C/detail/menu/Menu')
			},
			{
				path:paths.EVALUATE,
				name:paths.EVALUATE,
				component:()=>import('@C/detail/evaluate/Evaluate')
			},
			{
				path:paths.MERCHANT,
				name:paths.MERCHANT,
				component:()=>import('@C/detail/merchant/Merchant')
			}
		]
	}
];

const router = new Router({routes});

router.beforeEach((a,b,next)=>{
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
	next();
});

export default router;
