// When a particular routing is not found, a 404 page not found error is sent
exports.pageNotFound=(req,res,next)=>{
    const error=new Error('The page is Not Found');
    error.status=404;
    next(error);  // Automatically sent to the middleware that catches errors because a parameter is sent
}

// general middleware for error catching
// accepts 4 parameters
// The first parameter is the error sent to it from another middleware
// The last middleware all errors will go to
// so that all errors are of the same format
exports.serverNotFound = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
}
