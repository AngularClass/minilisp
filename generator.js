var _ = require('lodash');
var constants = require('./constants.js');

var Controller = function(){
	this.result = '';
}

module.exports = interpreter = function(roots){
	var controller = new Controller();
	_.each(roots, function(node){
		interpretNode(node, controller);
	})
	return controller.result;
}

function interpretNode(node, controller){
	var type = node.get('type');
	var value = node.get('value');
	if(type === 'function'){
		if(value === 'defn'){
			writeCustomFunction(node, controller);
		} else {
			writeFunction(node, controller);
		}
	} else {
		controller.result += node.get('value');
	}
}

function writeFunction(ast, controller){
	var value = ast.get('value');
	var functionName = constants.functionMap[value];
	if(functionName === undefined){
		functionName = value;
	}
	controller.result += functionName + '(';
	_.each(ast.children, function(argument, idx){
		interpretNode(argument, controller);
		if(ast.children.length > 1 && idx < ast.children.length-1){
			controller.result += ', ';
		}
	})
	controller.result += ')';
}

function writeCustomFunction(node, controller){
	var functionName = node.children[0];
	var arguments = node.children[1];
	var functionBody = node.children[2];

	controller.result += 'var '+functionName.get('value')+' = function(';

	var numArgs = arguments.children.length;

	_.each(arguments.children, function(argNode, idx){
		controller.result += argNode.get('value');
		if(numArgs > 1 && idx < numArgs - 1){
			controller.result += ', ';
		}
	})

	controller.result += '){\n';

	var customController = new Controller();
	interpretNode(functionBody, customController);
	
	controller.result += 'return '+customController.result+ ';';
	controller.result += '\n}\n';
}
