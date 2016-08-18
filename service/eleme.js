var config = require('../config');
var request = require('request');



// https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wtw376s8gs5&latitude=31.17111&limit=1&longitude=121.43822&offset=0


/**
 * 取附近餐馆的信息
 * @param  {[type]} lat     纬度
 * @param  {[type]} lng     精度
 * @param  {[type]} geohash 地理位置hash	
 * @param  {[type]} limit   取得数量限制
 * @param  {[type]} offset  偏移量
 * @return {[type]}         
 */
var getRestaurants = function(lat, lng, geohash, limit, offset, callback) {
	var url = config.API_ELEME_BASE + config.API_ELEME_RESTAURANTS;
	var params = [];
	params.push('extras%5B%5D=activities');
	params.push('geohash=' + geohash);
	params.push('latitude=' + lat);
	params.push('longitude=' + lng);
	params.push('limit=' + limit);
	params.push('offset=' + offset);

	var paramsStr = params.join('&');

	url = url + '?' + paramsStr;

	console.log(url);

	request.get(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		if (res.statusCode==200) {
			var json = JSON.parse(body);
			callback(null, json);
		} else {
			callback(new Error('request error : ' + res.statusCode));
		}
	});
}


// https://www.ele.me/restapi/v2/pois?extras%5B%5D=count&geohash=wtw3sjq6n6um&keyword=%E6%BC%95%E6%B2%B3%E6%B3%BE%E5%AE%9E%E4%B8%9A%E5%A4%A7%E5%8E%A6&limit=20&type=nearby

/**
 * 查询位置资料
 * @param  {[type]} keyword 地点位置关键字
 * @param  {[type]} limit   每次访问返回条数
 * @param  {[type]} type    目前就知道个nearby，不知道还有什么其他类型
 * @return {[type]}         [description]
 * {
 * 	address: "上海市徐汇区漕东支路85号"
	city: "上海市"
	city_id: 1
	geohash: "wtw376s8gs5"
	id: "3876643383217503270"
	latitude: 31.17111
	longitude: 121.43822
	name: "漕河泾实业大厦"
	request_id: "124251014252f5a531829f4f9dbe2cac824c8cac789a"
	short_address: "漕东支路85号"
 * }
 */
var getPlace = function(geohash, keyword, limit, type, callback) {
	var url = config.API_ELEME_BASE + config.API_ELEME_POIS;
	var params = [];
	params.push('geohash=' + geohash)
	params.push('keyword=' + keyword);
	params.push('limit=' + limit);
	params.push('type=' + type);

	var paramsStr = params.join('&');

	url = url + '?' + paramsStr;

	console.log(url);

	request.get(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		if (res.statusCode==200) {
			// console.log(body);
			var json = JSON.parse(body);
			callback(null, json);
		} else {
			callback(new Error('request error : ' + res.statusCode));
		}
	});
}


// https://www.ele.me/restapi/v1/cities?type=guess
/**
 * 获取城市信息
 * @param  {[type]} type [group | guess] (根据首字母排序 | 根据ip地址猜你在哪)
 * @return {[type]}      [description]
 */
var getCities = function(type, callback) {
	var url = config.API_ELEME_BASE + config.API_ELEME_CITIES;
	var params = [];
	params.push('type=' + type);

	var paramsStr = params.join('&');

	url = url + '?' + paramsStr;

	console.log(url);

	request.get(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		if (res.statusCode==200) {
			var json = JSON.parse(body);
			callback(null, json);
		} else {
			callback(new Error('request error : ' + res.statusCode));
		}
	});
}

exports.getRestaurants = getRestaurants;
exports.getPlace = getPlace;
exports.getCities = getCities;