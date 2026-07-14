const Product = require("../models/product.model");
const Category = require("../models/category.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");



// GET ALL PRODUCTS WITH FILTERING

exports.getProducts = asyncHandler(async(req,res)=>{


    let filter = {};



    // Category filter

    if(req.query.category){

        filter.category = req.query.category;

    }



    // Price filter

    if(req.query.minPrice || req.query.maxPrice){

        filter.price = {};

        if(req.query.minPrice){

            filter.price.$gte = Number(req.query.minPrice);

        }


        if(req.query.maxPrice){

            filter.price.$lte = Number(req.query.maxPrice);

        }

    }



    // Stock filter

    if(req.query.inStock === "true"){

        filter.stock = {
            $gt:0
        };

    }



    // Search filter

    if(req.query.search){

        filter.$or = [

            {
                name:{
                    $regex:req.query.search,
                    $options:"i"
                }
            },

            {
                description:{
                    $regex:req.query.search,
                    $options:"i"
                }
            }

        ];

    }




    const products = await Product
        .find(filter)
        .populate(
            "category",
            "name"
        );



    res.status(200).json({

        status:"success",

        message:"Products retrieved successfully",

        data:products

    });


});




// GET SINGLE PRODUCT

exports.getProduct = asyncHandler(async(req,res)=>{


    const product = await Product
        .findById(req.params.id)
        .populate(
            "category",
            "name description"
        );



    if(!product){

        throw new AppError(
            "Product not found",
            404
        );

    }



    res.status(200).json({

        status:"success",

        message:"Product retrieved successfully",

        data:product

    });


});





// CREATE PRODUCT

exports.createProduct = asyncHandler(async(req,res)=>{


    const categoryExists =
        await Category.findById(
            req.body.category
        );



    if(!categoryExists){

        throw new AppError(
            "Category not found",
            404
        );

    }



    const product =
        await Product.create(req.body);



    res.status(201).json({

        status:"success",

        message:"Product created successfully",

        data:product

    });


});






// UPDATE PRODUCT

exports.updateProduct = asyncHandler(async(req,res)=>{


    if(req.body.category){

        const categoryExists =
            await Category.findById(
                req.body.category
            );


        if(!categoryExists){

            throw new AppError(
                "Category not found",
                404
            );

        }

    }



    const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );



    if(!product){

        throw new AppError(
            "Product not found",
            404
        );

    }



    res.status(200).json({

        status:"success",

        message:"Product updated successfully",

        data:product

    });


});






// DELETE PRODUCT

exports.deleteProduct = asyncHandler(async(req,res)=>{


    const product =
        await Product.findByIdAndDelete(
            req.params.id
        );



    if(!product){

        throw new AppError(
            "Product not found",
            404
        );

    }



    res.status(200).json({

        status:"success",

        message:"Product deleted successfully",

        data:null

    });


});