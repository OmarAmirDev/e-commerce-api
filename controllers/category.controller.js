const Category = require("../models/category.model");

const asyncHandler = require("../utils/asyncHandler");

const AppError = require("../utils/AppError");



// GET ALL

exports.getCategories = asyncHandler(async(req,res)=>{


    const categories = await Category.find();


    res.status(200).json({

        success:true,

        count:categories.length,

        data:categories

    });


});




// GET ONE

exports.getCategory = asyncHandler(async(req,res)=>{


    const category = await Category.findById(req.params.id);



    if(!category){

        throw new AppError(
            "Category not found",
            404
        );

    }



    res.status(200).json({

        success:true,

        data:category

    });


});





// CREATE

exports.createCategory = asyncHandler(async(req,res)=>{


    const category = await Category.create(req.body);



    res.status(201).json({

        success:true,

        data:category

    });


});





// UPDATE

exports.updateCategory = asyncHandler(async(req,res)=>{


    const category =
        await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );



    if(!category){

        throw new AppError(
            "Category not found",
            404
        );

    }



    res.status(200).json({

        success:true,

        data:category

    });


});





// DELETE

exports.deleteCategory = asyncHandler(async(req,res)=>{


    const category =
        await Category.findByIdAndDelete(
            req.params.id
        );



    if(!category){

        throw new AppError(
            "Category not found",
            404
        );

    }



    res.status(200).json({

        success:true,

        message:"Category deleted"

    });


});