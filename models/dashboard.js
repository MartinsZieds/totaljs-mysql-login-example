NEWSCHEMA('Dashboard').make(function(schema) {
	schema.define('user_id', 'Number', true);
	schema.define('user_name', 'String(64)', true);
	schema.define('user_real_name', 'String(255)');
	schema.define('user_real_surname', 'String(255)');
	schema.define('user_password_hash', 'String(255)');
	schema.define('user_email', 'Email', true);
	schema.define('user_active', 'Number', true);
	schema.define('user_deleted', 'Number', true);
	schema.define('user_account_type', 'Number', true);
	schema.define('user_has_avatar', 'Number', true);
	schema.define('user_creation_timestamp', 'Number');
	schema.define('user_suspension_timestamp', 'Number');
	schema.define('user_last_login_timestamp', 'Number');
	schema.define('user_failed_logins', 'Number', true);
	schema.define('user_last_failed_login', 'Number');
	schema.define('user_password_reset_hash', 'String(255)');
	schema.define('user_password_reset_timestamp', 'Number');
	
	schema.setPrepare(function(name, value) {
		switch (name) {
			case 'user_name':
				return value.toLowerCase();
			case 'user_email':
				return value.toLowerCase();
		}
	});
	
	schema.setValidate(function(name, value) {
		switch (name) {
			case 'user_email':
				return value.isEmail();
		}
	});

    schema.setGet(function(error, model, options, callback) {
        var sql = DB(error);
        sql.select('items', 'users').make( function(builder) {
            if (options.id) {
                builder.where('user_id', options.id);
            }
        });
        sql.exec(callback);
    });
});