<style lang="scss">
.list-enter-active,
.list-leave-active{
	transition:0.5s;
}
.list-enter,
.list-leave-to{
	transform:translateY(100%);
}
@keyframes car{
	25%{
		transform:scale(0.9);
	}
	50%{
		transform:scale(1);
	}
	75%{
		transform:scale(1.1);
	}
	100%{
		transform:scale(1);
	}
}
.shoppingCarWrapper{
	position:fixed;
	left:0;
	bottom:0;
	width:100%;
	.symbol::before{
		content:'￥';
	}
}
	.shoppingCar{
		position:relative;
		z-index:10;
		justify-content:space-between;
		background-color:rgba(0,0,0,0.5);
		color:#fff;
		
		.car_main{
			.car_icon{
				position:relative;
				width:56px;
				height:56px;
				margin:-10px 0 0 20px;
				background-color:#363636;
				border:6px solid #444;
				line-height:50px;
				color:#5F5F63;
				text-align:center;
				border-radius:50%;
				animation:paused 0.5s;
				.icon_count{
					position:absolute;
					right:-5px;
					top:-5px;
					background-color:#F62571;
					color:#fff;
					padding:0 4px;
					line-height:22px;
					border-radius:50px;
				}
				.icon-daohanggouwuche{
					font-size:35px;
				}
			}
			.car_icon_ok{
				color:#fff;
				background-color:#1FB3F0;
			}
			.car_price{
				margin-left:10px;
				color:#999;
				font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
				.price_top{
					height:22px;
					margin-top:16px;
				}
				.price_bottom{
					font-size:18px;
				}
				.price{
					font-size:22px;
					color:#fff;
				}
				.origin_price{
					margin-left:6px;
					text-decoration:line-through;
				}
			}
		}
		.car_submit{
			width:162px;
			font-weight:700;
			font-size:22px;
			line-height:66px;
			text-align:center;
			.submit_base{
				background-color:#777;
			}
			.submit_ok{
				background-color:#69F398;
			}
		}
	}
	.shoppingCar_list{
		position:absolute;
		left:0;
		bottom:100%;
		z-index:5;
		width:100%;
		background-color:#F3EBCD;
		.list_discountsMess{
			text-align:center;
			line-height:2;
		}
		.list_title{
			justify-content:space-between;
			line-height:56px;
			background-color:#ECEFF1;
			color:#666;
			.title_name{
				padding:0 10px;
				font-size:22px;
			}
			.title_clear{
				padding:0 10px;
				font-size:18px;
				.icon-icon{
					margin-right:6px;
					font-size:110%;
				}
			}
		}
		.list_wrapper{
			max-height:500px;
			overflow:auto;
			background-color:#fff;
			.list_main{
				li{
					display:flex;
					justify-content:space-between;
					border-bottom:1px solid #f5f5f5;
					line-height:60px;
					margin:0 10px;
					.main_desc{
						.desc_name{
							font-size:22px;
						}
					}
					.main_price{
						display:flex;
						align-items:center;
						.price_num{
							color:#F75858;
							font-weight:600;
							margin-right:10px;
							font-size:20px;
							&::before{
								font-size:70%;
							}
						}
					}

				}
			}
		}
	}
</style>

<template>
  <div class="shoppingCarWrapper" v-if="rst">
  	<div class="shoppingCar flex">
	  	<div class="car_main flex">
			<div class="car_icon"
				:class="{car_icon_ok:count_all.num}"
				:style="{animation:playCar}"
				@click="count_all.num && (show.list = !show.list)"
			>
				<b class="icon_count">{{count_all.num?count_all.num:''}}</b>
				<i class="iconfont icon-daohanggouwuche"></i>
			</div>
			<div class="car_price">
				<div class="price_top">
					<p v-if="count_all.price >= base_price">
						<span class="price symbol">{{count_all.price}}</span>
						<span class="origin_price symbol">{{count_all.price_origin}}</span>
					</p>
					<p
						v-else
						class="price_bottom"
					>
						还不够吃~
					</p>
				</div>
				<p>{{rst.piecewise_agent_fee.description}}</p>
			</div>
		</div>
		<div class="car_submit">
			<div class="submit_base" v-if="priceSpread>0">还差{{priceSpread}}元起送</div>
			<div class="submit_ok" v-else>去结算</div>
		</div>
	</div>
	<transition name="list">
	<div class="shoppingCar_list" v-show="showList">
		<p class="list_discountsMess">已减{{(count_all.price_origin - count_all.price).toFixed(1)}}元</p>
		<div class="list_title flex">
			<div class="title_name">
				<span>已选商品</span>
			</div>
			<div class="title_clear"
				@click="$store.commit('detail/clear',m_id)"
			>
				<i class="iconfont icon-icon"></i>清空
			</div>
		</div>
		<div class="list_wrapper">
			<ul class="list_main">
				<li v-for="food in count">
					<div class="main_desc t_ellipsis">
						<span class="desc_name">{{food.item.name}}</span>
					</div>
					<div class="main_price">
						<span class="price_num symbol">{{priceFn(food.item)}}</span>
						<btnCount :count="food.count"
							@click="countFn({item:food.item,tid:food.tid},$event)"
						></btnCount>
					</div>
				</li>
			</ul>
		</div>
	</div>
	</transition>
  </div>
</template>

<script>
import btnCount from '@C/btnCount/BtnCount'
import {mapState as ms, mapGetters as mg} from 'vuex'
export default {
  data () {
    return {
      show:{
      	list:false
      },
      playCar:''
    }
  },
  props:{
  	m_id:{
  		type:[Number,String]
  	}
  },
  methods:{
  	priceFn(item,name){
  		name = name || 'price';
  		var 
  			price,
  			_item = item.specfoods[0][name];
  		if(_item){
	  		price = _item?_item
	  			.toFixed(1)
	  			.replace(/\.0$/,'')
	  			:_item;
  		}
  		return parseFloat(price) || 0;
  	},
  	countFn(item,e){
  		var str = 'detail/'+(e?'add':'reduce');
  		this.$store.commit(str,item);
  	},
  	
  },
  computed:{
  	showList(){
  		var bool_num = !!this.count_all.num;
  		if(bool_num){
  			return this.show.list;
  		}else{
  			return this.show.list = false;

  		}
  	},
  	base_price(){
  		return this.rst.piecewise_agent_fee.rules[0].price;
  	},
  	priceSpread(){
  		var num = this.base_price - this.count_all.price;

  		return parseFloat(num.toFixed(1));
  	},
  	...ms('detail',{
  		count:function(state){
  			return state.count[this.m_id];
  		},
  		classCount:function(state){
  			return state.classCount[this.m_id];;
  		}
  	}),
  	...mg('detail',['rst']),
  	count_all(){
  		var
  			num = 0,
  			price = 0,
  			price_origin = 0,
  			_price_origin = 0,
  			item;


  		for(var k in this.count){
  			item = this.count[k];
  			num += item.count;
  			price += item.count * this.priceFn(item.item);
  			_price_origin = item.count * this.priceFn(item.item,'original_price');
  			price_origin += _price_origin?_price_origin:price;
  		}


  		price = parseFloat(price.toFixed(1));
  		price_origin = parseFloat(price_origin.toFixed(1));

  		return {num,price,price_origin};
  	}
  },
  watch:{
  	count_all(to,from){
  		if(to.num > from.num){
  			this.playCar = '';
  			setInterval(()=>{
  				this.playCar = 'car 0.3s';
  			},100)
  		}
  	}
  },
  mounted(){

  },
  components:{
  	btnCount
  }
}
</script>

