
const express 					= require('express');
const {check, validationResult} = require('express-validator');
const userModel				= require.main.require('./models/userModel');
const router 					= express.Router();

router.get('/create', (req, res)=>{
	res.render('employee/create'); 
})

router.post('/create',[
	check('username','User Name can not be null').not().isEmpty().trim().escape(),
	check('password','Password can not be null').not().isEmpty().trim().escape(),
	check('type','User Type can not be null').not().isEmpty().trim().escape(),
	check('designation','Designation can not be null').not().isEmpty().trim().escape(),
	check('contactNumber','Contact Number can not be null').not().isEmpty().trim().escape(),
    check('email','User Emailcan not be null').not().isEmpty().trim().escape(),
    check('salary','salary can not be null').not().isEmpty().trim().escape(),
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		const alerts= errors.array();
		res.render('employee/create',{alerts}); 
	}else{

		var employee = {
			username                : 	req.body.username,
			password                : 	req.body.password,
			type                    : 	req.body.type,
			designation             : 	req.body.designation,
			contactNumber	        : 	req.body.contactNumber,
            email                   : 	req.body.email,
            salary                  : 	req.body.salary
            
		};

		userModel.insert(employee, function(status){
			if(status){
				res.redirect('/manager_home/employee');
			}else{
				res.redirect('/employee/create');
			}
		});
	}
})

router.get('/edit/:id', (req, res)=>{

	
	userModel.getById(req.params.id,function(result){

		var employee ={
			username                : 	result.username,
			password                : 	result.password,
			type                    : 	result.type,
			designation             : 	result.designation,
			contactNumber 		    : 	result.contactNumber,
            email                   : 	result.email,
            salary                  : 	result.salary
    
		};

		res.render('employee/edit', employee);
	});
})


router.post('/edit/:id', (req, res)=>{

	var employee = {
		id		                :	req.params.id,
		username                : 	req.body.username,
		password                : 	req.body.password,
		type                    : 	req.body.type,
		designation             : 	req.body.designation,
		contactNumber           : 	req.body.contactNumber,
        email	                : 	req.body.email,
        salary	                : 	req.body.salary
	};
	userModel.update(employee, function(status){
		
		if(status){
			res.redirect('/manager_home/employee');
		}else{
			res.render('employee/edit', employee);
		}
	});
})

router.get('/delete/:id', (req, res)=>{
	userModel.getById(req.params.id,function(result){

		var employee ={
			username                : 	result.username,
			password                : 	result.password,
			type                    : 	result.type,
			designation             : 	result.designation,
			contactNumber 		    : 	result.contactNumber,
            email                   : 	result.email,
            salary                  : 	result.salary
    
		};

		res.render('employee/delete', employee);
	});

})

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/manager_home/employee');
		}
	});
	
})

router.post('/search',(req,res)=>{
	var employee = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	userModel.search(employee, function(results){
		if(results){
			res.json({employee: results});
		}else{
			res.json({employee:'error'});
		}
	});
});

module.exports = router;