const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    res.status(statusCode).json({
        status, message, stack,
    });
}

const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;

    if(error.isOperational) {
        res.status(statusCode).json({
            status, message, 
        });
    }
    console.log(error.name, error.message, stack);
    return res.status(500).json({
        status: 'error',
        message: 'An error occurred during the process.', 
    });
};

const globalErrorHandler = (err, req, res, next) => {
    let error = '';
    if(err.code === 5001){
        error = new AppError()
    }
    if(process.env.NODE_ENV === 'development'){
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;