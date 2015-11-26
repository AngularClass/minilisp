var _ = require('lodash');

module.exports = {
	openParens: '(',
	closeParens: ')',
	plus: '+',
	minus: '-',
	times: '*',
	divide: '/',
	quote: '"',
	isALetter: _.partial(_.contains,'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	isANumber: _.partial(_.contains,'0123456789'),
	isAToken: _.partial(_.contains,'()*+-/'),
	functionMap: {
		'+': 'core.add',
		'-': 'core.subtract',
		'*': 'core.multiply',
		'/': 'core.divide',
		'print': 'core.print'
	},
	coreFunctions: ['print', 'defn']
}
