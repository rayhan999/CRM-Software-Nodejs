const express 		= require('express');
const pdfDocument	= require('pdfkit');
var fs				= require('fs');
var pdf 			= require('html-pdf');
var html 			= fs.readFileSync('././views/manager_home/leads.ejs', 'utf8');
var options 		= { format: 'A4' };
const customerModel	= require.main.require('././models/leadsModel');
const {check, validationResult} = require('express-validator');
const router 		= express.Router();

router.get('/create', (req, res)=>{
	res.render('leads/create'); 
})

router.post('/create',[
	check('name','Leads Name can not be null').not().isEmpty().trim().escape(),
	check('email','Email can not be null').not().isEmpty().trim().escape(),
	check('phone','Contact Number can not be null').not().isEmpty().trim().escape(),
	check('status','Status can not be null').not().isEmpty().trim().escape(),
	check('gender','Gender can not be null').not().isEmpty().trim().escape(),
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		const alerts= errors.array();
		res.render('leads/create',{alerts}); 
	}else{

		var leads = {
			name            : 	req.body.name,
			email   : 	req.body.email,
			phone        : 	req.body.phone,
			status	        : 	req.body.status,
			gender	        : 	req.body.gender
		};

		leadsModel.insert(leads, function(status){
			if(status){
				res.redirect('/manager_home/leads');
			}else{
				res.redirect('/leads/create');
			}
		});
	}
})

router.get('/edit/:id', (req, res)=>{

	
	leadsModel.getById(req.params.id,function(result){

		var leads ={
			name            : 	result.name,
			email           : 	result.email,
			phone           : 	result.phone,
			status          : 	result.status,
			gender  		: 	result.gender
			
		};

		res.render('leads/edit', leads);
	});
})


router.post('/edit/:id', (req, res)=>{

	var leads = {
		id		                :	req.params.id,
		name                    : 	req.body.name,
		email                   : 	req.body.email,
		phone                   : 	req.body.phone,
		status	                : 	req.body.status,
		gender	                : 	req.body.gender
		
	};
	leadsModel.update(leads, function(status){
		
		if(status){
			res.redirect('/manager_home/leads');
		}else{
			res.render('leads/edit', leads);
		}
	});
})

router.get('/delete/:id', (req, res)=>{
	leadsModel.getById(req.params.id,function(result){

		var leads ={
			name            : 	result.name,
			email           : 	result.email,
			phone           : 	result.phone,
			status          : 	result.status,
			gender   		: 	result.gender
			
		};

		res.render('leads/delete', leads);
	});

})

router.post('/delete/:id', (req, res)=>{
	
	leadsModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/manager_home/leads');
		}
	});
	
})

router.post('/search',(req,res)=>{
	var leads = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	leadsModel.search(leads, function(results){
		if(results){
			res.json({leads: results});
		}else{
			res.json({leads:'error'});
		}
	});
});

module.exports = router;