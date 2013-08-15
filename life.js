function GameOfLife() {
	this.currentState = [];

    this.printArray = function(arry) {
    	var str = ""
    	for(var i = 0; i < arry.length; i++) {
    		for(var j = 0; j < arry[i].length; j++) {
    			str += arry[i][j] + " ";
    			//console.log(arry[i][j]);
    		}	
    		str += "\n";
    	}
    	console.log(str);
    }

    this.printState = function() {
    	this.printArray(this.currentState);
    }

	this.init = function(x, y) {
		//initialize arrays inside currentState
		for(var i = 0; i < x; i++) {
			this.currentState[i] = [];
			for(var j = 0; j < y; j++) {
				this.currentState[i][j] = 0;
			}
		}
		//this.printArray(this.currentState);
	}
	this.addAlive = function(x, y) {
		this.currentState[x][y] = 1;
	}
	this.numOfAliveNeighbors = function(x, y) {
		var count = 0;
		if(this.currentState[x-1][y-1] === 1) count++;
		if(this.currentState[x-1][y] === 1) count++;
		if(this.currentState[x-1][y+1] === 1) count++;
		if(this.currentState[x-1][y] === 1) count++;
		if(this.currentState[x+1][y] === 1) count++;
		if(this.currentState[x-1][y+1] === 1) count++;
		if(this.currentState[x][y+1] === 1) count++;
		if(this.currentState[x+1][y+1] === 1) count++;
		return count;
	}
}

var g1 = new GameOfLife();
g1.init(10, 10);
g1.addAlive(5,5);
g1.addAlive(5,6);
g1.addAlive(6,5);
console.log(g1.numOfAliveNeighbors(5,5));
g1.printState();