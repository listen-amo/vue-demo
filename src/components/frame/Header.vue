<style lang="scss">
	.header{
		position:relative;
		background-color: #2395ff;
		background-image: linear-gradient(90deg,#53AFFC,#1C65FF);
		.header_title{
			line-height:toRem(60px);
		}
		.title_back{
			position:absolute;
			left:0;
			top:0;
			width:toRem(60px);
			line-height:toRem(60px);
			text-align:center;
			font-family:SimHei,'黑体';
			color:#fff;
			font-size:toRem(30px);
			font-weight:700;
		}
		.title_name{
			font-size:toRem(24px);
			font-weight:700;
			color:#fff;
			text-align:center;
		}
	}
</style>

<template>
<header class="header">
	<slot name="title">
		<div class="header_title">
			<button class="title_back" @click="$emit('back')">&lt;</button>
			<slot name="title_left"></slot>
			<h3 class="title_name">{{title}}</h3>
			<slot name="title_right"></slot>
		</div>
	</slot>
	<slot></slot>
</header>
</template>

<script>
export default {
	props:{
		title:{
			type:String,
			default:'发现'
		}
	}
}
</script>