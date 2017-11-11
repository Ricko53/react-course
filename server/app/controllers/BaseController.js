'use strict';


class BaseController {

    /**
     * 检测是否移动端访问
     * @param callback
     */
    static checkMobileVisit(callback) {
        const deviceAgent = this.headers['user-agent'].toLowerCase(),
            agentID = deviceAgent.match(/(iphone|ipod|ipad|android|phone|pad|pod|mobile)/);
        if (agentID && callback) {
            callback.apply(this);
        }
    }
    
}

module.exports = BaseController;