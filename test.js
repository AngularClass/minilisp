var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var interpreter = require('./interpreter.js');
var fs = require('fs');

var tokens = tokenizer('(defn avg (x y) ( / (+ x y ) 2)) (print (avg 10 20))');
var tree = parser(tokens);
var output = interpreter(tree.roots);
output = 'var core = require("./core.js");\n' + output;
fs.writeFileSync('out.js', output);