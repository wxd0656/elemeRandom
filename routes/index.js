var express = require('express');
var router = express.Router();
var baidumap = require('../service/baidumap');
var eleme = require('../service/eleme');
var GeoHash = require('../service/geoHash');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
	eleme.getCities('guess', function(err, guessCity) {
		if (err) {
			return next(err);
		}
		res.render('index', { guessCity: guessCity });
	});

	// baidumap.getLocation('漕河泾实业大厦', '上海', function(err, location) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	eleme.getRestaurants(location.lat, location.lng, config.API_ELEME_GEOHASH, 40, 0, function(err, json) {
	// 		if (err) {
	// 			return next(err);
	// 		}
	// 		res.render('index', { restaurants: json });
	// 	});
	// });
});


router.get('/place', function(req, res, next) {
	var city = req.query.city;
	var place = req.query.place;
	var hash = GeoHash.encode(city.latitude, city.longitude);
	eleme.getPlace(hash, place, 10, 'nearby', function(err, places) {
		res.send({ places : places });
	});
});


router.get('/search', function(req, res, next) {
	var geoHash = req.query.geohash;
	var location = GeoHash.decode(geoHash);

	eleme.getRestaurants(location[0], location[1], geoHash, 40, 0, function(err, json) {
		if (err) {
			return next(err);
		}
		res.send({ restaurants: json });
	});
});

module.exports = router;
