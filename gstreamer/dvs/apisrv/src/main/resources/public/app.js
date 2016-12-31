angular.module('rmq.app', [])
  .controller('home', function($rootScope, $scope, $http) {
    $scope.previewStateText = "Start";
    $scope.previewState = 0;
    $scope.responses = [];
    $scope.stompClient = null;
    
    $scope.onChangePreviewState = function() {
    	$http.get('http://localhost:8080/rpc/preview?isToStart='+$scope.previewState).
    		then(function(response) {
    			var reply = response.data;
    			$scope.previewState = reply.started;
    			$scope.previewStateText = $scope.previewState == 1 ? "Stop" : "Start";
    	});
    }
 
    $scope.showMessage = function(message)  {
    	console.log(message);
    	$scope.responses.push(message)    
    }
    
    function connect() {
    	var socket = new WebSocket('ws://localhost:8080/myws');
    	$scope.stompClient = Stomp.over(socket);    	
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
