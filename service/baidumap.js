var request = require('request');
var config = require('../config');

/**
 * 利用百度地图api获取查询地址的经纬度
 * @param  {[type]}   query    查询关键字，地名等
 * @param  {[type]}   region   区域，北京、上海等
 * @param  {Function} callback 回调
 * {
 *    "lat":31.177437,   --纬度
 *    "lng":121.444418   --精度
 * }
 */
var getLocation = function(query, region, callback) {
	var url = config.API_BAIDU_MAP_BASE + config.API_BAIDU_MAP_SEARCH;
	var params = [];
	params.push('query=' + query);
	params.push('scope=1');
	params.push('region=' + region);
	params.push('output=json');
	params.push('ak=' + config.API_BAIDU_MAP_AK);

	var paramsStr = params.join('&');

	url = url + '?' + paramsStr;

	url = encodeURI(url);

	console.log(url);

	request.get(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		if (res.statusCode==200) {
			var json = JSON.parse(body);
			if (json.status==0) {
				var result = json.results[0];
				callback(null, result.location);
			} else {
				callback(new Error('get location error, status : ' + json.status + ' message : ' + json.message));
			}
		} else {
			callback(new Error('request error : ' + res.statusCode));
		}
	});
}

exports.getLocation = getLocation;

