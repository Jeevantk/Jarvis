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

    $scope.createPersonFromFaces = function(obj) {
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
        console.log(response);
      }, function(err) {
          console.log(err);
      });
    }

    $scope.uploadFile = function(files, callback, obj) {
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
          obj.url = response.data.join(',');
          callback(obj);
        }, function(err) {
            console.log(err);
        });
    };
});
