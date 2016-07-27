var express = require('express');
var router = express.Router();
 
var serviceProduct = require('../service/product.service');


/* GET home page. */
router.get('/product', function(req, res, next) {
	 serviceProduct.getProductList().then(function(rows){
	 	res.json(JSON.stringify(rows));
	 },function(error){
         res.send(error);
	 });
});


router.get('/async',function(req,res,next){
     var data = serviceProduct.asycData(function(data){
     	 res.json(data);
     });
    
});
module.exports = router;
