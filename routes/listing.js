const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListings } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
//validate listing (server side validation for listings)

// index route and create route ("/")
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedin,

  upload.single("listing[image]"),
  validateListings,

  wrapAsync(listingController.createListing)
);

//new route
router.get("/new", isLoggedin, listingController.renderNewForm);

//show route, update route(":/id")
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedin,

    isOwner,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
