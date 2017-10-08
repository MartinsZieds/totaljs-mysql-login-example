exports.install = function() {

	F.route('/user/register/', view_register, ['authorize']);
	F.route('/user/register/', register_user, ['authorize', 'post']);
	F.route('/user/all/', all_users, ['authorize', '*User']);
};

function view_register() {
	this.view('register');
}

function register_user() {
	var self = this;
	F.model('users').register_user(self,
		function(response) {
			self.view('register', response);
		}
	);
}

function all_users() {
	var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('all_users', response);
    });
}