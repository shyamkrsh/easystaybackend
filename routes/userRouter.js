const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controllers/userDetails");
const multer = require("multer");
const {storage} = require("../middleware/cloudConfig");
const upload = multer({storage});


router.post("/signup", upload.single('image'), userController.signup);
router.post("/login", userController.login);
router.get("/user-details", authToken, userDetailsController);
router.post("/logout",userController.logout);

module.exports = router;  
