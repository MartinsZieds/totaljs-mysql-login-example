F.helpers.alertType = function(type) {
	switch (type) {
		case 'primary-message':
			return 'alert-primary';
		case 'secondary-message':
			return 'alert-secondary';
		case 'success':
			return 'alert-success';
		case 'error':
			return 'alert-danger';
		case 'warning':
			return 'alert-warning';
		case 'info':
			return 'alert-info';
		default:
			return 'alert-danger';
	}
};

F.helpers.isAuthorised = function(user, account_types) {
	return account_types.indexOf(user.user_account_type) >= 0;
};

F.helpers.accountType = function(user_account_type) {
	switch(user_account_type) {
		case 1:
			return 'admin';
		case 2:
			return 'super_user';
		case 3:
			return 'normal_user';
		default:
			return 'normal_user';
	}

};