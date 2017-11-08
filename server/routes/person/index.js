/**
* @Author: aravind
* @Date:   2017-11-08T14:53:23+05:30
* @Last modified by:   aravind
* @Last modified time: 2017-11-08T14:53:23+05:30
*/



var express = require('express');
var router = express.Router();
var controller = require('./controller');

// Create a person given faces
router.post('/create', controller.personCreate);

// Person group APIs
router.post('/group/create', controller.personGroupCreate);
router.post('/group/train', controller.personGroupTrain);

router.post('/group/identify', controller.personGroupIdentify);

module.exports = router;
