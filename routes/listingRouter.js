const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authToken = require("../middleware/authToken");
const multer = require("multer");
const {storage} = require("../middleware/cloudConfig");
const upload = multer({storage});


router.get("/search/:category", listingController.showAllListings);
router.post("/new", authToken, upload.array('images', 4), listingController.newListing);
router.get("/:authorId", listingController.getAuthorListing);
router.get("/:id/show", listingController.showOneListing);
router.get("/:id/clients", listingController.getClients);
router.delete("/:id/delete", authToken, listingController.deleteListing);
router.patch("/edit/:id", authToken, upload?.array('images', 4), listingController.editListing);

module.exports = router;