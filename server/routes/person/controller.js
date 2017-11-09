/**
* @Author: aravind
* @Date:   2017-11-08T15:01:30+05:30
* @Last modified by:   aravind
* @Last modified time: 2017-11-08T15:01:30+05:30
*/



const MSCSFACEAPI = require("mscs-face-api");
const settings = require('../settings');
var api = new MSCSFACEAPI(settings.mscs_api_key,"WCUS");
var Person = require('./model');
var Q = require('q');
var _ = require('underscore');

exports.personCreate = function(req, res) {
  var name = req.body.name, url = req.body.url.split(','), data = req.body.data;
  var personGroupId = req.body.personGroupId;
  api.createPerson(personGroupId, name, req.body.data).then(function(personId) {
    var plist = [];
    for(var i = 0; i < url.length; ++i) {
      plist.push(api.detectFace(url[i]));
    }
    Q.all(plist).then(function(arr) {
      // one face per image
      var faces = _.flatten(arr, true);
      var faceIds = _.map(faces, function (ele) {
        return ele.faceId;
      });
      var plist = [];
      for(var i = 0; i < faceIds.length; ++i) {
        plist.push(api.addPersonFace(personGroupId, personId, "", url[i]));
      }
      Q.all(plist).then(function(ret) {
        // console.log(ret[0]);
        res.send(ret[0]);
      }, function(err) {
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });
  }, function(err) {
    res.send(err);
  });
}

exports.personGroupCreate = function(req, res) {
  api.createPersonGroup(req.body.id, req.body.name).then(function() {
    res.send('OK');
  }, function(err) {
    res.send(err);
  });
}

exports.personGroupTrain = function(req, res) {
  var personGroupId = req.params.personGroupId;
  api.trainPersonGroup(personGroupId).then(function() {
    res.send('OK');
  }, function(err) {
    res.send(err);
  });
}

exports.personGroupTrainingStatus = function(req, res) {
  var personGroupId = req.params.personGroupId;
  api.getPersonGroupTrainingStatus(personGroupId).then(function(data) {
    res.send(data);
  }, function(err) {
    res.send(err);
  });
}

exports.personGroupIdentify = function(req, res) {
  var personGroupId = req.body.personGroupId;
  var confidenceThreshold = parseFloat(req.body.confidenceThreshold);
  var plist = [];
  var url = req.body.url.split(',');
  for(var i = 0; i < url.length; ++i) {
    plist.push(api.detectFace(url[i]));
  }
  Q.all(plist).then(function(arr) {
    var faces = _.flatten(arr, true);
    var faceIds = _.map(faces, function (ele) {
      return ele.faceId;
    });
    api.identifyFace(personGroupId, faceIds, confidenceThreshold).then(function(arr) {
      if(!arr.length) {
        res.send('__unknown__');
      } else {
        // TODO check these zero-index accesses
        var personId = arr[0].candidates[0]["personId"];
        api.getPerson(personGroupId, personId).then(function(obj) {
          // Transferring state back in response like OAuth APIs
          obj.state = req.body.state;
          res.send(obj);
        }, function(err) {
          res.send(err);
        });
      }
    }, function(err) {
      res.send(err);
    });
  }, function(err) {
    res.send(err);
  });
}
