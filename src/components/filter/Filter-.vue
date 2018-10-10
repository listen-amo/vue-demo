<style lang="scss">
	.filter{
		position:relative;
		z-index:100;
		padding:toRem(10px) 0;
		background-color:#fff;
		.filter_nav{
			.nav_item{
				flex-grow:1;
				flex-shrink:1;
				flex-basis:1px;
				text-align:center;
				.item_name{
					font-size:toRem(18px);
				}
				.nav_on{
					color:#F7901E;
					font-weight:700;
				}
				.more_on{
					color:#F716A3;
					font-weight:700;
				}
			}
			
		}
		.nav_submenu{
			position:absolute;
			left:0;
			top:100%;
			width:100%;
			background-color:#fff;
			.submenu_a{
				padding:toRem(10px) 0;
				font-size:toRem(16px);
				line-height:toRem(34px);
				text-indent:toRem(30px);
				.submenu_on{
					color:#F36262;
				}
			}
			.submenu_d{
				.d_main{
					.main_item{
						padding:0 10px;
						.item_title{
							line-height:30px;
						}
						.item_wrap{
							justify-content:space-between;
							.item_con{
								width:31%;
								background-color:#EfEfEf;
								line-height:44px;
								text-align:center;
								font-size:16px;
								color:#666;
								border-radius:2px;
							}
							.submenu_on{
								color:#fff;
								background-color:#58BBF6;
							}
						}
					}
				}
				.d_btnWrap{
					margin-top:20px;
					box-shadow:0 -2px 2px #ddd;
					button{
						text-align:center;
						line-height:60px;
						font-size:20px;
					}
					.btn_clear{
						color:#ddd;
					}
					.btn_ok{
						color:#fff;
						background-color:#56DC7F;
					}
				}
				
			}
		}
	}
</style>

<template>
  <div @mousewheel.prevent @touchmove.prevent @click.stop>
	  <vShade :show="!!showName" @click="setShowName"></vShade>
	  <div class="filter">
		<div class="filter_nav flex">
			<div
				class="nav_item"
				v-for="(item,k) in filter_data"
				:key="k"
				@click="select_nav(k,item)">
				<span
					class="item_name"
					:class="{
						nav_on:item.checked,
						more_on:showName === k
					}"
					>
					{{item.name}}
					<i 
						v-if="k === 'a'"
						class="iconfont icon-jiantouarrow486"></i>
					<i 
						v-if="k === 'd'"
						class="iconfont icon-shaixuan"></i>
				</span>
			</div>
		</div>
		<div class="nav_submenu">
			<div class="submenu_a" v-show="showName === 'a' ">
				<ul>
					<li
						v-for="(item,index) in filter_data.a.items"
						:key="item.id"
						:class="{submenu_on:item.checked}"
						@click="select_a({key:'a',result:index,item})">
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="submenu_d" v-show="showName === 'd' ">
				<div class="d_main">
					<dl
						v-for="(items,i) in more_data"
						:key="i"
						class="main_item clearFixed">
						<dt class="item_title">{{items.name}}</dt>
						<dd class="item_wrap flex">
							<div
								class="item_con"
								v-for="(item,i) in items.items"
								:key="item.id"
								@click="filter_d(item,i,items)"
								:class="{submenu_on:item.checked}">
								{{item.name}}
							</div>		
						</dd>
					</dl>
				</div>
				<div class="d_btnWrap flex">
					<button @click="clear_d" class="btn_clear grow_shrink">clear</button>
					<button @click="select_d" class="btn_ok grow_shrink">ok</button>
				</div>
			</div>
		</div>
	  </div>
  </div>
</template>

<script>
import vShade from '@C/shade/Shade'
export default {
  data () {
    return {
      showName:'',
      shadeShow:false,
      filter_data:this.$copy(this.data),
      more_data:this.$copy(this.data.d.items)
    }
  },
  methods:{
  	select_a(selectMess){
  		this.setShowName();

  		var data = this.filter_data;
  		var {a,b,c} = data;
  		var index = selectMess.result;
		var item = a.items[index];

  		b.checked = c.checked = false;

		if(item === a.checked_item){
			this.init_a();
			this.$emit('select',{key:'a',result:0,item})
		}else{

			a.checked = true;
			a.name = item.name;
			a.checked_item.checked = false;
			item.checked = true;
			a.checked_item = item;
  			this.$emit('select',selectMess);

		}

  	},
  	select_nav(k,item){
  		var data =  this.filter_data;
  		switch(k){
  			case 'a':
  				this.setShowName('a');
  				break;
  			case 'b':
  			case 'c':
				var {b,c} = data;
				this.setShowName();
				this.init_a();
				if(k === 'b'){
					c.checked = false;
				}
				if(k === 'c'){
					b.checked = false;
				}
				data[k].checked = !data[k].checked;
  				this.$emit('select',{key:k,result:data[k].checked?k:'',item});
  				break;
  			case 'd':
  				var bool = this.setShowName('d');
  				if(bool){
  					this.more_data = this.$copy(data.d.items);
  				}
  				break;
  		}
  		this.$emit('selectNav',k);
  		// 置顶
  		this.$top(-66);

  	},
  	init_a(){										// 初始化选项a
		var a = this.filter_data.a;
		var first = a.items[0];
		a.checked = false;
		a.name = first.name;
		a.checked_item.checked = false;
		a.checked_item = first;
	},
	setShowName(name){								// 设置显示的名字
		name = name || '';
		var _name = this.showName;
		this.showName = _name === name?'':name;
		return this.showName === name && !!name;
	},
	filter_d(item,i,items){// 筛选控制
		// 判断是否为单选 或者 点击的为补重复的项的时候才重置上一次点击的项的值为false
		if(!items.multipleChoice && items.prevItem != item){
			if("prevItem" in items){
				items.prevItem.checked = false;
			}
			items.prevItem = item;
		}
		item.checked = !item.checked;
	},
	select_d(){
		var more_data = this.more_data;
		var formatDate = [];
		var item,items;
		this.filter_data.d.checked = false;
		// 格式化被选中的值
		for(var i=0;i<more_data.length;i++){
			formatDate[i] = [];
			items = more_data[i].items;
			for(var j=0;j<items.length;j++){
				item = items[j];
				if(item.checked){
					formatDate[i].push(j)
					this.filter_data.d.checked = true;
				};
			}
		}
		this.setShowName();
		this.filter_data.d.items = more_data;
		this.$emit('select',{key:'d',result:formatDate});
	},
	clear_d(){
		this.more_data = this.$copy(this.data.d.items);
	}
  },
  components:{
  	vShade
  },
  props:{
  	data:{
  		type:Object
  	}
  }
}
</script>


