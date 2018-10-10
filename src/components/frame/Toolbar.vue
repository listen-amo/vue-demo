<style lang="scss">
	.toolbar{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		box-shadow:0 0 toRem(6px) #000;
		background-image: linear-gradient(90deg,#53AFFC,#1C65FF);
		.toolbar_main{
			li{
				text-align:center;
				flex-grow:1;
				flex-shrink:1;
			}
			.item{
				padding:toRem(10px) 0;
				color:#ccc;
				&.on{
					font-weight:700;
					color:#fff;
				}
				i{
					display:block;
					width:toRem(30px);
					height:toRem(30px);
					margin:0 auto toRem(4px);
					font-size:toRem(30px);
					text-align:center;
					line-heght:toRem(30px);
				}
			}
		}
	}
</style>

<template>
<footer class="toolbar">
	<ul class="toolbar_main flex">
		<li
			v-for="(item,i) in data_base"
			:key="item.id"
		>
			<div
				class="item"
				:class="{on:i == myIndex}"
				@click="$emit('update:tab',item)"
			>
				<i :class="['iconfont',item.icon]"></i>
				
				<span>{{item.name}}</span>
			</div>
		</li>
	</ul>
</footer>
</template>

<script>
export default {
	data(){
		return {
			data_base:[
				{
					id:'0',
					name:'首页',
					icon:'icon-home'
				},
				{
					id:'1',
					name:'发现',
					icon:'icon-faxian'
				},
				{
					id:'2',
					name:'订单',
					icon:'icon-dingdan'
				},
				{
					id:'3',
					name:'我的',
					icon:'icon-xiazai'
				}
			]
		}
	},
	computed:{
		myIndex(){
			return this.index;
		}
	},
	props:{
		index:{
			type:Number,
			default:0
		}
	}
}
</script>