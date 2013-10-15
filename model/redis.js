/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-29
 * Time: 下午5:17
 * To change this template use File | Settings | File Templates.
 */
var generic_pool = require("generic-pool");

//noinspection JSValidateTypes
var redis = generic_pool.Pool({
    name: 'redis',
    max: 10,
    min: 2,
    idleTimeoutMillis:30000,
    create:function(callback){
        var redisClient = require("redis").createClient('6379','172.19.103.14');
        callback(null,redisClient);
    },
    destroy:function(redisClient){
        redisClient.quit();
    }
});
module.exports = redis;
