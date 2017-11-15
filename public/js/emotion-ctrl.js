/**
 * @Author: aravind
 * @Date:   2017-11-15T21:20:19+05:30
 * @Last modified by:   aravind
 * @Last modified time: 2017-11-15T21:20:19+05:30
 */




var app = angular.module('fid-app', ['ngFileUpload', 'ui-notification']).config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'left',
        positionY: 'bottom'
    });
});


app.controller('emotionCtrl', function($scope, $http, Upload, $window, Notification) {
    $scope.DETECTED_TIME_INTERVAL = 10; // seconds

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
            obj.url = response.data[0];
            return obj;
        }, function(err) {
            console.log(err);
            return err;
        });
    };

    $scope.identifyEmotionFromFace = function(obj, out) {
      var req = {
          method: 'POST',
          url: '/api/emotion/identify',
          data: obj,
          headers: {
              'Content-Type': 'application/json'
          }
      };

      return $http(req);
    }

});
