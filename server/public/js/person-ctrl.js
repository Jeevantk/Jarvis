/**
 * @Author: aravind
 * @Date:   2017-11-08T20:27:55+05:30
 * @Last modified by:   aravind
 * @Last modified time: 2017-11-08T20:27:56+05:30
 */



var app = angular.module('fid-app', ['ngFileUpload']);

app.controller('personCtrl', function($scope, $http, Upload, $window) {
    $scope.ping = function() {
        $http.get('//freegeoip.net/json/').then(function(response) {
            var req = {
                method: 'POST',
                url: '/data',
                data: {
                    "data": response.data
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req).
            then(function(response) {}, function(err) {
                console.log(err);
            });
        });
    }

    $scope.resetPerson = function() {
        $scope.person = {
            rawurls: "",
            url: []
        };
    }

    $scope.resetIdentifyQuery = function() {
        $scope.identifyQueryObj = {
            url: "",
            confidenceThreshold: 0.7,
            inputType: 'url'
        };

        $scope.identifyResultObj = {
          name: "not-yet-identified",
          userData: null
        };
    }

    $scope.resetPersonGroupTrain = function() {
        $scope.personGroupTrain = {
            status: {
                status: 'unknown'
            }
        };
    }

    $scope.resetPersonCreate = function() {
        $scope.personGroup = {};
    }

    $scope.identifyPersonFromFace = function(obj, out) {
        if (obj.url instanceof Array) {
            obj.url = obj.url[0];
        }

        var req = {
            method: 'POST',
            url: '/api/person/group/identify',
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return $http(req).
        then(function(response) {
            var data = response.data;
            // console.log(data);
            if (data == '__unknown__') {
                out.name = 'unknown';
                out.userData = null;
                return out;
            } else {
              for (key in data) {
                out[key] = data[key];
              }
              return out;
            }
        }, function(err) {
            console.log(err);
            return err;
        });
    }

    $scope.createPersonFromFaces = function(obj) {
        var urls = obj.rawurls.trim();
        obj.url = obj.url.concat(urls.split(',')).join(',');

        var req = {
            method: 'POST',
            url: '/api/person/create',
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).
        then(function(response) {
            // console.log(response);
            alert('Done');
            $scope.resetPerson();
        }, function(err) {
            console.log(err);
        });
    }

    $scope.createPersonGroup = function(obj) {
        var req = {
            method: 'POST',
            url: '/api/person/group/create',
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).
        then(function(response) {
            alert(response.data);
        }, function(err) {
            console.log(err);
        });
    }

    $scope.trainPersonGroup = function(obj) {
        var req = {
            method: 'POST',
            url: '/api/person/group/' + obj.personGroupId + '/train',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).
        then(function(response) {
            alert(response.data);
        }, function(err) {
            console.log(err);
        });
    }

    $scope.getPersonGroupTrainingStatus = function(obj) {
        var req = {
            method: 'GET',
            url: '/api/person/group/' + obj.personGroupId + '/training-status',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).
        then(function(response) {
            console.log(response);
            $scope.personGroupTrain.status = response.data;
        }, function(err) {
            console.log(err);
        });
    }

    $scope.uploadFile = function(files, obj) {
        var upload = Upload.upload({
            url: 'http://13.127.11.214:3000/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            fileFormDataName: 'uploaded',
            sendFieldAs: 'form',
            file: files,
        });

        return upload.then(function(response) {
            obj.url = response.data;
            // console.log(obj);
            return obj;
        }, function(err) {
            console.log(err);
            return err;
        });
    };
});
