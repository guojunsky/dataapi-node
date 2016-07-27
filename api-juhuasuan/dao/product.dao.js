var dbaConn = require('./dba-conn');
var Q = require('q');


function ProductDao() {
    this.conn = dbaConn.getInstance();
}

ProductDao.prototype.query  =function(sql,params){
	var defer = Q.defer();
    var connectPromise = this.conn.connect();
    connectPromise.then(function(connect){
         var query = connect.query(sql,params,function(error,result){
         	if(error){
         		defer.reject(error);
         	}
         	connect.release();
         	defer.resolve(result);

         });
         console.log(query.sql);


    },function(message,err){
    	console.log(err);
        defer.reject(message);
    });
    return defer.promise;
}
/**
 * 获取列表
 * @return {[type]} [description]
 */
ProductDao.prototype.getList = function() {
     return this.query('select * from product where makeArea <> ? and imgs <> "//g.alicdn.com/s.gif"  order by id desc limit ?,?',['',0,50]); 
}

ProductDao.prototype.saveProduct =function(product){

   return this.query('INSERT INTO product SET ?',product);
}

module.exports = ProductDao;
