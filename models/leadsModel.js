const db = require('./db');

module.exports ={

	getById: function(id, callback){
		var sql = "select * from leads where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from leads";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(leads, callback){
		var sql = "insert into leads VALUES ('', '"+leads.name+"' , '"+leads.email+"' , '"+leads.phone+"' , '"+leads.status+"' , '"+leads.gender+"')";

		db.execute(sql, function(status){
			console.log(sql, status);
			callback(status);
		});
	} ,
	update: function(leads, callback){
		var sql = "update leads set name='"+leads.name+"' , email='"+leads.email+"' , phone='"+leads.phone+"' , status='"+leads.status+"' ,  gender='"+leads.gender+"' where id = '"+leads.id+"'";
		db.execute(sql, function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM leads WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	search: function(leads, callback){
		var sql = "SELECT * FROM leads WHERE "+leads.searchBy+" LIKE '%"+leads.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}