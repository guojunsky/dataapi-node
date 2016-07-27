var UserDao = require('../dao/userDao');
var userDao = new UserDao();

exports.getUserList = function (callback) {
	 
	 return userDao.getList(callback);
}