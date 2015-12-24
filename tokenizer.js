var constants = require('./constants.js');
var _ = require('lodash');

module.exports = function tokenizer(text){
	var result = [];
	var tokenStream = new TokenStream(text);
	while(!tokenStream.isDone()){
		var token = tokenStream.currentToken();

		if(constants.isAToken(token)){
			result.push({ type: 'operator', value: token });
		}

		else if(constants.isALetter(token)){
			while(constants.isALetter(tokenStream.nextToken())){
				tokenStream.advance();
				token += tokenStream.currentToken();
			}
			result.push({ type: 'keyword', value: token });
		}

		else if(constants.isANumber(token)){
			while(constants.isANumber(tokenStream.nextToken())){
				tokenStream.advance();
				token += tokenStream.currentToken();
			}
			result.push({type: 'number', value: token });
		}

		else if(token === constants.quote){
			while(constants.isALetter(tokenStream.nextToken())){
				tokenStream.advance();
				token += tokenStream.currentToken(); 
			}
			tokenStream.advance();
			token += tokenStream.currentToken();
			result.push({ type: 'string', value: token })
		}

		tokenStream.advance();
	}
	return result;
}

var TokenStream = function(text){
	this.text = text;
	this.index = 0;
	this.done = false;
}

TokenStream.prototype.advance = function(){
	if(this.index === this.text.length){
		this.done = true;
	} else {
		this.index++;
	}
}

TokenStream.prototype.currentToken = function(){
	return this.text[this.index];
}

TokenStream.prototype.isDone = function(){
	return this.done;
}

TokenStream.prototype.nextToken = function(){
	return this.text[this.index+1];
}
