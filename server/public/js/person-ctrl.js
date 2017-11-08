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

    $scope.identifyPersonFromFace = function(obj) {
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

        $http(req).
        then(function(response) {
            // console.log(response);
            var data = response.data;
            if (data == '__unknown__') {
                alert('Unknown');
            } else {
                alert(data.name);
            }
        }, function(err) {
            console.log(err);
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
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            fileFormDataName: 'uploaded',
            sendFieldAs: 'form',
            file: files,
        });

        upload.then(function(response) {
            obj.url = response.data;
        }, function(err) {
            console.log(err);
        });
    };
});
