var contacts = angular.module('contacts',[]);

contacts.controller('main', function($scope, $http) {

	$scope.contact = {};

	$scope.save = function() {
		$http.post('/login/save', $scope.contact)
			.then(function(res) {
				alert('SUCCESS !');
			}, function(err) {
				alert('ERROR !');
			});
	};

});

contacts.controller('show',function($scope,$http){
	 		$http.get('/login/all')
	 		.success(function(response){
				$scope.resdata=response.resdata;
			//	alert('success');
			});
});

contacts.controller('register',function($scope,$http){

    $scope.regdata = {};

    $scope.submit = function() {
       $http.post('/reg/submit',$scope.regdata)
         .then(function(res) {
         	alert('data saved.');
         }, function(err){
         	alert('something wrong happened!');
         });
    };


});
