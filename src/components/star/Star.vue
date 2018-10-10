
<style lang="scss">
	.starWrap{
		display:flex;
		.star_main{
			position:relative;
			div,img{
				width:76px;
			}
			.star_golden{
				position:absolute;
				left:0;
				top:0;
				overflow:hidden;
			}
		}
		.star_num{
			margin-left:6px;
		}
	}
</style>

<template>
  <div class="starWrap">
  	<div class="star_main" :style="{width:_size}">
		<img src="./svgFile/star-gray.svg" :style="{width:_size}">
	  	<div class="star_golden" :style="{width:_level}">
			<img src="./svgFile/star-golden.svg" :style="{width:_size}">
	  	</div>
  	</div>
  	<div class="star_num" :style="{fontSize:size/70*12/100+'rem'}">{{level}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed:{
  	_level(){
  		return this.level*20 + '%';
  	},
  	_size(){
  		return this.size/100 + 'rem';
  	}
  },
  props:{
  	level:{
  		type:[String,Number],
  		default:5
  	},
  	size:{
  		type:[String,Number],
  		default:76
  	}
  }
}
</script>