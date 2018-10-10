<style lang="scss">
.menu{
	.menu_recommend{
		margin-top:20px;
		.recommend_title{
			margin-left:15px;
			padding:10px 0;
			font-size:22px;
			font-weidht:700;
		}
		.recommend_view{
			overflow-x:auto;
			overflow-y:hidden;
			&::-webkit-scrollbar{
		        display: none;
		    }
		    &::-moz-scrollbar{
		        display: none;
		    }
			.view_slide{
				.slide_item{
					width:160px;
					margin-left:15px;
					.item_img{
						display:block;
						width:100%;
						border-radius:6px 6px 0 0;
					}
					.item_name{
						margin-top:8px;
						font-size:18px;
					}
					.item_rating{
						margin-top:8px;
						color:#777;
					}
					.item_count{
						justify-content:space-between;
						.count_price{
							font-size:20px;
							line-height:30px;
							color:#FB5050;
							&::before{
								content:'￥';
							}
						}
					}
				}
			}

		}
	}
	.menu_main{
		margin-top:30px;
		// 菜单列表
		.main_class{
			height:100%;
			overflow:auto;
			.class_item{
				position:relative;
				width:100px;
				height:72px;
				display:table;
				overflow:hidden;
				p{
					display:table-cell;
					padding:0 10px;
					vertical-align:middle;
				}
				img,span{
					display:inline-block;
					vertical-align:middle;
				}
				span{
					font-size:16px;
				}
				.item_countClass{
					position:absolute;
					right:0;
					top:0;
					padding:2px 4px;
					color:#fff;
					border-radius:30px;
					background-color:#F34545;
					font-size:12px;
				}
			}
			.class_active{
				font-weight:700;
				background-color:#dfdfdf;
			}
		}
		// 菜单主体内容
		.main_con{
			position:relative;
			height:100%;
			overflow:auto;
			.con_item{
				// 分类标题
				padding:0 10px;
				.item_title{
					line-height:24px;
					.title_main{
						font-size:18px;
						font-weight:600;
					}
					.title_desc{
						color:#999;
					}
				}
				// 商品主要描述
				.item_desc{
					margin-top:20px;
					.desc_img{
						border-radius:4px;
					}
					.desc_main{
						margin-left:10px;
						overflow:hidden;
						flex-grow:1;
						flex-shrink:1;
						&>*{
							margin-top:10px;
						}
						.main_name{
							font-size:20px;
							font-weight:600;
						}
						.main_rating{
							color:#aaa;
						}
						.main_discount{
							color:#F07373;
							.discount_icon{
								padding:0 2px;
								border:1px solid #f1f1f1;
								border-radius:3px;
							}
						}
						.main_btn{
							line-height:33px;
							justify-content:space-between;
							.btn_price{
								color:#F07373;
								span{

								}
								.price{
									font-size:26px;
									// line-height:26px;
									&::before{
										content:'￥';
									}
								}
								.originPrice{
									&::before{
										content:'￥';
									}
									text-decoration:line-through;
									color:#ccc;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>

<template>
  <div class="menu">
  	<!-- 推荐 -->
	<div class="menu_recommend" v-if="recommend">
		<h3 class="recommend_title">{{recommend.name}}</h3>
		<div class="recommend_view">
			<ul class="view_slide flex">
				<li class="slide_item"
					v-for="item in recommend.items">
					<img class="item_img" :src="$formatImgSrc(item.image_path,160,true)">
					<p class="item_name t_ellipsis">{{item.name}}</p>
					<p class="item_rating">
						<span>月售{{item.month_sales}}</span>
						<span>好评率{{item.satisfy_rate}}%</span>
					</p>
					<div class="item_count flex">
						<span class="count_price">{{price(item)}}</span>
						<btnCount :count="hasNum(item)" @click="countFn({item,tid:'recommend'},$event)"></btnCount>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- 菜单列表 -->
	<div class="menu_main flex" ref="menu_main">
		<ul class="main_class">
			<li class="class_item"
				v-for="(item,i) in menu"
				:key="i"
				:class="{class_active:i===menuIndex}"
				@click="menuScroll(i)"
			>
				<p><img v-if="item.icon_url" :src="$formatImgSrc(item.icon_url,18)" alt=""><span>{{item.name}}</span></p>
				<span class="item_countClass" v-if="classCount[rst.id] && classCount[rst.id][item.id]">{{classCount[rst.id][item.id]}}</span>
			</li>
		</ul>
		<!-- 菜单主体 -->
		<div class="main_con grow_shrink">
			<div class="slideWrap">
				<dl class="con_item" v-for="item in menu" :key="item.id">
					<!-- 分类标题 -->
					<dt class="item_title">
						<span class="title_main">{{item.name}}</span>
						<span class="title_desc">{{item.description}}</span>
					</dt>
					<!-- 主体内容 -->
					<dd class="item_desc flex" v-for="food in item.foods" :key="food.item_id">
						<img class="desc_img" :src="$formatImgSrc(food.image_path,128)" alt="">
						<div class="desc_main">
							<h3 class="main_name t_ellipsis">{{food.name}}</h3>
							<p class="main_rating  t_ellipsis">
								<span>月售{{food.month_sales}}份</span>
								<span>好评率{{food.satisfy_rate}}%</span>
							</p>
							<p class="main_discount" v-if="food.activity">
								<span class="discount_icon">{{food.activity.benefit_text}}</span>
								<span>{{food.activity.name}}</span>
							</p>
							<div class="main_btn flex">
								<div class="btn_price">
									<span class="price">{{price(food)}}</span>
									<span class="originPrice" v-if="price(food,'original_price')">{{price(food,'original_price')}}</span>
								</div>
								<btnCount :count="hasNum(food)" @click="countFn({item:food,tid:item.id},$event)"></btnCount>
							</div>
						</div>
					</dd>
				</dl>
			</div>
		</div>
	</div>
  </div>
</template>

<script>

import {mapGetters as mg,mapState as ms} from 'vuex'
import btnCount from '@C/btnCount/BtnCount'

export default {
  data () {
    return {
      menuIndex:0,
      hs:[],
      dMainCon:null,
      topOff:true
    }
  },
  props:{
  	
  },
  methods:{
  	countFn(item,e){
  		var str = 'detail/'+(e?'add':'reduce');
  		this.$store.commit(str,item);
  	},
  	hasNum(item){
  		var res = this.count[item.restaurant_id];
  		var item = res && res[item.item_id];
  		return res && item?item.count:0;
  	},
  	price(item,name){
  		name = name || 'price';
  		var 
  			price,
  			_item = item.specfoods[0][name];
  		if(_item){
	  		price = _item?_item
	  			.toFixed(1)
	  			.replace(/\.0$/,'')
	  			:_item;
	  		return price;
  		}
  	},
  	menuScroll(i){
  		var dMainCon = this.dMainCon,
			dSlideWrap = dMainCon.getElementsByClassName('slideWrap')[0];

			if(this.topOff){
				this.topOff = false;
				this.$top(0,dMainCon);
			}

  		this.scrollOff = false;

  		var
  			offset = 500;
  		var
  			n = 0,
  			nt = 0;
  		var
  			st, et, hasDirection;

			st = this.dMainCon.scrollTop;
			et = this.hs[i];
			hasDirection = st<et;

  		offset *= hasDirection?1:-1;

  		dMainCon.scrollTop = et;
  		dSlideWrap.style.transform = 'translateY('+offset+'px)';
  		dSlideWrap.style.transition = '';
  		this.menuIndex = i;

  		setTimeout(()=>{
  			dSlideWrap.style.transition = '0.5s ease-out';
  			dSlideWrap.style.transform = 'translateY(0px)';
  		},20);

  	}
  },
  watch:{
  	
  },
  computed:{
  	...ms(
  		'detail',
  		[
  			'data',
  			'count',
  			'classCount'
  		]
  	),
  	...mg(
  		'detail',
  		[
  			'recommend',
  			'menu',
  			'rst'
  		]
  	)
  },
  mounted(){
  	var menu_main = this.$refs.menu_main;
  	var
		dMainCon = menu_main.getElementsByClassName('main_con')[0],
		dItems = dMainCon.getElementsByClassName('con_item'),
		dLists = menu_main.getElementsByClassName('class_item'),
		dNav = this.$parent.$refs.detail_nav,
		dShoppingCarH = 0;

  	// 菜单高度设置
	this.$nextTick(()=>{
		dShoppingCarH = getComputedStyle(this.$parent.$el).paddingBottom;
	  	var offset = dNav.offsetHeight + parseFloat(dShoppingCarH);// 导航栏高度 + 购物车高度
		var wh = document.documentElement.clientHeight || document.body.clientHeight;
	  	menu_main.style.height = (wh-offset) + 'px';
	});
  	// 菜单联动
  	(()=>{
  		
  		var
  			hArr = [],
  			len = 0,
  			conTop = 0,
  			index = 0,
  			_index;
  		this.dMainCon = dMainCon;

  		// 滚动序列号获取
  		function scrollIndex(){
  			conTop = dMainCon.scrollTop;
  			for(var i=0,h;h=hArr[i],i<len;i++){
  				if(h>conTop){
  					return i-1;
  				}
  			}
  		}

  		// 获取列表高度
  		// this.$nextTick(()=>{
	  	// 	for(var i=0,d;d=dItems[i++];){
	  	// 		hArr.push(d.offsetTop)
	  	// 	}
	  	// 	len = hArr.length;
	  	// 	this.hs = hArr;
  		// });
  		var off = true;
  		// 滚动监听
  		dMainCon.addEventListener('scroll',()=>{
  			if(off){
  				for(var i=0,d;d=dItems[i++];){
		  			hArr.push(d.offsetTop)
		  		}
		  		len = hArr.length;
		  		this.hs = hArr;
  				off = false;
  			}

			if(index === 0){
				this.$top(0,this.dMainCon);
			}
  			index = scrollIndex();
  			if(_index !== index){
  				this.menuIndex = index;
  				_index = index;
  			}
  		},false);

  	})();
  },
  components:{
	btnCount
  }
}

</script>


