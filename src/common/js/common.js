// 后台api的域名本地 

var apiDomain = 'https://www.4ry.cn/api/'
// var apiDomain = 'http://apitest.hnllhy.cn/api/'
var center = "https://www.liulianhyu.com/api/"
// var center = "http://apitest.hnllhy.cn/api/"
var apiDomain_go = "https://risedragon.hnllhy.cn/llpassport/api/"





// 支付接口
// var apiPayUrl = 'https://www.4ry.cn/'
var apiPayUrl = 'https://risedragon.hnllhy.cn/llgamepay/'
// var apiPayUrl = 'http://8.129.25.113:24101/'






// 获取指定的URL参数值
function getQueryString(name) {
	if (name == 'code') {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	} else {
		if (window.location.hash && window.location.hash.indexOf("?")>-1) {
			var idx = window.location.hash.indexOf("?");
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.hash.substr(idx + 1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		} else {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}
	}

}
function getModel(msg, str) {
	for (var i in msg) {
		if (msg[i].indexOf(str) > 0) {
			return i;
		}
	}
	return -1;
}
function formDate(time) {   //根据时间戳生成的时间对象
	let date = new Date(time);
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var d = date.getDate()
	var str = year + '-' + month + '-' + d
	return str
}
function formDate2(time) {   //根据时间戳生成的时间对象
	let date = new Date(time);
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var d = date.getDate()
	var hours = date.getHours()
	hours = hours >= 10 ? hours : "0" + hours
	var minute = date.getMinutes()
	minute = minute >= 10 ? minute : "0" + minute
	var second = date.getSeconds()
	second = second >= 10 ? second : "0" + second
	var str = year + '-' + month + '-' + d + ' ' + hours + '-' + minute + '-' + second
	return str
}
function isChinese(s) {
	return /[\u4e00-\u9fa5]/.test(s);
}
function ch2Unicdoe(str) {
	if (!str) {
		return;
	}
	var unicode = "";
	for (var i = 0; i < str.length; i++) {
		var temp = str.charAt(i);
		if (isChinese(temp)) {
			unicode += "\\u" + temp.charCodeAt(0).toString(16);
		} else {
			unicode += temp;
		}
	}
	return unicode;
}
export default {
	getQueryString,
	apiDomain,
	apiPayUrl,
	center,
	getModel,
	formDate,
	formDate2,
	ch2Unicdoe,
	apiDomain,
	apiDomain_go
}