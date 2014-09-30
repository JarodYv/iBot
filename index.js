/**
 * Created by Jarod Yv on 9/29/14.
 */
var request = require('request');
var crypto = require('crypto');

var iBot = function (key, secret) {
    this.xAuth = '';
    // Calculate the signature
    crypto.randomBytes(20, function (ex, buf) {
        var nonce = buf.toString('hex');
        console.log(nonce);

        var hash1 = crypto.createHash('sha1');

        hash1.update(key + ':xiaoi.com:' + secret);
        var HA1 = hash1.digest('hex');

        var hash2 = crypto.createHash('sha1');
        hash2.update('POST:/ask.do');
        var HA2 = hash2.digest('hex');

        var hash3 = crypto.createHash('sha1');
        hash3.update(HA1 + ':' + nonce + ':' + HA2);
        var signature = hash3.digest('hex');
        console.log(sign);

        this.xAuth = 'app_key="' + key + '",nonce="' + nonce + '",signature="' + signature + '"';
        console.log(this.xAuth);
    });
};

iBot.prototype.listen = function (uid, question, callback) {
    var option = {
//        url: 'http://nlp.xiaoi.com/robot/ask',
//        url: 'http://nlp.xiaoi.com/robot/ask.action',
        url: 'http://nlp.xiaoi.com/ask.do',
        headers: {
            'X-Auth': this.xAuth
        },
        form: {
            userId: uid,
            question: question,
            type: 0,
            platform: 'custom'
        }
    };

    request.post(option, function (err, res, body) {
        if (err)
            return callback(err);
        callback(err, body, body);
    });
};

module.exports = iBot;