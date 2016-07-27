var mysql = require('mysql');
var CONFIG = require('../constants/config').CONFIG;
var Q = require('q');

/**
 * 数据库连接
 */
function DbaConn() {
    this.conn = null;
    this.pool = mysql.createPool(Object.assign({}, CONFIG.db, {
        connectionLimit: 15
    }));
}
DbaConn.prototype.connect = function() {
    var deferred = Q.defer();
    this.pool.getConnection(function(err, connenct) {
        if (err) {
            deferred.reject('getConnection is error for mysql', err);
        }

        deferred.resolve(connenct);
       
    });
    return deferred.promise;
}

var conn = null;
DbaConn.getInstance = function() {

    if (!conn) {
        conn = new DbaConn();
    }

    return conn;
}
module.exports = DbaConn;
