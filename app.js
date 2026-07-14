require("dotenv").config();


const express = require("express");

const mongoSanitize = require("express-mongo-sanitize");


const connectDB = require("./db/connectDB");

const errorHandler = require("./middleware/errorHandler");



const app = express();



// Middleware

app.use(express.json());

app.use((req, res, next) => {
    if (req.body) {
        req.body = mongoSanitize.sanitize(req.body);
    }

    next();
});




// Routes

const categoryRoutes = require("./routes/category.routes");


app.use("/api/categories", categoryRoutes);

const productRoutes = require("./routes/products");


app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cart");


app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orders");


app.use("/api/orders", orderRoutes);




// Not found handler

app.use((req,res,next)=>{

    res.status(404).json({

        success:false,

        message:"Route not found"

    });

});



// Error handler MUST be last

app.use(errorHandler);





const PORT = process.env.PORT || 5000;



const startServer = async()=>{

    await connectDB();


    app.listen(PORT,()=>{

        console.log(
            `Server running on port ${PORT}`
        );

    });

};



startServer();