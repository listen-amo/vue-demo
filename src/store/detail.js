
import Vue from 'vue'

function formatData(state,name){
	var
		data = state.data;
	if(data && data.code != '404' && data[name]){
        return JSON.parse(data[name].body);
    }
}

function hasObjNull(obj){
	for(var k in obj)
		return false;
	return true;
}


export default {
	namespaced:true,
	state:{
		data:null,
		count:{},
		classCount:{}
	},
	mutations:{
		setData(state,data){
			state.data = data;
		},
		add(state,mess){
			var
				tid = mess.tid,
				item = mess.item;
			var
				rid = item.restaurant_id,
				id = item.item_id,
				count = state.count,
				classCount = state.classCount,
				countItem, classCountItem;
			// 判断店家
			if(rid in count){
				countItem = count[rid];
				// 判断商品
				if(id in countItem){
					countItem[id].count ++;
				}else{
					Vue.set(countItem,id,{
						count:1,
						tid,
						item
					})
				}
				// 类别操作
				classCountItem = classCount[rid];
				if(tid in classCountItem){
					classCountItem[tid] ++;
				}else{
					classCountItem[tid] = 1;
				}
			}else{
				Vue.set(count,rid,{
					[id]:{
						count:1,
						item,
						tid
					}
				});
				// 类别添加
				Vue.set(classCount,rid,{
					[tid]:1
				});
			}
		},
		reduce(state,mess){
			var
				item = mess.item,
				tid = mess.tid;
			var
				rid = item.restaurant_id,
				id = item.item_id,
				count = state.count,
				classCount = state.classCount,
				countItem = count[rid],
				classCountItem = state.classCount[rid];

			if(rid in count && id in countItem){
				countItem[id].count --;
				// 删除商品
				if(countItem[id].count <= 0){
					delete countItem[id];
					// 删除商家
					if(hasObjNull(countItem)){
						delete count[rid];
					}
				}
			}
			// 类别
			if(rid in classCount && tid in classCountItem){
				classCountItem[tid] --;
				if(classCountItem[tid] <= 0){
					delete classCountItem[tid];
					if(hasObjNull(classCountItem)){
						delete classCount[rid];
					}
				}
			}
		},
		clear(state,rid){
			Vue.delete(state.count,rid);
			Vue.delete(state.classCount,rid);
		}

	},
	getters:{
		bought_list(state){
			return formatData(state,'bought_list');
		},
		menu(state){
			return formatData(state,'menu');
		},
		recommend(state){
			return formatData(state,'recommend')[0];
		},
		redpack(state){
			return formatData(state,'redpack');
		},
		rst(state){
			return formatData(state,'rst');
		}
	}
}