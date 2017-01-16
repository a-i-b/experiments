angular.module('rmq.app', [])
  .controller('home', function($rootScope, $scope, $http) {
    $scope.previewStateText = "Start";
    $scope.previewState = false;
    $scope.responses = [];
    $scope.stompClient = null;
    $scope.resolutions = ['640x480@30', '800x600@30', '1280x720@30', '1280x720@11'];
    $scope.viewer = new MJPEGCANVAS.Viewer({
        divID : 'mjpeg',
        host : '127.0.0.1',
        port : 8080,
        width : 640,
        height : 480,
        topic : '/rpc/mjpg',
        interval : 50
      });

    $scope.onChangePreviewState = function() {
    	if(!$scope.previewState) {    		
        	$scope.viewer.changeSize($scope.singleSelect);
    	}
    	$http.get('http://localhost:8080/rpc/preview?isToStart='+(!$scope.previewState)+'&resolution=' + $scope.singleSelect).
    		then(function(response) {
    			var reply = response.data;
    			$scope.previewState = reply.isStarted;
    			$scope.previewStateText = $scope.previewState ? "Stop" : "Start";
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
  
   // connect();
})
