angular.module('rmq.app', [])
  .controller('home', function($scope, $http) {
    $scope.greeting = {id: 'xxx', content: 'Hello World!'}
    $scope.rpcText = "test rpc";
    $scope.pubsubText = "test pubsub";
    $scope.routingText = "test routing";
    $scope.routingService = "dicom";
    $scope.responses = [];
    
    $scope.onRpc = function() {
    	$http.get('http://localhost:8080/rpc/call?name='+$scope.rpcText).
    		then(function(response) {
    			$scope.responses.push(response.data)
    	});
    }

    $scope.onPubsub = function() {
    	$http.get('http://localhost:8080/pubsub/call?name='+$scope.pubsubText)
    }
    $scope.onRouting = function() {
    	$http.get('http://localhost:8080/routing/call/'+$scope.routingService+'?name='+$scope.routingText)
    }
})
