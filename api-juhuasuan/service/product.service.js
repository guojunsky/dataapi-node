var ProductDao = require('../dao/product.dao');
var CONFIG = require('../constants/config').CONFIG;
var request =require('request');
var cheerio=require('cheerio');
var pDao = new  ProductDao();
var fs = require('fs');
var dir = require('path').resolve('service');

exports.getProductList = function() {
	 return pDao.getList();
}

exports.asycData = function(callback){
   

   fs.readFile(dir+'/data.html',function(error,data){
   	   if(error){
   	   	  return callback(error);
   	   }
   	   var pps = toObj(data.toString());

   	   pps.forEach(function(v){

           pDao.saveProduct(v).then(function(row){
           	 console.log('kokokok')
           });
   	   });
       callback('success full');
   });

   var toObj = function(html){
   	   var $ = cheerio.load(html);
	   
	   var floors = [5,6,7,8,9,10].map(function(v){
	       return '#floor'+v;
	   }); 
	   
	   //获取每一楼数据
	   var productList = [];

	   floors.forEach(function(v){
	   	       console.log(v);
	   	       var pp = alas($,$(v).find('.h5-items-s'));

	   	      productList = productList.concat(pp);
	           
	   });
	   return productList;
   }
   
}

function alas($,$list){
	 var pps = [];

	  $list.each(function(v){
          var  p =new Object();
          p.imgs =  $(this).find('.item-pic img').attr('src');
          p.pname = $(this).find('.item-info .good-name').text();
          p.pdesc = $(this).find('.item-info .merit').text();
          p.price = $(this).find('.item-info .promote-price-flex').text().match(/\d+(\.\d)?/)[0];
          p.oprice = $(this).find('.item-info .cost-price del').text();
          p.createTime = new Date();
          p.updateTime = new Date();
          p.stock = $(this).find('.buy-count em').text();
          p.context= '';
          p.makeArea = $(this).find('.t1').text();
          p.toArea = $(this).find('.t3').text();
          p.color = $(this).find('a').css('background');
          pps.push(p);
	});
	  return pps;
}