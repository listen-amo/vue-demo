<style lang="scss">
  // 动画效果
  .shade-enter-active,
  .shade-leave-active,
  .scale-enter-active,
  .scale-leave-active,
  .translate-enter-active,
  .translate-leave-active{
    transition:0.3s;
  }
  .shade-enter,
  .shade-leave-to{
    opacity:0;
  }
  
  .scale-enter,
  .scale-leave-to{
    transform:scale(0);
    opacity:0;
  }

  .translate-enter,
  .translate-leave-to{
    transform:translateY(100%);
  }

  

	.detail{
    padding-bottom:66px;
    .detail_header{
      position:relative;
      height:134px;
      margin-bottom:16px;
      background:no-repeat center/cover;
      &::before{
        content:'';
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        top:0;
        z-index:10;
        background-image:linear-gradient(0deg,#0008,#0003);
      }
      .header_back{
        position:absolute;
        left:0;
        top:0;
        z-index:20;
        width:40px;
        text-align:center;
        line-height:40px;
        font-family:'黑体';
        color:#fff;
        font-size:30px;
      }
      .header_img{
        position:absolute;
        left:0;
        right:0;
        bottom:-16px;
        z-index:20;
        width:100px;
        height:100px;
        margin:0 auto;
        border:1px solid #f5f5f5;
        border-radius:4px;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .detail_desc{
      padding-top:20px;
      .desc_name,
      .desc_rating,
      .desc_coupon,
      .desc_activity,
      .desc_notice{
        margin-bottom:10px;
      }
      .detail_slide{
        position:fixed;
        left:0;
        bottom:0;
        z-index:60;
        width:100%;
        height:300px;
        background-color:#fdfdfd;
        .detail_title{
          margin:10px 0;
          font-size:20px;
          font-weidht:700;
          text-align:center;
        }
      }
      .desc_name{
        font-weight:700;
        font-size:24px;
        text-align:center;
        &.name_arror::after{
          content:'';
          display:inline-block;
          width:0;
          height:0;
          vertical-align:middle;
          margin-left:10px;
          border:8px solid transparent;
          border-left-color:#000;
        }
      }
      .desc_rating{
        text-align:center;
        span{
          margin:0 6px;
          color:#666;
        }
      }
      .desc_more{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index:60;
        margin:auto;
        width:400px;
        height:315px;
        background-color:#fff;
        border-radius:6px;
        text-align:center;
        line-height:30px;
        .more_btn{
          position:absolute;
          left:0;
          right:0;
          top:110%;
          margin:auto;
          width:46px;
          height:46px;
          border:1px solid #fff;
          background-color:#6B6A6Add;
          color:#fff;
          font-size:30px;
          border-radius:50%;
        }
      }
      .desc_coupon{
        .coupon_main{
          text-align:center;
          .coupon_item{
            position:relative;
            display:inline-flex;
            width:192px;
            height:34px;
            line-height:34px;
            font-size:14px;
            align-items:center;
            &::before,
            &::after{
              content:'';
              position:absolute;
              width:2px;
              height:0;
              right:44px;
              border:4px solid transparent;
            }
            &::before{
              top:0;
              border-top-color:#fff;
            }
            &::after{
              bottom:0;
              border-bottom-color:#fff;
            }
            span{
              color:#845454;
            }
            .mian_value{
              margin-left:20px;
              color:#6D6C29;
              font-size:24px;
              &::before{
                font-size:14px;
                content:'￥';
              }
            }
            .mian_detail{
              width:85px;
              overflow:hidden;
              margin-left:5px;
            }
            .mian_btn{
              position:absolute;
              right:10px;
            }
          }
          .type0{
            background-color:rgb(255,244,244);
          }
        }
        .coupon_detail{
          height:300px;
        }
      }
      .desc_activity{
        .activity_main{
          width:408px;
          margin:0 auto;
          .activity_more{
            margin-left:10px;
          }
        }
        .activity_detail{
          overflow:auto;
          button{
            position:absolute;
            top:10px;
            right:10px;
            font-size:30px;
          }
          .detail_list{
            padding:0 10px;
            overflow:hidden;
          }
        }
      }
      .desc_notice{
        width:420px;
        margin-left:auto;
        margin-right:auto;
        font-size:16px;
        color:#666;
      }
    }
    .detail_main{
      .main_nav{
        background-color:#fff;
        border-bottom:1px solid #ddd;
        .nav_item{
          text-align:center;
          flex-grow:1;
          a{
            display:inline-block;
            line-height:50px;
            font-size:20px;
            color:#777;
            border-bottom:2px solid transparent;
            &.router-link-active{
              color:#333;
              font-weight:700;
              border-bottom-color:#FF6969;
            }
          }
        }
      }
    }
	}
</style>

<template>
  <div class="detail" v-if="data_main && rst">
    <vShade :show="showShade"></vShade>
    <!-- 头部 -->
  	<header class="detail_header pink" :style="{backgroundImage:'url('+$formatImgSrc(rst.shop_sign.image_hash,750,true)+')'}">
  		<router-link
        class="header_back"
        :to="paths.HOME">&lt;</router-link>
      <div class="header_img blue">
        <img :src="$formatImgSrc(rst.image_path,100)">
      </div>
  	</header>
    <!-- 店铺描述 -->
    <div class="detail_desc">
      <h2 class="desc_name name_arror" @click="show.desc = true">{{rst.name}}</h2>
      <div class="desc_rating" @click="show.desc = true">
        <span>评价{{rst.rating}}分</span>
        <span>月售{{rst.recent_order_num}}单</span>
        <span>配送约{{rst.order_lead_time}}分钟</span>
      </div>
      <!-- 详情页 -->
      <transition name="scale">
      <div v-if="show.desc" class="desc_more">
        <h2 class="desc_name">{{rst.name}}</h2>
        <span>评价{{rst.rating}}分</span>
        <span>月售{{rst.recent_order_num}}单</span>
        <span>配送约{{rst.order_lead_time}}分钟</span>
        <div>
          {{rst.promotion_info}}
        </div>
        <button class="more_btn" @click="show.desc = false">x</button>
      </div>
      </transition>
      <!-- 优惠劵 -->
      <div
        class="desc_coupon"
        v-if="redpack.length">
        <div class="coupon_main" @click="show.coupon = true">
          <div class="coupon_item flex type0" v-for="item in redpack">
            <span class="mian_value">{{item.value}}</span>
            <span class="mian_detail">{{item.title_detail}}</span>
            <span class="mian_btn">领取</span>
          </div>
        </div>
        <transition name="translate">
        <div class="coupon_detail detail_slide" v-show="show.coupon">
          <div class="detail_title">店铺专享红包</div>
          coupon_detail
          <button @click="show.coupon = false">XX</button>
        </div>
        </transition>
      </div>
      <!-- 活动 -->
      <div
        class="desc_activity">
        <div class="activity_main flex" @click="show.activity = true">
          <activity-list
          :data="[rst.activities[0]]"
          class="grow_shrink"></activity-list>
          <div class="activity_more">共{{rst.activities.length}}个优惠<i class="iconfont icon-jiantouarrow486"></i></div>
        </div>
        <transition name="translate">
        <div
          v-if="show.activity"
          class="activity_detail detail_slide">
          <div class="detail_title">所有优惠</div>
          <button @click="show.activity = false">X</button>
          <activity-list
          class="detail_list"
          :data="rst.activities"></activity-list>
        </div>
      </transition>
      </div>
      <!-- 公告 -->
      <div class="desc_notice t_ellipsis">
        公告： {{rst.promotion_info}}
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="detail_main">
      <!-- 导航 -->
      <nav class="main_nav flex" v-fixed ref="detail_nav">
        <div class="nav_item">
          <router-link :to="paths.MENU">点餐</router-link>
        </div>
        <div class="nav_item">
          <router-link :to="paths.EVALUATE">评价</router-link>
        </div>
        <div class="nav_item">
          <router-link :to="paths.MERCHANT">商家</router-link>
        </div>
      </nav>
      <router-view></router-view>
    </div>
    <ShoppingCar :m_id="m_id" ref="shoppingCar"></ShoppingCar>
  </div>
  <div v-else>
    加载中 <router-link to="/">返回</router-link>
  </div>
</template>

<script>
import vShade from '@C/shade/Shade.vue'
import activityList from '@C/activityList/ActivityList'

import ShoppingCar from '@C/shoppingCar/ShoppingCar'

import {mapState,mapGetters} from 'vuex'

import  paths from '@R/paths'

export default {
  data () {
    return {
      show:{
        desc:false,
        coupon:false,
        activity:false
      },
      paths
    }
  },
  computed:{
    showShade(){
      var show = this.show;
      for(var k in show){
        if(show[k])return true;
      }
      return false;
    },
    ...mapState({
      data_main:state=>state.detail.data
    }),
    ...mapGetters(
      'detail',
      [
        'bought_list',
        'menu',
        'recommend',
        'rst',
        'redpack'
      ]
    ),
    m_id(){
      return this.$route.query.id;
    }
  },
  methods:{
    
  },
  mounted(){

    var id = this.m_id;

    const api = 'http://120.79.88.237:8080/api/detail?id='+id;
    this.$http.get(api).then(val=>{
      this.$store.commit('detail/setData',val.body);
    })
  },
  components:{
    vShade,
    activityList,
    ShoppingCar
  }
}
</script>

