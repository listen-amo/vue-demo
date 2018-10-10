<style lang="scss">
#frame{
	padding-bottom:toRem(68px);
}
	.header{
		position:relative;
		z-index:130;
	}
	.home_header{
		position:relative;
		z-index:120;
	}
	.home_title{
		padding:0 toRem(20px);
		line-height:toRem(60px);
		font-weight:700;
		font-size:toRem(22px);
		color:#fff;
		// 标题
		.title_content{
			align-items:center;
			.content_main{
				position:relative;
				max-width:toRem(240px);
			}
			&::after{
				content:'';
				border:toRem(5px) solid transparent;
				border-top-color:#fff;
			}
		}
		.icon-location{
			font-size:100%;
		}
	}
	.home_searchWrap{
		padding:toRem(10px) toRem(20px);
		background-image: linear-gradient(90deg,#53AFFC,#1C65FF);
		.home_search{
			width:toRem(460px);
			background-color:#fff;
			justify-content:center;
			font-size:toRem(20px);
			line-height:toRem(46px);
			color:#666;
			.icon-sousuo1{
				margin-right:toRem(10px);
			}
		}
	}
	// 收货地址
	.site{
		position:fixed;
		left:0;
		top:0;
		z-index:130;
		width:100%;
		height:100%;
		background-color:#f8f8f8;
		.title_name,
		.site_add{
			font-weight:normal;
		}
		.site_add{
			position:absolute;
			right:toRem(20px);
			top:0;
			font-size:toRem(20px);
			color:#fff;
		}
		.site_search{
			padding:toRem(20px);
			color:#333;
			background-color:#fff;
			.search_current{
				position:relative;
				padding-right:toRem(24px);
				font-weight:normal;
				font-size:toRem(16px);
				line-height:toRem(50px);
				&::after{
					content:'';
					position:absolute;
					right:0;
					top:50%;
					margin-top:-toRem(2px);
					width:0;
					height:0;
					border:toRem(4px) solid transparent;
					border-top-color:#333;
				}
			}
			.search_con{
				margin-left:toRem(20px);
				padding:toRem(10px) toRem(15px);
				background-color:#f8f8f8;
				align-items:center;
				.con_input{
					width:toRem(326px);
					height:toRem(30px);
					margin-left:toRem(10px);
					color:#666;
					font-size:toRem(20px);
				}
			}
		}
	}
	#frame .city{
		z-index:140;
	}
	// 收货地址动画
	.site-enter-active,
	.site-leave-active{
		transition:0.5s;
	}
	.site-enter,.site-leave-to{
		left:100%;
	}
	
</style>

<template>
<div id="frame">
	<!-- 首页头部 -->
	<div
		class="home_header"
		v-show="isHome"
	>
		<!-- 首页头部 -->
		<vHeader>
			<div
				slot="title"
				class="home_title">
				<div
					class="title_content flex"
					@click="site_show = true;county_searchStr = '';">
					<i class="iconfont icon-location"></i><span class="content_main t_ellipsis">{{site.city.name}}</span>
				</div>
			</div>
			<div class="home_searchWrap" v-fixed>
				<div class="home_search flex">
					<i class="iconfont icon-sousuo1"></i>搜索一下饿不饿商家
				</div>
			</div>
		</vHeader>
		<!-- 收货地址选择 -->
		<transition name="site">
		<div class="site" v-show="site_show">
			<vHeader
				class="site_header"
				title="选择收货地址"
				@back="site_show = false"
			>
				<span
					slot="title_right"
					class="site_add"
				>新增地址</span>
			</vHeader>
			<div class="site_search flex">
				<div
					class="search_current"
					@click="city_show = true">{{city.name}}</div>
				<div class="search_con flex">
					<i class="iconfont icon-sousuo1"></i>
					<input
						type="text"
						class="con_input"
						placeholder="请输入收货地址"
						v-model="county_searchStr">
				</div>
			</div>
			<div class="site_con">
				{{site.county}}
			</div>
		</div>
		</transition>
		<!-- 城市选择 -->
		<vCity
			class="city"
			@update:select="siteSelect"
			@back="backCity"
			:initCity="city"
			v-show="city_show">
		</vCity>
	</div>
	<!-- 分页头部 -->
	<vHeader
		class="header"
		v-show="!isHome"
		@back="back"
		:title="title"
	></vHeader>
	<!-- 主体 -->
	<router-view></router-view>
	<!-- 工具栏 -->
	<vToolbar @update:tab="tab" :index="index"></vToolbar>
</div>	
</template>

<script>

import vHeader from '@C/frame/Header'
import vToolbar from '@C/frame/Toolbar'
import vCity from './City'


import paths from '@R/paths'





export default {
	data(){
		var meta = this.$route.meta;
		return {
			title:meta.title,
			index:meta.id,
			pathsArr:[
				paths.HOME,
				paths.DISCOVER,
				paths.INDENT,
				paths.MY
			],
			site_show:false,
			county_searchStr:'',
			city:{name:'未选取城市'},
			city_show:false
		}
	},
	methods:{
		tab(item){
			this.$router.push( this.pathsArr[item.id] );
		},
		back(){
			this.$router.go(-1);
		},
		siteSelect(city){
			this.city = city;
			localStorage.setItem('city',JSON.stringify(city) );
			this.backCity();
		},
		backCity(){
			this.city_show = false;
		}
		
	},
	computed:{
		isHome(){
			var reg = /^(\/home(\?|\/)?|\/$)/;
			var path = this.$route.path;
			return reg.test(path);
		},
		site(){
			return {
				city:this.city,
				county:this.county_searchStr
			}
		}
	},
	components:{
		vHeader,
		vToolbar,
		vCity
	},
	mounted(){
		// 路由切换设置
		document.title = '饿不饿'
		this.$router.beforeEach((to,from,next)=>{
			var meta = to.meta;
			meta.title && (document.title = this.title = meta.title);
			this.index = meta.id;
			next();
		});
		// 初始化城市获取
		var city = localStorage.getItem('city');
		if(city){
			this.city = JSON.parse(city);
		}else{
			this.site_show = true;
		}
	}
}
</script>