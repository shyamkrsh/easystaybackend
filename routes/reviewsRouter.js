const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");
const authToken = require("../middleware/authToken");

router.post("/:id/new", reviewsController.createReviews);
router.get("/:id/show", reviewsController.showReviews);



module.exports = router;