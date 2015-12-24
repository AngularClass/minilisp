var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var generator = require('./generator.js');
var fs = require('fs');

var example = '(defn avg (x y) ( / (+ x y ) 2)) (defn addOne (x) (+ x 1)) (print (avg (addOne 10) (addOne 20)))'

var tokens = tokenizer(example);
var tree = parser(tokens);
var output = generator(tree.roots);
output = 'var core = require("./core.js");\n' + output;
fs.writeFileSync('out.js', output);