const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authToken = require("../middleware/authToken");

router.post("/:id/new", authToken, applicationController.newApplication);



module.exports = router;