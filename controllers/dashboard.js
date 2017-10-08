exports.install = function() {
    F.route('/dashboard/', view_dashboard, ['authorize', '*Dashboard']);
};


function view_dashboard() {
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('dashboard', response);
    });
}