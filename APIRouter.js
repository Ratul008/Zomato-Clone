const express = require("express");
const APIRouter = express.Router();
const location = require("../controller/LocationController");
const mealtype = require("../controller/MealTypeCollection");
const restaurant = require("../controller/RestaurantController");
const payment = require("../controller/PaymentController");
// routing
APIRouter.get("/", location.home);
APIRouter.get("/get-location-list", location.getLocation);

APIRouter.get("/get-location-by-id/:id", location.getLocationById);

// meal type
APIRouter.get("/get-meal-type-list", mealtype.getMealTypeList);

// restaurant
APIRouter.get("/get-restaurant-list", restaurant.getRestaurantList);
APIRouter.get(
  "/get-restaurant-by-location/:loc_id",
  restaurant.getRestaurantByLocation
);
APIRouter.get(
  "/get-restaurant-details-by-id/:id",
  restaurant.getRestaurantDetailsById
);

APIRouter.get(
  "/get-menu-items-by-restaurant-id/:id",
  restaurant.getMenuItemsByRestaurant
);

APIRouter.post("/filter", restaurant.filter);

// APIRouter.post("/payment", payment.saveOrder);
APIRouter.post("/create-order", payment.createOrder);
APIRouter.post("/verify-payment", payment.verify);
module.exports = APIRouter;

// order ===> server (save)
