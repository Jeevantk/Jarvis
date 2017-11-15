/**
* @Author: aravind
* @Date:   2017-11-08T14:53:23+05:30
* @Last modified by:   aravind
* @Last modified time: 2017-11-08T14:53:23+05:30
*/



var express = require('express');
var router = express.Router();
var controller = require('./controller');

// Identify emotion
router.post('/identify', controller.emotionIdentify);

module.exports = router;
