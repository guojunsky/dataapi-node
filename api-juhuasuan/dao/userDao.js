var dbaConn = require('./dba-conn');


function UserDao() {
    this.conn = dbaConn.getInstance();
}


 
UserDao.prototype.getList = function(callback) {

    this.conn.connect(function(conn) {
        conn.query('select * from user', {}, function(err, rows) {
            if (!err) {
                callback(rows);
            }
        });
    });
}

module.exports = UserDao;
