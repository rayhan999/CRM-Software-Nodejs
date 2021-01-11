const express 					= require('express');
const {check, validationResult} = require('express-validator');
const campaignsmodel				= require.main.require('./models/campaignsmodel');
const router 					= express.Router();

router.get('/create', (req, res)=>{
	res.render('eventinfo/create'); 
})

router.post('/create',[
	check('eventname','Event name can not be null').not().isEmpty().trim().escape(),
	check('eventdate','EventDate can not be null').not().isEmpty().trim().escape(),
	check('expiredate','ExpireDate can not be null').not().isEmpty().trim().escape(),
	check('eventdescription','Description can not be null').not().isEmpty().trim().escape(),
	check('eventstatus','Status can not be null').not().isEmpty().trim().escape()
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		const alerts= errors.array();
		res.render('eventinfo/create',{alerts}); 
	}else{

		var eventinfo = {
			eventname           : 	req.body.eventname,
			eventdate	        : 	req.body.eventdate,
			expiredate          :	req.body.expiredate,
			eventdescription    : 	req.body.eventdescription,
			eventstatus         : 	req.body.eventstatus,
			audience            : 	req.body.audience
			
		};

		campaignsmodel .insert(eventinfo, function(status){
			if(status){
				res.redirect('/manager_home/eventinfo');
			}else{
				res.redirect('eventinfo/create');
			}
		});
	}
})

router.get('/edit/:eventid', (req, res)=>{
	
	campaignsmodel.getById(req.params.eventid,function(result){

		var eventinfo ={
		   eventname               : 	result.eventname,
           eventdate	           : 	result.eventdate,
           expiredate              : 	result.expiredate,
		   eventdescription        : 	result.eventdescription,
           eventstatus             : 	result.eventstatus,
            audience               : 	result.audience
			
		};

		res.render('eventinfo/edit', eventinfo);
	});
})


router.post('/edit/:eventid', (req, res)=>{

	var eventinfo = {
		eventid		           :	req.params.eventid,
		eventname              : 	req.body.eventname,
        eventdate              : 	req.body.eventdate,
        expiredate             :	req.body.expiredate,
		eventdescription       : 	req.body.eventdescription,
        eventstatus            : 	req.body.eventstatus,
        audience               : 	req.body.audience
		
	};
	campaignsmodel .update(eventinfo, function(status){
		
		if(status){
			res.redirect('/manager_home/eventinfo');
		}else{
			res.render('eventinfo/edit', eventinfo);
		}
	});
})

router.get('/delete/:eventid', (req, res)=>{
	campaignsmodel.getById(req.params.eventid,function(result){

		var eventinfo ={
			eventname               : 	result.eventname,
			eventdate	           : 	result.eventdate,
			expiredate              : 	result.expiredate,
			eventdescription        : 	result.eventdescription,
			eventstatus             : 	result.eventstatus,
			 audience               : 	result.audience
			 
		 };

		res.render('eventinfo/delete', eventinfo);
	});

})

router.post('/delete/:eventid', (req, res)=>{
	
	campaignsmodel.delete(req.params.eventid,function(status){
		if(status){
			res.redirect('/manager_home/eventinfo');
        }
	});
	
})

router.post('/search',(req,res)=>{
	var eventinfo = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	campaignsmodel.search(eventinfo, function(results){
		if(results){
			res.json({eventinfo: results});
		}else{
			res.json({eventinfo:'error'});
		}
	});
});


module.exports = router;