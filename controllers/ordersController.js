const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


const SESSION_ID = "guest-user";



// CREATE ORDER (CHECKOUT)

exports.createOrder = asyncHandler(async(req,res)=>{


    const cart = await Cart.findOne({

        sessionId: SESSION_ID

    });



    if(!cart || cart.items.length === 0){

        throw new AppError(
            "Cart is empty",
            400
        );

    }



    let orderItems = [];

    let totalPrice = 0;



    // Check products and stock

    for(const item of cart.items){


        const product = await Product.findById(
            item.product
        );



        if(!product){

            throw new AppError(
                "Product not found",
                404
            );

        }



        if(product.stock < item.quantity){

            throw new AppError(

                `${product.name} has only ${product.stock} items available`,

                400

            );

        }



        orderItems.push({

            product: product._id,

            name: product.name,

            price: product.price,

            quantity:item.quantity

        });



        totalPrice += product.price * item.quantity;



    }





    // Create order

    const order = await Order.create({

        orderNumber:
            "ORD-" + Date.now(),


        items:orderItems,


        totalPrice,


        shippingAddress:req.body.shippingAddress || {}

    });






    // Reduce stock

    for(const item of cart.items){


        await Product.findByIdAndUpdate(

            item.product,

            {

                $inc:{
                    stock:-item.quantity
                }

            }

        );


    }






    // Empty cart

    cart.items = [];

    cart.totalPrice = 0;


    await cart.save();





    res.status(201).json({

        status:"success",

        message:"Order created successfully",

        data:order

    });


});









// GET ALL ORDERS

exports.getOrders = asyncHandler(async(req,res)=>{


    const orders = await Order.find();



    res.status(200).json({

        status:"success",

        message:"Orders retrieved successfully",

        data:orders

    });


});










// GET ONE ORDER

exports.getOrder = asyncHandler(async(req,res)=>{


    const order = await Order.findById(
        req.params.id
    )
    .populate(
        "items.product",
        "name images"
    );



    if(!order){

        throw new AppError(
            "Order not found",
            404
        );

    }



    res.status(200).json({

        status:"success",

        message:"Order retrieved successfully",

        data:order

    });


});









// UPDATE STATUS

exports.updateOrderStatus = asyncHandler(async(req,res)=>{


    const order = await Order.findByIdAndUpdate(

        req.params.id,

        {
            status:req.body.status
        },

        {
            new:true,
            runValidators:true
        }

    );



    if(!order){

        throw new AppError(
            "Order not found",
            404
        );

    }



    res.status(200).json({

        status:"success",

        message:"Order status updated",

        data:order

    });


});