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
    	//this.printArray(this.currentState);
    	var str = ""
		_.each(this.currentState, function(i) {
			_.each(i, function(j) {
				str += " " + j;
			});
			str += "\n";
		});
		//return str;
		console.log(str);
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
		//console.log(x);
		if((x !== 0 && y !== 0)&& this.currentState[x-1][y-1] === 1) count++;
		if(y !== 0 && this.currentState[x][y-1] === 1) count++;
		if((x < this.currentState.length - 1 && y !== 0) && this.currentState[x+1][y-1] === 1) count++;
		if(x !== 0 && this.currentState[x-1][y] === 1) count++;
		if(x < this.currentState.length - 1&& this.currentState[x+1][y] === 1) count++;
		if((x != 0 && y < this.currentState[x].length) && this.currentState[x-1][y+1] === 1) count++;
		if(y < this.currentState[x].length - 1 && this.currentState[x][y+1] === 1) count++;
		if((x < this.currentState.length - 1 && y < this.currentState[x].length) && this.currentState[x+1][y+1] === 1) count++;
		return count;
	}
	this.tick = function() {
		var newState = [];
		for(var i = 0; i < this.currentState.length; i++) {
			newState[i] = [];
			for(var j = 0; j < this.currentState[i].length; j++) {
				newState[i][j] = 0;
			}
		}
		_.each(this.currentState, function(arryI, i) {
			_.each(arryI, function(arryIJ, j){
				var aliveNeighbors = g1.numOfAliveNeighbors(i, j);
				if(arryIJ === 0 && aliveNeighbors === 3) newState[i][j] = 1;
				else if(arryIJ === 1) {
					if(aliveNeighbors > 3) newState[i][j] = 0;
					else if(aliveNeighbors === 3 || aliveNeighbors === 2) newState[i][j] = 1;
					else newState[i][j] = 0;
				}
			});
		});
		
		this.currentState = newState;
	}
}

var g1 = new GameOfLife();
g1.init(10, 10);

g1.addAlive(5,5);
g1.addAlive(5,6);
g1.addAlive(6,5);
g1.addAlive(4,5);
//console.log(g1.numOfAliveNeighbors(5,5));
g1.printState();
g1.tick();
g1.printState();
g1.tick();
g1.printState();