exports.install = function() {
    F.route('/*', view_unlogged, ['unauthorize']);
    F.route('/', view_index, ['authorize']);
    F.route('/about', view_about, ['authorize']);
    F.route('/admin_page', view_admin_page, ['authorize', '@admin']);
    F.route('/super_user_page', view_super_user_page, ['authorize', '@admin', '@super_user']);

    //http error views
    F.route('#400', error_pages(400)); // Bad Request
    F.route('#401', error_pages(401)); // Unauthorized
    F.route('#403', error_pages(403)); // Forbidden
    F.route('#404', error_pages(404)); // Not Found
    F.route('#408', error_pages(408)); // Request Timeout
    F.route('#431', error_pages(431)); // Request Header Fields Too Large
    F.route('#500', error_pages(500)); // Internal Server Error
    F.route('#501', error_pages(501)); // Not Implemented
};

function view_index() {
    console.log(MODULE('utils').now());
    this.redirect('/dashboard/');
}

function view_unlogged() {
    this.redirect('/login/');
}

function error_pages(msg) {
    return function() {
        var self = this;
        self.repository.msg = msg;
        self.view('error');
    };
};

function view_about() {
    this.view('about');
}

function view_admin_page() {
    this.view('admin_page');
}

function view_super_user_page() {
    this.view('super_user_page');
}