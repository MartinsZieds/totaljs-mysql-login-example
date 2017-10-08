exports.install = function() {
    F.route('/login/', view_login, ['unauthorize']);
    F.route('/login/', view_dashboard, ['authorize']);
    F.route('/login/', login, ['post']);

    // Authorized
    F.route('/logoff/', logoff, ['authorize']);
};

function view_login() {
    this.layout('layouts/login_layout');
    this.view('login');
}

function view_dashboard() {
    if (!this.transfer('/dashboard/'))
        return self.throw404();
}

function login() {
    var self = this;
    //if simple redirection is needed then you can use function shorthand
    //F.userlogin(self, logged => self.redirect(logged ? '/dashboard/' : '/login/'));
    F.userlogin(self, function(response) {
        if (response.success) {
            self.redirect('/dashboard/');
        }
        self.layout('layouts/login_layout');
        self.view('login', response);
    });

}

function logoff() {
    var self = this;
    // The method below removes an authorization cookie
    F.userlogoff(self);
    // Redirect a user to a login page`
    self.redirect('/login/');
}