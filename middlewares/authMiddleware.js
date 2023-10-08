const auth = (req, res, next) => {

    //get all routes where not included
    const nonSecurePaths = ['/auth/signup', '/auth/login'];
    if (nonSecurePaths.includes(req.originalUrl)) return next();
    //set user
    
    res.locals.user = req.user || null;

    if (req.isAuthenticated()) {
        next();
    } else {
        
        res.redirect('/auth/login');
    }
};



module.exports = {
    auth
};