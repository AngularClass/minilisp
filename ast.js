module.exports = AstResults = function(){
	this.roots = [];
    this.history = [];
    this.pointer = null;
}

AstResults.prototype.newTree = function(tree){
	if(this.pointer === null){
		this.roots.push(tree);
		this.history.push(tree);
		this.pointer = tree;
	} else {
		this.pointer.insert(tree);
		this.history.push(tree);
		this.pointer = tree;
	}

}

AstResults.prototype.previous = function(){
	if(!this.history.length){
		return null;
	} else {
		return this.history[this.history.length-2];
	}
}

AstResults.prototype.addChild = function(child){
	this.pointer.insert(child);
	this.pointer = child;
}

AstResults.prototype.back = function(){
	this.history.pop();
	if(!this.history.length){
		this.pointer = null;
	} else {
		this.pointer = this.history[this.history.length-1];
	}
}