var allowed = { en: true, it: true, lv: true };

F.onLocale = function(req, res) {
    var language = req.query.language;
    
    // Set the language according to the querystring and store to the cookie
    if (language) {
        if (!allowed[language])
            return 'en';
        res.cookie(F.config.lang_cookie, language, '2 days');
        return language;
    }
    
    language = req.cookie(F.config.lang_cookie);
    if (language) {
        if (allowed[language])
            return language;
        return 'en';
    }
    
    // Sets the language according to user-agent
    language = req.language;

    if (language.indexOf('it') > -1)
        return 'it';

    if (language.indexOf('lv') > -1)
        return 'lv';

    return 'en';
};