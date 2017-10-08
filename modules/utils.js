//Utilities module
//you can pass here some helpful methods that you can use in your application

exports.version = 'v1.0.0';

exports.now = function now() {
	return Date.now() / 1000 | 0;
};