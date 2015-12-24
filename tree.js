module.exports = Tree = function(){
	this.data = {
		type: null,
		value: null
	}
	this.children = []
}

Tree.prototype.setType = function(val){
	this.data.type = val;
}
Tree.prototype.setValue = function(val){
	this.data.value = val;
}

Tree.prototype.get = function(attr){
	return this.data[attr];
}

Tree.prototype.insert = function(tree){
	this.children.push(tree);
}
