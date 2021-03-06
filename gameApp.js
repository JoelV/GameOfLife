function GameOfLife() {
	var currentState = [];

    this.printState = function() {
    	//this.printArray(this.currentState);
    	var str = ""
		_.each(currentState, function(i) {
			_.each(i, function(j) {
				str += " " + j;
			});
			str += "\n";
		});
		
		console.log(str);
		return str;
    }

	this.init = function(x, y) {
		//initialize arrays inside currentState
		for(var i = 0; i < x; i++) {
			currentState[i] = [];
			for(var j = 0; j < y; j++) {
				currentState[i][j] = 0;
			}
		}

		//this.printArray(this.currentState);
	}
	this.addAlive = function(x, y) {
		currentState[x][y] = 1;
	}
	this.numOfAliveNeighbors = function(x, y) {
		var count = 0;
		//console.log(x);
		if((x !== 0 && y !== 0)&& currentState[x-1][y-1] === 1) count++;
		if(y !== 0 && currentState[x][y-1] === 1) count++;
		if((x < currentState.length - 1 && y !== 0) && currentState[x+1][y-1] === 1) count++;
		if(x !== 0 && currentState[x-1][y] === 1) count++;
		if(x < currentState.length - 1 && currentState[x+1][y] === 1) count++;
		if((x != 0 && y < currentState[x].length) && currentState[x-1][y+1] === 1) count++;
		if(y < currentState[x].length - 1 && currentState[x][y+1] === 1) count++;
		if((x < currentState.length - 1 && y < currentState[x].length) && currentState[x+1][y+1] === 1) count++;
		return count;
	}
	this.tick = function() {
		var newState = [];
		/*
		for(var i = 0; i < this.currentState.length; i++) {
			newState[i] = [];
			for(var j = 0; j < this.currentState[i].length; j++) {
				newState[i][j] = 0;
			}
		}
        */
		_.each(currentState, function(arryI, i) {
			newState[i] = [];
			_.each(arryI, function(arryIJ, j){
				var aliveNeighbors = g1.numOfAliveNeighbors(i, j);
				if(arryIJ === 0 && aliveNeighbors === 3) newState[i][j] = 1;
				else if(arryIJ === 1) {
					if(aliveNeighbors > 3) newState[i][j] = 0;
					else if(aliveNeighbors === 3 || aliveNeighbors === 2) newState[i][j] = 1;
					else newState[i][j] = 0;
				}
				else newState[i][j] = 0;
			});
		});
		
		currentState = newState;
	}
	
}
var g1;
app = angular.module("gameApp", []);
app.controller("GameCtrl", function($scope) {
	g1 = new GameOfLife();
    $scope.init = function(inputX, inputY) {
    	g1.init(inputX.xSize, inputY.ySize);
    }	
	$scope.addCell = function(inputX, inputY) {
		var x = inputX.xCoord;
		var y = inputY.yCoord;
		g1.addAlive(x, y);
	}
	$scope.show = function() {
		//$scope.output = g1.printState(); 
		return g1.printState();
	}
	$scope.tick = function() {
		g1.tick();	
	}

});