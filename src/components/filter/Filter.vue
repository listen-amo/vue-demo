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
			// display:none;
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
  <div>
	  <vShade :show="submenuIndex===0 || submenuIndex===3" @click="submenuIndex = null"></vShade>
	  <div class="filter">
		<div class="filter_nav flex">
			<div class="nav_item"
				v-for="(item,i) in data"
				:key="i"
        @click="select_nav(i)"
			>
				<span
					class="item_name"
          :class="{nav_on:dataState[i].checked}"
				>
					{{item.name}}
					<!-- 判断是否显示图标 -->
					<i v-if="i === 0" class="iconfont icon-jiantouarrow486"></i>
					<i v-if="i === 3"  class="iconfont icon-shaixuan"></i>
				</span>
			</div>
		</div>
		<div class="nav_submenu">

			<!-- 第一项的二级菜单 -->
			<div class="submenu_a" v-show="submenuIndex === 0">
				<ul>
					<li
            v-for="(item,i) in data[0].items" :key="i"
            :class="{submenu_on:i === dataState[0].itemChecked}"
            @click="select_0(i)"
          >
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
  
			<!-- 第四项的二级菜单 -->
			<div class="submenu_d" v-show="submenuIndex === 3">
				<div class="d_main">
					<dl class="main_item clearFixed"
						v-for="(items,a) in data[3].items"
					>
						<dt class="item_title">{{items.name}}</dt>
						<dd class="item_wrap flex">
							<div class="item_con"
								v-for="(item,b) in items.items"
                :class="{submenu_on:dataState[3].items[a].itemChecked.indexOf(b) !== -1 }"
                @click="select_3(a,b)"
							>
                {{item.name}}
                {{dataState[3].items[a][b]}}
							</div>		
						</dd>
					</dl>
				</div>
				<div class="d_btnWrap flex">
					<button class="btn_clear grow_shrink"
            @click="more_clear"
          >clear</button>
					<button class="btn_ok grow_shrink"
            @click="more_ok"
          >ok</button>
				</div>
			</div>
		</div>
	  </div>
  </div>
</template>

<script>

import vShade from '@C/shade/Shade'

/*
	每个使用的地方选项可能不一样
	
*/
export default {
  data () {
    return {
      // 定义一新的对象去记录选择的状态
      dataState:this.initDataState(),
      submenuIndex:null,
      backupsState3:null
    }
  },
  methods:{
  	initDataState(){
      var data = this.data;
      var dataA = data[0];
      var dataD = data[3];
      var arr = [];
      arr[0] = {
        checked:false,
        itemChecked:null,
        item:dataA
      }
      arr[1] = {
        checked:false,
        item:data[1]
      }
      arr[2] = {
        checked:false,
        item:data[2]
      }

      arr[3] = this.initDataState_3();

      return arr;

    },
    initDataState_3(){
      var data3 = this.data[3];
      var obj, arr = [];
      for(var k in data3.items){
        obj = {
          cheched:false,
          multipleChoice:!!data3.items[k].multipleChoice,
          itemChecked:[]
        }
        arr.push(obj);
      }
      return {
        checked:false,
        items:arr
      }
    },
    select_nav(i){

      var
        state = this.dataState,
        state0 = state[0],
        state1 = state[1],
        state1 = state[2],
        state3 = state[3];

      // 二级菜单控制
      this.submenuIndex = this.submenuIndex===i?
        null
        :i;

      switch(i){
        case 0:
          
          break;
        case 1:
        case 2:

          // 设置状态
          state[i===1?2:1].checked = false;
          state[i].checked = !state[i].checked;

          // 重置选项a的状态
          state0.itemChecked = null;
          state0.checked = false;

          // 设置选中项的值
          this.selectItems.type0 = state[i].checked?
            i===1?
              -1
              :-2
            :null;

          break;
        case 3:
          // 初始化筛选选项
          if( this.submenuIndex !== null ){
            this.backupsState3 = this.$copy(state3);
          }

          break;
      }

      // 关闭菜单的时候重置更多选项
      if(this.backupsState3 && this.submenuIndex !== 3){
        state[3] = this.backupsState3;
      }

      // 让父级捕获导航选择的事件
      this.$emit('select_nav',this.submenuIndex);

      // 自动置顶
      this.$top(-this.topOffset);

    },
    select_0(i){

      var
        state = this.dataState,
        state0 = state[0],
        state1 = state[1],
        state2 = state[2];
        
      var
        _i = state0.itemChecked;

      state0.itemChecked = _i === i?null:i;
      _i = state0.itemChecked;

      state0.checked = _i !== null;

      state1.checked = false;
      state2.checked = false;

      this.selectItems.type0 = _i;

      this.submenuIndex = null;

      this.submit();

    },
    select_3(a,b){
      var
        state3 = this.dataState[3],
        item = state3.items[a],
        mc = !!item.multipleChoice,
        ic = item.itemChecked,
        type1 = this.selectItems.type1;
      var
        ind = ic.indexOf(b);

      if( ind !== -1 ){
        item.itemChecked.splice(ind,1);
      }else if(mc){
        item.itemChecked.push(b);
      }else{
        item.itemChecked = [b];
      }

      type1[a] = item.itemChecked;


      var
        k,
        bool_type1 = false;
      for(k in type1){
        if(type1[k].length){
          bool_type1 = true;
          break;
        }
      }

      item.checked = !!item.itemChecked.length;
      state3.checked = bool_type1;

    },
    more_clear(){
      this.$set(this.dataState,'3',this.initDataState_3());
    },
    more_ok(){
      this.backupsState3 = this.$copy(this.dataState[3]);
      this.submenuIndex = null;

      this.submit();
    },
    submit(){
      this.$emit('submit',this.selectItems)
    }
  },
  computed:{
  	selectItems(){
      var
        state = this.dataState,
        state0 = state[0],
        state3 = state[3];
      var obj = {},item;
      obj.type0 = state0.itemChecked;
      obj.type1 = {

      }

      for(var k in state3.items){
        item = state3.items[k];
        obj.type1[k] = item.itemChecked;

      }
      return obj;
    }
  },
  components:{
  	vShade
  },
  props:{
  	data:{
  		type:Array,
  		default(){
  			return [
  				{
  					name:'综合排序',
  					items:[
  						{
  							id:'0',
  							name:'综合排序'
  						},
  						{
  							id:'1',
  							name:'好评优先'
  						},
  						{
  							id:'2',
  							name:'销量最高'
  						},
  						{
  							id:'3',
  							name:'起送价最低'
  						},
  						{
  							id:'4',
  							name:'配送最快'
  						},
  						{
  							id:'5',
  							name:'配送费最低'
  						},
  						{
  							id:'6',
  							name:'从低到高'
  						},
  						{
  							id:'7',
  							name:'从高到低'
  						}
  					]
  				},
  				{
  					name:'距离最近',
            id:'8'
  				},
  				{
  					name:'品质联盟',
            id:'9'
  				},
  				{
  					name:'筛选',
  					items:[
  						{
  							name:'商家服务(多选)',
  							// 是否多选
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
  			]
  		}
  	},
    topOffset:{
      type:Number,
      default:66
    }
  }
}
</script>


