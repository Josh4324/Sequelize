const chalk = require("chalk");
const ValidationError = require("../errors/errors").ValidationError;
const AuthenticationError = require("../errors/errors").AuthenticationError;
const AccessDeniedError = require("../errors/errors").AccessDeniedError;

function errorLogger(err, req, next){
    console.log(err.message);
    if (err.message){
       console.log( chalk.default.red(err.message))
    }
    if (err.stack){
        console.log( chalk.default.red(err.message))
    }
    next(err);
}

function authenticationErrorHandler(err, req, res, next){
    if (err instanceof AuthenticationError){
        return res.send(401);
    }
    next(err)
}
function validationErrorHandler(){
    if (err instanceof ValidationError){
        return res.send(400);
    }
    next(err)
}
function accessDeniedErrorHandler(){
    if (err instanceof AccessDeniedError){
        return res.send(403);
    }
    next(err)
}
function genericErrorHandler(err){
    res.send(500);
    next();
}

module.exports = function ErrorHandlingMiddleware(app){
    app.use([
        errorLogger,
        authenticationErrorHandler,
        validationErrorHandler,
        accessDeniedErrorHandler,
        genericErrorHandler
    ])
}