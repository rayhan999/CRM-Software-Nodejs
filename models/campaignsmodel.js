const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true,results);
			}else{
				callback(false,results);
			}
		});
	},
	getById: function(id,callback){
		var sql = "select * from eventinfo where eventid='"+id+"'";
		db.getResults(sql,function(results){
			callback(results);
		})
	},
	getAll: function(callback){
		var sql = "select * from eventinfo";
		db.getResults(sql, function(results){
			console.log(results);
			callback(results);
		});

	},

	
	insert: function(eventinfo, callback){
		var sql = "insert into eventinfo VALUES ('', '"+eventinfo.eventname+"' , '"+eventinfo.eventdate+"' ,  '"+eventinfo.expiredate+"', '"+eventinfo.eventdescription+"', '"+eventinfo.eventstatus+"', '"+eventinfo.audience+"')";

		db.execute(sql, function(status){
			callback(status);
		});
	} ,
	update: function(eventinfo, callback){
		var sql = "update eventinfo set eventname='"+eventinfo.eventname+"' , eventdate='"+eventinfo.eventdate+"' , expiredate='"+eventinfo.expiredate+"', eventdescription='"+eventinfo.eventstatus+"', audience='"+eventinfo.audience+"'   where eventid = '"+eventinfo.eventid+"'";
		db.execute(sql, function(status){
			callback(status)
		});

    },
    delete: function(id, callback){
		var sql = "DELETE FROM product WHERE eventid = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},





	search: function(campaign, callback){
        var sql = "SELECT * FROM eventinfo WHERE "+campaign.searchBy+" LIKE '%"+campaign.search+"%'";
        console.log('oo');
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback(false);
            }
        });
    }
	
}