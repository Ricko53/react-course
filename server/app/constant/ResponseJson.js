/**
 * 统一接口返回规范
 * {
 *   code: 2000000,
 *   msg: "ok"
 *   data: xxxx // 返回的数据放这里
 * }
 * Created by jin on 2017/11/18.
 */

var logger = require('../utils/logger').logger('ResponseJson');

module.exports = (function(){
    var _e = {};

    // state.code返回码枚举类型
    var _code = {
        success: 200,
        parameterError: 400, // 参数错误
        internalError: 500,  // 内部出错
        tokenExpired: 701,   // token 过期
        tokenMiss: 702,     // 需要token
    };
    // state.msg返回码对应的提示信息
    var _msg = [];
    _msg[_code.success] = 'success';
    _msg[_code.internalError] = 'Internal Error';
    _msg[_code.parameterError] = 'Parameter Error';
    _msg[_code.tokenExpired] = 'Token Expired';
    _msg[_code.tokenMiss] = 'Token Miss';

    /**
     * 格式化返回JSON字符串
     * @param code
     * @param data - 要返回的数据
     */
    _e.formatJson = function(code, data){
        code = code || _code.ok;

        var json = {
            code: code,
            msg: _msg[code],
            data: data || ''
        };
        var jsonStr = '';
        try {
            jsonStr = JSON.stringify(json);
        } catch(e) {
            logger.warn('e:' + e);
        }
        return jsonStr;
    };

    /**
     * 格式化返回对象
     * @param code
     * @param data - 要返回的数据
     */
    _e.format = function(code, data){
        code = code || _code.ok;
        
        var json = {
            code: code,
            msg: _msg[code],
            data: data || ''
        };
        return json;
    };

    _e.code = _code;
    return _e;
})();