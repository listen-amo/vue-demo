<style lang="scss">
	.home{
		.home_recommend{
			.recommend_title{
				padding:20px;
				text-align:center;
				font-size:20px;
				color:#333;
			}
		}
	}
</style>

<template>
<div class="home">
	<div id="testDiv"></div>
	<foodClass></foodClass>
	<div class="home_recommend">
    <span id="testwrap"></span>
		<h3 class="recommend_title">推荐啊</h3>
		<!-- <vFilter
			@select="select"
			@selectNav="selectNav"
			ref="filter"
			v-fixed:66></vFilter> -->
    <vFilter
      @submit="submit_filter"
      @select_nav="selectNav"
      ref="filter"
      v-fixed:66></vFilter>
		<div class="recommend_main">
			<vList></vList>
		</div>
	</div>
</div>	
</template>

<script>
import foodClass from '@C/foodClass/FoodClass'
import vFilter from '@C/filter/Filter'
import vList from '@C/list/List'
export default {
	data(){
		return {
			data:{
  				a:{
  					name:'综合排序',
  					checked:false,
  					checked_item:{},
  					items:[
  						{
  							id:'0',
  							name:'综合排序',
  							checked:false
  						},
  						{
  							id:'1',
  							name:'好评优先',
  							checked:false
  						},
  						{
  							id:'2',
  							name:'销量最高',
  							checked:false
  						},
  						{
  							id:'3',
  							name:'起送价最低',
  							checked:false
  						},
  						{
  							id:'4',
  							name:'配送最快',
  							checked:false
  						},
  						{
  							id:'5',
  							name:'配送费最低',
  							checked:false
  						},
  						{
  							id:'6',
  							name:'从低到高',
  							checked:false
  						},
  						{
  							id:'7',
  							name:'从高到低',
  							checked:false
  						}
  					]
  				},
  				b:{
  					name:'距离最近',
  					checked:false
  				},
  				c:{
  					name:'品质联盟',
  					checked:false
  				},
  				d:{
  					name:'筛选',
  					checked:false,
  					items:[
  						{
  							name:'商家服务(多选)',
  							multipleChoice:true,
  							items:[
  								{
  									icon:'',
  									name:'海鸥专送',
  									id:'a1',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'海鸥专送',
  									id:'a2',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'海鸥专送',
  									id:'a3',
  									checked:false
  								}
  							]
  						},
  						{
  							name:'优惠',
  							items:[
  								{
  									icon:'',
  									name:'新用户优惠',
  									id:'b1',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'特价',
  									id:'b2',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'下单减少',
  									id:'b3',
  									checked:false
  								}
  							]
  						},
  						{
  							name:'人均消费',
  							items:[
  								{
  									icon:'',
  									name:'￥20以下',
  									id:'c1',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'￥20-￥40',
  									id:'c2',
  									checked:false
  								},
  								{
  									icon:'',
  									name:'￥40-￥60',
  									id:'c3',
  									checked:false
  								}
  							]
  						}
  					]
  				}
  			}
		}
	},
	methods:{
		submit_filter(mess){
			console.log(mess);
		},
		selectNav(k){
			// 自动置顶
			console.log(k);
		},
		showSubmenu(name){
			// 控制二级菜单显示隐藏
			this.$refs.filter.setShowName(name);
		}
	},
	mounted(){
		
	},
	computed:{

	},
	components:{
		foodClass,
		vFilter,
		vList
	}
}
</script>