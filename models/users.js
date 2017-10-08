NEWSCHEMA('User').make(function(schema) {
    schema.define('user_id', 'Number', true);
    schema.define('session_id', 'String(48)');
    schema.define('user_name', 'String(64)', true);
    schema.define('user_real_name', 'String(255)');
    schema.define('user_real_surname', 'String(255)');
    schema.define('user_password_hash', 'String(255)');
    schema.define('user_email', 'Email', true);
    schema.define('user_active', 'Number', true);
    schema.define('user_deleted', 'Number', true);
    schema.define('user_account_type', 'Number', true);
    schema.define('user_has_avatar', 'Number', true);
    schema.define('user_remember_me_token', 'String(64)');
    schema.define('user_creation_timestamp', 'Number');
    schema.define('user_suspension_timestamp', 'Number');
    schema.define('user_last_login_timestamp', 'Number');
    schema.define('user_failed_logins', 'Number', true);
    schema.define('user_last_failed_login', 'Number');
    schema.define('user_activation_hash', 'String(40)');
    schema.define('user_password_reset_hash', 'String(40)');
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
        sql.select('items', 'users').make(function(builder) {
            if (options.id) {
                builder.where('user_id', options.id);
            }
        });
        sql.exec(callback);
    });
});

exports.register_user = function(controller, callback) {
    var data = controller.body;
    var sql = DB();

    sql.exists('userExists', 'users').where('user_name', data.user_name);
    sql.validate(function(error, response) {
        if (response.userExists) {
            error.push('User with this username already exists', 'error');
            return false;
        }
        return true;
    });

    sql.exists('userEmailExists', 'users').where('user_email', data.user_email);
    sql.validate(function(error, response) {
        if (response.userEmailExists) {
            error.push('User with this email already exists', 'error');
            return false;
        }
        return true;
    });

    sql.insert('user', 'users').make(function(builder) {
        builder.set('user_name', data.user_name);
        builder.set('user_email', data.user_email);
        builder.set('user_active', 1);
        builder.set('user_account_type', data.user_account_type);
        builder.set('user_creation_timestamp', Math.floor(Date.now() / 1000));
        builder.set('user_password_hash', F.encrypt(data.user_password, F.config.secret));
    });

    sql.exec(function(err, response) {
        callback && callback(SUCCESS(response.user != null, err));
    });
};