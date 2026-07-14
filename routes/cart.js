const express = require("express");

const router = express.Router();


const {

    getCart,
    addItem,
    updateItem,
    removeItem,
    clearCart

} = require("../controllers/cartController");



router.get("/", getCart);


router.post("/items", addItem);


router.patch("/items/:productId", updateItem);


router.delete("/items/:productId", removeItem);


router.delete("/", clearCart);



module.exports = router;