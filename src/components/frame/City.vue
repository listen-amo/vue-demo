<style lang="scss">
	.city{
		flex-direction:column;
		position:fixed;
		left:0;
		top:0;
		z-index:40;
		width:100%;
		height:100%;
		background-color:#fff;
		.city_header{
			.header_searchWrap{
				padding:toRem(10px) 0;
				.header_search{
					width:toRem(400px);
					height:toRem(20px);
					margin:0 auto;
					padding:toRem(10px) toRem(20px);
					background-color:#fff;
					align-items:center;
					border-radius:toRem(20px);
					color:#999;
					.search_input{
						width:toRem(380px);
						margin-left:toRem(10px);
						color:#666;
					}
				}
			}
		}

		.city_main{
			flex-direction:column;
			.city_current{
				.current_main{
					padding:toRem(10px);
					font-size:toRem(20px);
				}
			}
			.city_search{
				overflow:auto;
				.search_list{
					li{
						line-height:toRem(40px);
						margin:0 toRem(10px);
						border-bottom:toRem(1px) solid #ddd;
					}
				}
			}
			.city_list{
				
				.mint-indexsection{
					p,li{
						text-indent:toRem(6px);
					}
					li{
						padding:toRem(6px) 0;
						margin:0 toRem(10px);
						font-size:toRem(16px);
						border-bottom:toRem(1px) solid #ddd;
					}
				}
				.mint-indexlist-nav{
					justify-content: start;
					touch-action: none;
				}
				.mint-indexlist-navitem{
					padding:toRem(5px) toRem(6px);
				}
			}
		}
	}
</style>

<template>
<!-- 城市选择 -->
<div class="city flex">
	<vHeader
		title="城市选择"
		class="city_header"
		@back="$emit('back')"
	>
		<div class="header_searchWrap">
			<div class="header_search flex">
				<i class="iconfont icon-sousuo1"></i>
				<input
					type="text"
					class="search_input"
					placeholder="请输入城市名查询"
					v-model="searchStr">
			</div>
		</div>
	</vHeader>
	<div class="city_main flex grow_shrink">
		<div
			class="city_current">
			<div class="current_main">
				当前城市：<span>{{initCity.name}}</span>
			</div>
		</div>
		<div
			v-show="searchStr"
			class="city_search grow_shrink">
			<ul class="search_list">
				<li
					v-for="(item,i) in searchList"
					:key="i"
					@click="$emit('update:select',item)">{{item.name}}</li>
			</ul>
		</div>
		<div
			v-show="!searchStr" 
			class="city_list">
			<mt-index-list v-if="cityList">
				<mt-index-section
					v-for="(initial,k) in cityClassList"
					:index="k"
					:key="k">
					<li
						v-for="(item,i) in initial"
						:key="i"
						@click="$emit('update:select',item)">{{item.name}}</li>
				</mt-index-section>
			</mt-index-list>
			<div v-else>
				未获取到城市列表数据
			</div>
		</div>
	</div>
</div>
</template>

<script>
import vHeader from '@C/frame/Header'
import { IndexList, IndexSection } from 'mint-ui'

export default {
	data(){
		return {
			cityList:null,
			searchStr:''
		}
	},
	computed:{
		cityClassList(){// 序列化 城市列表
			var list = this.cityList;
			if(!list)return null;
			var
				arr,
				obj = {},
				initial = '',
				item_;
			for(var item of list){
				initial = item.pinyin[0].toUpperCase();
				if(initial in obj){
					item_ = obj[initial];
					item_[item_.length] = item;
				}else{
					obj[initial] = [item];
				}
			}
			return obj;
		},
		searchList(){// 城市查询模糊列表 奇怪的bug~~
			var list = this.cityList;
			var searchStr = this.searchStr;
			if(!list && !searchStr)return null;

			var ss = searchStr.replace(/.{0}/g,'.*');

			return list.filter(
				item=>new RegExp(ss,'gi').test(item.label)
			);
		}
	},
	components:{
		vHeader,
		[IndexList.name]:IndexList,
		[IndexSection.name]:IndexSection
	},
	props:{
		initCity:{
			type:Object,
			default(){
				return {
					name:'未选择任何城市'
				}
			}
		}
	},
	mounted(){
		// 获取城市列表
		const api = 'http://120.79.88.237:8080/api/data/cityName.json';

		this.$http.get(api).then(req=>{
			this.cityList = req.body;
		}).catch(err=>{
			console.log(err);
		});
	}
}
</script>