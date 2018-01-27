module.exports = function(router, passport) {

    router.post('/register',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({
                user: req.user.email
            });
        });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            res.status(200).json({
                user: req.user.email
            });
        });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            res.status(200).json({
                user_email: req.user.email,
                user_id: req.user._id
            });
        });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out " });
    });

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
