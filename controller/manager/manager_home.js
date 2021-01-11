const express 	    = require('express');
const pdfDocument	= require('pdfkit');
const fastCsv       = require('fast-csv');
var fs				= require('fs');
var pdf 			= require('html-pdf');
var html 			= fs.readFileSync('././views/manager_home/customer.ejs', 'utf8');
var options 		= { format: 'A4' };
const userModel     = require.main.require('././models/userModel');
const customerModel = require.main.require('././models/customerModel');
const productModel  = require.main.require('././models/productModel');
const leadsModel    = require.main.require('././models/leadsModel');
const campaignsmodel= require.main.require('././models/campaignsmodel');
const router 	    = express.Router();
router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var uname = req.cookies['uname'];
		res.render('manager_home/index',{uname});
	}else{
		res.redirect('/login');
	}
	/* console.log(req.cookies['uname']);
	var uname = req.cookies['uname'];
	console.log(uname);
	res.render('accountingSellsHome/index',{uname}); */
})

router.get('/customer', (req, res)=>{

	customerModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/customer', {customerList: results, uname});
	});

})
router.get('/pdf', (req, res)=>{


	pdf.create(html, options).toFile('assets/uploads/customerList.pdf', function (err, res) {
        if (err) { return console.log(err); }
        else {
            console.log(res); // { filename: '/app/businesscard.pdf' } 
            // var datafile = fs.readFileSync('assets/uploads/invoice.pdf');
            // res.header('content-type', 'application/pdf');
            // res.send(datafile);
        }
	});
	customerModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/customer', {customerList: results, uname});
	});

})

router.get('/user', (req, res)=>{

	userModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/user', {userList: results, uname});
	});

})
router.get('/pdf', (req, res)=>{


	pdf.create(html, options).toFile('assets/uploads/userList.pdf', function (err, res) {
        if (err) { return console.log(err); }
        else {
            console.log(res); // { filename: '/app/businesscard.pdf' } 
            // var datafile = fs.readFileSync('assets/uploads/invoice.pdf');
            // res.header('content-type', 'application/pdf');
            // res.send(datafile);
        }
	});
	userModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/user', {userList: results, uname});
	});

})




router.get('/leads', (req, res)=>{

	leadsModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/leads', {leadsList: results, uname});
	});

})
router.get('/pdf', (req, res)=>{


	pdf.create(html, options).toFile('assets/uploads/leadsList.pdf', function (err, res) {
        if (err) { return console.log(err); }
        else {
            console.log(res); // { filename: '/app/businesscard.pdf' } 
            // var datafile = fs.readFileSync('assets/uploads/invoice.pdf');
            // res.header('content-type', 'application/pdf');
            // res.send(datafile);
        }
	});
	leadsModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/leads', {leadsList: results, uname});
	});

})



router.get('/product', (req, res)=>{

	productModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/product', {productList: results, uname});
	});

})
router.get('/pdf', (req, res)=>{


	pdf.create(html, options).toFile('assets/uploads/productList.pdf', function (err, res) {
        if (err) { return console.log(err); }
        else {
            console.log(res); // { filename: '/app/businesscard.pdf' } 
            // var datafile = fs.readFileSync('assets/uploads/invoice.pdf');
            // res.header('content-type', 'application/pdf');
            // res.send(datafile);
        }
	});
	productModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/product', {productList: results, uname});
	});

})


router.get('/eventinfo', (req, res)=>{

	campaignsmodel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/eventinfo', {eventList: results, uname});
	});

})


router.get('/employee', (req, res)=>{

	userModel.getAll(function(results){
		console,console.log(results);
		var uname = req.cookies['uname'];
		res.render('manager_home/employee', {userList: results, uname});
	});

})


router.get('/profile', (req, res)=>{
	var uname = req.cookies['uname'];
	res.render('manager_home/profile', {uname}); 
});

module.exports = router;