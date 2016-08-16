var express = require('express');
var router = express.Router();
var baidumap = require('../service/baidumap');
var eleme = require('../service/eleme');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {

	baidumap.getLocation('漕河泾实业大厦', '上海', function(err, location) {
		if (err) {
			return next(err);
		}
		eleme.getRestaurants(location.lat, location.lng, config.API_ELEME_GEOHASH, 20, 0, function(err, json) {
			if (err) {
				return next(err);
			}
			res.render('index', { restaurants: json });
		});
	});
});

/* GET home page. */
// router.get('/search', function(req, res, next) {
// 	var place = req.query.place;
// 	var place = req.query.place;
// 	baidumap.getLocation(place, , function(err, location) {
// 		if (err) {
// 			return next(err);
// 		}
// 		eleme.getRestaurants(location.lat, location.lng, config.API_ELEME_GEOHASH, 20, 0, function(err, json) {
// 			if (err) {
// 				return next(err);
// 			}
// 			res.render('index', { restaurants: json });
// 		});
// 	});
// });

module.exports = router;
