
<style lang="scss">
  .activity_item{
    margin-bottom:toRem(6px);
    line-height:toRem(20px);
    font-size:toRem(14px);
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    color:#666;
    .icon{
      float:left;
      padding:0 2px;
      height:toRem(20px);
      margin-right:toRem(6px);
      font-size:toRem(14px);
      text-align:center;
      color:#fff;
      border-radius:toRem(3px);
    }
  }
</style>

<template>
<ul>
	<li class="activity_item" v-for="activitie in data">
    <i
      :style="{backgroundColor:'#'+ activitie.icon_color}"
      class="icon">{{activitie.icon_name}}</i>{{activitie.description}}
	</li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:{
  	data:Array,
  	default(){
  		return [];
  	}
  }
}
</script>

