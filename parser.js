var constants = require('./constants.js');
var _ = require('lodash');
var Tree = require('./tree.js');
var AstResult = require('./ast.js');

var FUNC_NAMES = constants.coreFunctions.slice();

module.exports = function Parser(tokens){
    var ast = new AstResult();
	var parserMap = {
		'operator': processOperators,
		'keyword':	processKeywords,
		'number': 	processValue,
		'string': 	processValue
	}
    _.each(tokens, function(token){
        var func = parserMap[token.type];
        func(token, ast);
    })
    return ast;
}

function processOperators(token, ast){
    switch(token.value){
        case constants.openParens:
            var tree = new Tree();
            ast.newTree(tree);
            break;
        case constants.plus:
        case constants.minus:
        case constants.times:
        case constants.divide:
            ast.pointer.setType('function');
            ast.pointer.setValue(token.value);
            break;
        case constants.closeParens:
            ast.back();
            break;
    }
}

function processValue(token, ast){
    // values are children of function nodes so when we reach a value
    // we just add it as a new child of the current node
    var tree = new Tree();
    tree.setType('value');
    tree.setValue(token.value);
    ast.pointer.insert(tree);
}

function processKeywords(token, ast){
    if(ast.pointer.get('type') === 'function' &&
       ast.pointer.get('value')=== 'defn'){
        // we just created a funcdef node, before we insert a new
        // node we run into the function name
        var tree = new Tree();
        tree.setType('function_name');
        tree.setValue(token.value);
        FUNC_NAMES.push(token.value)
        ast.pointer.insert(tree);
    } else if(ast.pointer.get('value') === undefined &&
              !_.contains(FUNC_NAMES, token.value)){
        // after the function name we get a new node with the
        // argument names in it, argument names are keywords in a node
        // where the parent is a "defn"
        ast.pointer.setType('arguments'); // this is an arguments node
        var tree = new Tree();
        tree.setType('variable');
        tree.setValue(token.value);
        ast.pointer.insert(tree); // that gets arguments as children
    } else if(_.contains(FUNC_NAMES, token.value)){
        // the keyword is a function call
        ast.pointer.setType('function');
        ast.pointer.setValue(token.value);
    } else {
        // otherwise there is no information or context so it must be a variable
        processValue(token, ast);
    }
}