// Total.js authorize delegate is executed on each request with except for a request to a static file
F.onAuthorize = function(req, res, flags, next) {
    var cookie = req.cookie(F.config.cookie);

    // Check the cookie length
    if (!cookie || cookie.length < 10) {
        return next(false);
    }

    // Decrypt the cookie value
    cookie = F.decrypt(cookie, F.config.secret);
    if (!cookie) {
        return next(false);

    }

    // Look into the session object whether the user is logged in
    //session object is retrieved form the framerowk cache
    var session = F.cache.get2(cookie.user_id);

    if (session) {
        // User is online, so we increase his expiration of session
        F.cache.setExpire(session.user_id, F.config.expire);
        //set the user type for user roles
        flags.push('@' + F.helpers.accountType(session.user_account_type));
        return next(true, session);
    }

    // Session doesn't exist here, so we try to sign-in user because we have his ID
    var sql = DB();

    sql.select('user', 'users').make(function(filter) {
        filter.where('user_id', cookie.user_id);
        filter.where('user_active', 1);
        filter.where('user_deleted', 0);
        filter.first();

        // User session will contain these properties:
        filter.fields('user_id', 'user_name', 'user_account_type');
    });

    sql.exec(function(err, response) {

        // Check whether the user exists in DB
        if (err || !response.user) {
            // If not, then remove the cookie
            res.cookie(F.config.cookie, '', '-1 day');
            return next(false);
        }

        var userObject = response.user;

        // Create a session ans store it in cache
        F.cache.set(userObject.user_id, userObject, F.config.expire);
        //set the user type for user roles
        flags.push('@' + F.helpers.accountType(userObject.user_account_type));
        // Authorize the user
        return next(true, userObject);
    });
};

// A simple service cleaner for expired sessions
F.on('service', function(counter) {
    // Clean session each 5 minutes
    if (counter % 5 !== 0)
        return;

    var sessions = Object.keys(F.cache.items);
    //  Set 'ticks' to -20 minutes(for example) from now (depending on F.config.expire value) 
    var toExpire = F.datetime.add('-' + F.config.expire);

    for (var id in sessions) {
        if (sessions[id]['expire'] < toExpire) {
            F.cache.remove(id);
        }
    }

});

// A simple login method for creating an auth cookie
F.userlogin = function(controller, callback) {
    var data = controller.body;
    var sql = DB();
    sql.select('user', 'users').make(function(filter) {
        filter.where('user_name', data.user_name);
        filter.where('user_password_hash', F.encrypt(data.user_password, F.config.secret));
        filter.where('user_active', 1);
        filter.where('user_deleted', 0);
        filter.first();
    });

    sql.validate(function(error, response) {
        if (!response.user) {
            error.push('Login failed.', 'error');
            return false;
        }
        return true;
    });

    sql.exec(function(err, response) {
        if (err || !response.user) {
            callback && callback(SUCCESS(false, err));
            return;
        }
        var userObject = {};
        userObject.user_id = response.user.user_id;
        userObject.user_account_type = response.user.user_account_type;
        controller.cookie(F.config.cookie, F.encrypt(userObject, F.config.secret), '7 days');
        F.saveTimestampOfLoginOfUser(userObject.user_id);
        callback && callback(SUCCESS(true));
        return F;
    });
};

F.saveTimestampOfLoginOfUser = function(userId) {
    var sql = DB();
    var user = sql.update('userLoginTime', 'users');
    user.where('user_id', userId);
    user.set('user_last_login_timestamp', MODULE('utils').now());

    sql.exec();
};

// The method removes auth cookie
F.userlogoff = function(controller) {
    controller.cookie(F.config.cookie, '', '-1 day');
};