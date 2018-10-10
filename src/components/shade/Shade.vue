<style lang="scss">
	.shade{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index:50;
		margin:0 auto;
	}
</style>

<template>
  <transition :name="transitionName">
  <div
  	class="shade"
  	v-show="show"
  	@click="$emit('click')"
  	@mousewheel.prevent
  	@touchmove.prevent
  	:style="{backgroundColor:bgColor}">
	<slot></slot>
  </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:{
  	show:{
  		type:Boolean,
  		default:true
  	},
  	bgColor:{
  		type:String,
  		default:'rgba(0,0,0,0.8)'
  	},
    transitionName:{
      type:String,
      default:'shade'
    }
  }
}
</script>


