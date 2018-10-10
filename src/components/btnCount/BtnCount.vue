
<style lang="scss">
	.rotate-enter-active,
	.rotate-leave-active{
		transition:0.5s;
	}
	.rotate-enter,
	.rotate-leave-to{
		opacity:0;
	}
	.btnCount{
		line-height:30px;
		align-items:center;
		.iconfont{
			font-size:30px;
			color:#28BFBD;
		}
		.num{
			margin:0 6px;
			font-size:20px;
		}
		.icon-jian{
			transition:0.2s;
			opacity:0;
			visibility:hidden;
			transform:translate(-30px) rotate(-160deg);
		}
		.rotate_transition{
			opacity:1;
			visibility:visible;
			transform:translate(0px) rotate(0deg);
		}
	}
</style>

<template>
  <div class="btnCount flex">
	<button class="iconfont icon-jian" 
		:class="{rotate_transition:count>0}"
		@click="$emit('click',false)"></button>
	<span class="num" :style="{visibility:count>0?'visible':'hidden'}">{{count}}</span>
	<button class="iconfont icon-jia"
		@click="$emit('click',true)"></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:{
  	count:[Number,String],
  	default:0
  }
}
</script>
