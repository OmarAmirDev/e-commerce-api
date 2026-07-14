const AppError = require("../utils/AppError");


const errorHandler = (err, req, res, next) => {


    let error = { ...err };

    error.message = err.message;



    // Invalid MongoDB ID

    if(err.name === "CastError"){

        error = new AppError(
            `Invalid ID: ${err.value}`,
            400
        );

    }



    // Duplicate value

    if(err.code === 11000){

        const field = Object.keys(err.keyValue)[0];

        error = new AppError(
            `${field} already exists`,
            409
        );

    }



    // Mongoose validation error

    if(err.name === "ValidationError"){

        const messages = Object.values(err.errors)
            .map(e => e.message);


        error = new AppError(
            messages.join(", "),
            400
        );

    }



    res.status(error.statusCode || 500)
        .json({

            success:false,

            message:
                error.message || "Server Error"

        });


};


module.exports = errorHandler;