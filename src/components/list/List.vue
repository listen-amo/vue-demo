<style lang="scss">
	.list{
    .list_item{
      display:flex;
      padding:20px 10px;
      border-bottom:1px solid #dddfdf;
      .item_img{
        position:relative;
        img{
          width:86px;
          height:86px;
        }
        .img_arror{
          position:absolute;
          right:-5px;
          top:-5px;
          background-image:linear-gradient(0deg,#FB7474,#C92020);
          color:#fff;
          font-size:16px;
          padding:4px 8px;
          border-radius:30px;
        }
      }
      .item_desc{
        margin-left:10px;
        flex-grow:1;
        flex-shrink:1;
        overflow:hidden;
        .desc_name{
          line-height:24px;
          // 品牌商标，判断值为  item.restaurant.is_premium
          &.brand::before{
            content:'品牌';
            padding:0 4px;
            background-color:#F6713C;
            color:#EEEDED;
            border-radius:2px;
          }
          .name_main{
            margin-left:4px;
            font-size:20px;
            font-weight:700;
          }
          // 服务支持标签 判断值为 item.restaurant.supports
          .name_support{
            float:right;
            i{
              margin-left:2px;
              padding:0 2px;
              border:1px solid #ddd;
              background-color:#fff;
              font-size:12px;
              color:#999;
            }
            .invoice::before{
              content:'票';
            }
            .insurance::before{
              content:'保';
            }
            .ad::before{
              content:'广告';
            }
          }
          
        }
        .desc_star{
          display:flex;
          color:#999;
          margin:8px 0;
          .recent_order_num{
            margin-left:10px;
          }
        }
        .desc_price{
          justify-content:space-between;
          .price_item{
            color:#999;
            .item_left{
              padding-right:6px;
              margin-right:6px;
              border-right:1px solid #ccc;
            }
          }
        }
        .desc_tags{
          margin:8px 0;
          .tag{
            padding:0 3px;
            margin-right:6px;
            border:1px solid #dfdfdf;
            color:#9a9a9a;
          }
        }
        .desc_activity{
          height:46px;
          .activity_count{
            margin-left:6px;
            line-height:20px;
            .icon-jiantouarrow486{
              margin-left:4px;
              font-size:12px;
            }
          }
        }
      }
    }
  }
  .loading{
    text-align:center;
    line-height:28px;
  }
</style>

<template>
  <div class="listWrap">
	<ul class="list">
		<li
      class="list_item"
      v-for="item in items"
      :key="item.restaurant.id"
      @click="to(item.restaurant.id)">
      <!-- 图片 -->
		 	<div class="item_img">
        <img :src="$formatImgSrc(item.restaurant.image_path,86)" alt="">
        <span class="img_arror" v-if="classCountFn(item.restaurant.id)">{{classCountFn(item.restaurant.id)}}</span>
      </div>
      
      <!-- 描述 -->
      <div class="item_desc">
        <!-- 标题 -->
        <h3
          class="desc_name"
          :class="{brand:item.restaurant.is_premium}">
          <span class="name_main">{{item.restaurant.name}}</span>
          <span class="name_support">
            <i v-if="item.restaurant.recommend.is_ad" class="ad"></i>
            <i
              v-for="support in item.restaurant.supports"
              :class="
                ({
                  '4':'invoice',
                  '7':'insurance',
                })[support.id]
              "
            ></i>
          </span>
        </h3>

        <!-- 星级值：item.restaurant.rating -->
        <div class="desc_star">
          <vStar :level="item.restaurant.rating" size="85"></vStar>
          <div class="recent_order_num">月售{{item.restaurant.recent_order_num}}单</div>
        </div>

        <!-- 价格 -->
        <div class="desc_price flex">
          <div class="price_item flex">
            <span class="item_left">￥{{item.restaurant.piecewise_agent_fee.rules[0].price}}起送</span>
            <span>{{item.restaurant.piecewise_agent_fee.description}}</span>
          </div>
          <div class="price_item flex">
            <span class="item_left">{{calcDist(item.restaurant.latitude,item.restaurant.longitude)}}</span>
            <span>{{item.restaurant.order_lead_time}}分钟</span>
          </div>
        </div>

        <!-- 标签 -->
        <div v-if="item.restaurant.flavors.length" class="desc_tags flex">
          <i
            class="tag"
            v-for="tag in item.restaurant.flavors"
          >{{tag.name}}</i>
        </div>

        <!-- 活动 -->
        <div
          v-if="item.restaurant.activities.length"
          class="desc_activity flex"
          :style="{height:show_activity[item.restaurant.id]?'auto':''}">
          <activityList
            :data="item.restaurant.activities"
            class="grow_shrink"></activityList>
          <div
            class="activity_count"
            @click.stop="hasShowActivity(item.restaurant.id)">{{item.restaurant.activities.length}}个活动<i class="iconfont icon-jiantouarrow486"></i>
          </div>
        </div>
      </div>
		</li>
	</ul>
  <slot>
  <p v-if="show_loading" class="loading">加载中....</p>
  <p v-else class="loading">没有更多了~</p>
  </slot>
  </div>
</template>

<script>
import  paths from '@R/paths'
import  vStar from '@C/star/Star'
import  activityList from '@C/activityList/ActivityList'

import {mapGetters as mg,mapState as ms} from 'vuex'

export default {
  data () {
    return {
      data_main:null,
      items:[],
      show_loading:true,
      show_activity:{}
    }
  },
  props:{
    gps:{
      type:Object,
      default(){
        return {
          latitude:28.215309,
          longitude:112.925113
        }
      }
    }
  },

  filters:{
    isZero(val){
      return val?val:'';
    }
  },
  methods:{
    // 路由跳转
    to(id){
      this.$router.push({
        name:paths.MENU,
        query:{id}
      })
    },
    // 活动菜单显示判断
    hasShowActivity(id){
      var showActivity = this.show_activity;
      if(id in showActivity){
        showActivity[id] = !showActivity[id];
      }else{
        this.$set(showActivity,id,true);        
      }
      return showActivity[id];
    },
    // 获取列表数据
    getData(s,len,cb){
      const api = 'http://120.79.88.237:8080/api/list?offset='+s+'&len='+len;
      var body;
      var items = this.items;
      var items_seg;
      this.$http.get(api).then(val=>{
        body = val.body;
        this.data_main = body;
        items_seg = body.items;
        if(items_seg.length){
          items.push.apply(items,items_seg);
        }else{
          cb && cb();
        }
      });
    },
    // 滚动监听
    watchScrollEnd(cb,offset){
      offset = offset || 0;
      var
        wh = 0,
        sh = 0,
        dh = 0,
        bool,
        _bool;
      var
        dHtml = document.documentElement,
        dBody = document.body;

      const fn = ()=>{
        wh = window.outerHeight || dHtml.clientHeight;
        dh = dBody.offsetHeight;
        sh = dHtml.scrollTop || dBody.scrollTop;
        bool = wh+sh+offset >= dh;
        if(bool !== _bool){
          cb && cb(bool);
          _bool = bool;
        }
      }

      window.addEventListener('scroll',fn,false);
      return fn;
    },
    // 通过经纬度计算直线距离
    calcDist(x,y){
      var
        a = this.gps.latitude - x,
        b = this.gps.longitude - y;
      return (Math.sqrt(a*a+b*b)*100).toFixed(2) + 'km';
    },
    // 店家商品购买数量
    classCountFn(id){
      var classCount = this.classCount[id];
      var count = 0;
      for(var k in classCount){
        count += classCount[k];
      }
      return count;
    }
  },
  computed:{
    ...ms(
      'detail',
      [
        'count',
        'classCount'
      ]
    )
  },
  components:{
    vStar,
    activityList
  },
  mounted(){
  	// 数据加载
    var
      s = 0,
      len = 8;
    
    this.watchScrollEnd(bool=>{
      if(bool){
       s += len; 
       this.getData(s,len,()=>{
        this.show_loading = false;
       });
      }
    },20);
  	this.getData(s,len);
  }
}
</script>
