'use strict';

const Https = require('https')
// const logger = require('../utils/logger').logger('WxProtocol')

class WxProtocol {

    static getResourceFromWx(url) {
        return new Promise((resolve, reject) => {
            Https.get(url, res => {
                var len = 0;
                var chunks = [];
                res.on('data', chunk => {
                    chunks.push(chunk);
                    len += chunk.length;
                });

                res.on('end', () => {
                    var body = Buffer.concat(chunks, len);
                    var data = JSON.parse(body.toString()); //微信回调数据
                    resolve(data);
                })
            }).on('error', function(e){
                // logger.warn('Get resourece from wx error. ' + e.message);
                reject(e);
            });
        });
    }

}

module.exports = WxProtocol;