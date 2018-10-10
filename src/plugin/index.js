// 格式化图片地址
function formatImgSrc(hash,size,auto){
	if(!hash)return '';
	hash = hash.replace(/^(.{1})(.{2})(.+(jpeg|png))$/g,'$1/$2/$3.$4');
	size = size || 90;
	size = auto?size:size+'x'+size;
	return auto?`//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/${size}x/`:`//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/!${size}r/gravity/Center/crop/${size}/`;
}
// 深度对象拷贝
function copyArr(arr){
	var _arr = [];
	var item;
	for(var i=0;i<arr.length;i++){
		item = arr[i]
		if(Array.isArray(item)){
			item = copyArr(item)
		}else if(typeof item === 'object'){
			item = copyObj(item)
		}
		_arr[i] = item;
	}
	return _arr;
}
function copyObj(obj){
	var _obj = {};
	var item;
	for(var k in obj){
		item = obj[k];
		if(Array.isArray(item)){
			item = copyArr(item)
		}else if(typeof item === 'object'){
			item = copyObj(item)
		}
		_obj[k] = item;
	}
	return _obj;
}

function copy(arg){
	return Array.isArray(arg)?copyArr(arg):copyObj(arg);
}

// 置顶方法
function top(offset,el){
	el = el || this.$el;
	var t = offset || 0;
	var posiVal = getComputedStyle(el).position;
	if(posiVal !== 'fixed'){
		do{
			t += el.offsetTop;
			el = el.offsetParent;
		}while(el);

		document.documentElement.scrollTop = t;
		document.body.scrollTop = t;
	}
}


// 全局指令
// 自动固定
function watchScroll(t,el,offset,cb){
	offset = offset || 0;
	var
		bool,
		_bool = null,
		h = el.offsetHeight;
	var attrs = {
		position:'fixed',
		left:0,
		top:offset/100 + 'rem',
		width:'100%',
		zIndex:100
	};
	// 占位dom
	var p = document.createElement('p');
	p.style.height = h/100 + 'rem';
	p.style.display = 'none';
	if(el.after){
		el.after(p);
	}else{
		el.parentNode.insertBefore(p,el.nextElementSibling);
	}
	// testDiv.innerHTML ='test';
	return function(){
		var sT = document.documentElement.scrollTop || document.body.scrollTop;

		bool = sT >= (t-offset);
		if(_bool !== bool){
			for(var k in attrs){
				el.style[k] = bool?attrs[k]:'';
			}
			p.style.display = bool?'':'none';
			cb && cb(bool);
			_bool = bool;
		}
	}
	
}
const vFixed = {
	inserted(el,binding){
		var
			t = 0,
			_el = el,
			cb,
			offset = parseInt(binding.arg) || 0;
		do{
			t += _el.offsetTop;
			_el = _el.offsetParent;
		}while(_el);
		cb = watchScroll(t,el,offset,binding.value);
		// alert(10)
		window.addEventListener('scroll',cb,false);
		document.body.addEventListener('scroll',cb,false);
		document.documentElement.addEventListener('scroll',cb,false);

		document.addEventListener('touchmove',cb,false);
		document.body,addEventListener('touchmove',cb,false);
	}
};



export default {
	install(Vue){
		Vue.prototype.$formatImgSrc = formatImgSrc;
		Vue.prototype.$copy = copy;
		Vue.prototype.$top = top;
		Vue.directive('fixed',vFixed);
	}
}