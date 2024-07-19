const express = require("express");
const tourController = require("../controller/toureController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/top-2-cheap")
  .get(tourController.aliasTopCheap, tourController.getAllTour);

router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/")
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.editTour)
  .delete(tourController.deleteTour);

module.exports = router;
