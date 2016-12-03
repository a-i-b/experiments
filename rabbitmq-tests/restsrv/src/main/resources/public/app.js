angular.module('rmq.app', [])
  .controller('home', function($rootScope, $scope, $http) {
    $scope.greeting = {id: 'xxx', content: 'Hello World!'}
    $scope.rpcText = "test rpc";
    $scope.pubsubText = "test pubsub";
    $scope.routingText = "test routing";
    $scope.routingService = "dicom";
    $scope.responses = [];
    $scope.stompClient = null;
    
    $scope.onRpc = function() {
    	$http.get('http://localhost:8080/rpc/call?name='+$scope.rpcText).
    		then(function(response) {
    			 $scope.showMessage(response.data)
    	});
    }

    $scope.onPubsub = function() {
    	$http.get('http://localhost:8080/pubsub/call?name='+$scope.pubsubText)
    }
    $scope.onRouting = function() {
    	$http.get('http://localhost:8080/routing/call/'+$scope.routingService+'?name='+$scope.routingText)
    }
        
    $scope.showMessage = function(message)  {
    	console.log(message);
    	$scope.responses.push(message)    
    }
    
    function connect() {
    	var socket = new SockJS('/myws');
    	$scope.stompClient = Stomp.over(socket);    	
//    	$scope.stompClient = Stomp.client('ws://localhost:8080/myws');
    	$scope.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            $scope.stompClient.subscribe('/topic/messages', function (data) {
            	$rootScope.$apply(function() {
            		 $scope.showMessage(JSON.parse(data.body));
            	});
            });
        });        
    }
  
    connect();
})
