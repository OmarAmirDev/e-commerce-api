const express = require("express");

const router = express.Router();


const {

    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory

} = require("../controllers/category.controller");



router
    .route("/")
    .get(getCategories)
    .post(createCategory);



router
    .route("/:id")
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory);



module.exports = router;