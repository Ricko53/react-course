const path = require('path');

const config = {
  name: 'carzy-coach',
  //端口号配置
  port: 3000,
  // log 等级
  log4js: {
    level: "TRACE"
  },
  // fetch api
  apiProxy: 'http://119.23.52.44:8080',
  // xtpl page path
  views: path.join(__dirname, '../app/views/'),
  //log所在的目录
  secret: 'ilovera',
  // redis 注入
  redis: [{
    port: 6379,
    host: '127.0.0.1',
  }],
  // 微信 ID
  wechat: {
    appId: 'wx74eb07a4a081df00',
    secret: '1949c15710dc6d117b6a0aab9b40e955',
    token: 'coach',
  }
};

module.exports = config;