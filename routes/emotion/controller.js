/**
 * @Author: aravind
 * @Date:   2017-11-08T15:01:30+05:30
 * @Last modified by:   aravind
 * @Last modified time: 2017-11-08T15:01:30+05:30
 */



const settings = require('../settings');
const cognitiveServices = require("cognitive-services");
const api = new cognitiveServices.emotion({
    apiKey: settings.mscs_api_key.emotion,
    endpoint: "westus.api.cognitive.microsoft.com"
});

var Q = require('q');
var _ = require('underscore');

exports.emotionIdentify = function(req, res) {
    var obj = {
        state: req.body.state
    };
    var headers = {
            "Content-Type": "application/json"
        },
        body = req.body;

    api.emotionRecognition({
        headers,
        body
    }).then(function(data) {
        obj.data = data;
        res.send(obj);
    }, function(err) {
        res.send(err);
    });
};
