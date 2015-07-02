var express = require('express');

var mongoJS = require('mongojs');

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

var db = mongoJS('contactList',['contactList']);

var app = express();

/* app.get("/", function(req, res){
	res.send("hello world");
}); */

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.listen(3000);

console.log("server runnning in 3000");

app.post("/contact", function(req1, res1){
	//console.log("post request");
	console.log(req1.body);
	db.contactList.insert(req1.body, function(err, doc){
		db.contactList.find(function(err, docs){
			res1.json(docs);
		});	
	});
	
	//res1.json({message: "success"});

});

app.delete('/contactList/:id', function(req, res){

	var id = req.params.id;
	console.log(id);

	db.contactList.remove( {_id: mongoJS.ObjectId(id)} , function(err, docs){

		db.contactList.find(function(err, docs){
			res.json(docs);
		});
	} );

});

app.put('/contactList/:id', function(req , res){
	var id = req.params.id;
	//console.log(id);
	//console.log(req.body);
	 db.contactList.findAndModify({query : {_id:mongoJS.ObjectId(id)}, update : {$set : {name : req.body.name}}, new : true}, function(err, docs){

			db.contactList.find(function(err, docs){
			res.json(docs);
		});

	} ) 

});

app.get('/edit/:id', function(req, res){
	
	var id = req.params.id;
	console.log(id);

	db.contactList.find({_id:mongoJS.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});

});

app.get('/contactList', function(req, res){

/*	var person1 = {
		name : 'roop',
		email : 'email@gmail.com',
		phone : '111-111-1111'
	};

	var person2 = {
		name : 'roop1',
		email : 'roop1@gmail.com',
		phone : '222-222-2222'
	};

	var person3 = {
		name : 'roop3',
		email : 'roop3@gmail.com',
		phone : '333-333-3333'
	};
*/
	db.contactList.find(function(err, docs){
		res.json(docs);
	});
	//console.log("i got get request");
	//var contacts = [person1, person2, person3];
	//res.json(contacts);

});







