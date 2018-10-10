<style lang="scss">
	.foodClass{
		height:toRem(234px);
		.class_list{
			display:flex;
			height:100%;
			flex-wrap:wrap;
			align-items:flex-start;
			align-content:flex-start;
			li{
				width:20%;
				text-align:center;
				a{
					display:block;
					height:100%;
					overflow:hidden;
				}
				img{
					display:block;
					margin:toRem(10px) auto;
					width:60%;
					height:auto;
				}
			}
		}
		.mint-swipe-indicators{
			.mint-swipe-indicator{
				background-color:#5C5C5C;
			}
			.is-active{
				background-color:#FA2E2E;
			}
		}
	}
</style>

<template>
<div class="foodClass">
	<mt-swipe
		v-if="data_body"
		:auto="0"
		:show-indicators="entries.length > 1"
		:continuous="false"
		:speed="100">
		<mt-swipe-item
			v-for="(items,n) in entries"
			:key="n">
			<ul class="class_list">
				<li v-for="(item,i) in items"
				:key="i">
					<a href="">
					<img :src="$formatImgSrc(item.image_hash)" alt="">
					<span>{{item.name}}</span>
					</a>
				</li>
			</ul>
		</mt-swipe-item>
	</mt-swipe>
</div>
</template>

<script>

import { Swipe, SwipeItem } from 'mint-ui'

export default {
  data () {
    return {
      data_body:null
    }
  },
  computed:{
  	entries(){// 数组数据结构格式化
  		var
  			body = this.data_body,
  			entries;
  		var
  			quantity = 10,// 单页数量
  			arr = [];
  		if(body){
  			entries = body.entries.slice();
  			do{
  				arr.push(entries.splice(0,quantity))
  			}while(entries.length>0);
  			return arr;
  		}
  	}
  },
  components:{
  	[Swipe.name]:Swipe,
  	[SwipeItem.name]:SwipeItem,
  },
  mounted(){
  	// 获取食物列表数据
  	var api = 'http://120.79.88.237:8080/api/data/home.json';
  	this.$http.get(api).then(req=>{
  		this.data_body = req.body;
  	});
  }
}
</script>


