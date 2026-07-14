const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");



const SESSION_ID = "guest-user";




// Recalculate total price

const calculateTotal = (items)=>{

    return items.reduce(

        (total,item)=>{

            return total + (item.price * item.quantity);

        },

        0

    );

};




// GET CART

exports.getCart = asyncHandler(async(req,res)=>{


    let cart = await Cart.findOne({

        sessionId: SESSION_ID

    })
    .populate(
        "items.product",
        "name price images"
    );



    if(!cart){

        cart = await Cart.create({

            sessionId: SESSION_ID,

            items:[],

            totalPrice:0

        });

    }



    res.status(200).json({

        status:"success",

        message:"Cart retrieved successfully",

        data:cart

    });


});







// ADD ITEM

exports.addItem = asyncHandler(async(req,res)=>{


    const {

        productId,

        quantity

    } = req.body;



    const product = await Product.findById(productId);



    if(!product){

        throw new AppError(

            "Product not found",

            404

        );

    }



    if(product.stock <= 0){

        throw new AppError(

            "Product is out of stock",

            400

        );

    }



    let cart = await Cart.findOne({

        sessionId:SESSION_ID

    });



    if(!cart){

        cart = await Cart.create({

            sessionId:SESSION_ID,

            items:[]

        });

    }



    const existingItem = cart.items.find(

        item =>

        item.product.toString() === productId

    );



    if(existingItem){

        existingItem.quantity += quantity;

    }

    else{

        cart.items.push({

            product:product._id,

            quantity:quantity,

            price:product.price

        });

    }



    cart.totalPrice = calculateTotal(cart.items);



    await cart.save();



    res.status(201).json({

        status:"success",

        message:"Item added to cart",

        data:cart

    });


});








// UPDATE QUANTITY

exports.updateItem = asyncHandler(async(req,res)=>{


    const quantity = Number(req.body.quantity);



    let cart = await Cart.findOne({

        sessionId:SESSION_ID

    });



    if(!cart){

        throw new AppError(

            "Cart not found",

            404

        );

    }



    const item = cart.items.find(

        item =>

        item.product.toString() === req.params.productId

    );



    if(!item){

        throw new AppError(

            "Item not found",

            404

        );

    }



    if(quantity <= 0){

        cart.items = cart.items.filter(

            item =>

            item.product.toString() !== req.params.productId

        );

    }

    else{

        item.quantity = quantity;

    }



    cart.totalPrice = calculateTotal(cart.items);



    await cart.save();



    res.status(200).json({

        status:"success",

        message:"Cart updated",

        data:cart

    });


});









// REMOVE ITEM

exports.removeItem = asyncHandler(async(req,res)=>{


    const cart = await Cart.findOne({

        sessionId:SESSION_ID

    });



    if(!cart){

        throw new AppError(

            "Cart not found",

            404

        );

    }



    cart.items = cart.items.filter(

        item =>

        item.product.toString() !== req.params.productId

    );



    cart.totalPrice = calculateTotal(cart.items);



    await cart.save();



    res.status(200).json({

        status:"success",

        message:"Item removed",

        data:cart

    });


});










// CLEAR CART

exports.clearCart = asyncHandler(async(req,res)=>{


    const cart = await Cart.findOne({

        sessionId:SESSION_ID

    });



    if(cart){

        cart.items = [];

        cart.totalPrice = 0;


        await cart.save();

    }



    res.status(200).json({

        status:"success",

        message:"Cart cleared",

        data:cart

    });


});