/**
 * log4js
 * Created by Chenjr on 2015/12/17.
 * Update by jin on 2017/11/14.
 */

'use strict';

const Path = require('path');
const log4js = require('log4js');
const logFile = Path.join(__dirname, '../../log/debug.log');
const config = require('../../conf/config.js');

log4js.configure({
    appenders: {
        out: { type: 'console' },
        app: { 
            type: "dateFile",
            filename: logFile,
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false,
            maxLogSize: 1024
        }
    },
    categories: {
        default: { 
            appenders: [ 'out', 'app' ], 
            level: config.log4js.level // 'ALL' < 'TRACE' < 'DEBUG' < 'INFO' < 'WARN' < 'ERROR' < 'FATAL' < 'MARK'
        }
    }
});

/**
 *
 * @param type: i.e. index => [2015-12-17 11:13:51.723] [INFO] index - This is an index page!
 * @returns {*|{topic, should take a category and return a logger, log events}}
 */
exports.logger = function(type){
    var logger = log4js.getLogger(type);
    return logger;
};