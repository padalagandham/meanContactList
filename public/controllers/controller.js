angular.module("contactList",[]).controller('AppCtrl', function($scope, $http){
	
	$http.get('/contactList').success(function(res){
		$scope.contacts = res;
	});

	$scope.edit = function(id){
		console.log({_id:id});

		$http.get("/edit/"+id).success(function(res){
			console.log(res);
			$scope.contact = res[0];
		});
	};
	$scope.remove = function(id){
		$http.delete("/contactList/"+id).success(function(res){
			$scope.contacts = res;
		});
	},
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(res){

				$scope.contacts = res;

		});
	},
	$scope.addContact = function(){
		console.log("hello");
		console.log($scope.contact);	

		$http.post('/contact', $scope.contact).success(function(res){
			$scope.contacts = res;
		});

	};
});