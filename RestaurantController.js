const RestaurantModel = require("../model/RestaurantModel");
const MenuItemModel = require("../model/MenuItemModel");
module.exports.getRestaurantList = async (request, response) => {
  try {
    let result = await RestaurantModel.find();
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

module.exports.getRestaurantByLocation = async (request, response) => {
  let { loc_id } = request.params;
  try {
    let result = await RestaurantModel.find({ location_id: loc_id });
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

module.exports.getRestaurantDetailsById = async (request, response) => {
  let { id } = request.params;
  try {
    let result = await RestaurantModel.findById(id);
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

module.exports.getMenuItemsByRestaurant = async (request, response) => {
  let { id } = request.params;
  try {
    let result = await MenuItemModel.find({ restaurantId: id });
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

module.exports.filter = async (request, response) => {
  let { meal_type, location, cuisines, sort, page, lcost, hcost } =
    request.body;
  if (sort === undefined) {
    sort = 1;
  }
  // 1 = asc , -1 = desc
  page = page ? page : 1;
  let perPage = 2;
  let startIndex = page * perPage - perPage;
  let endIndex = page * perPage;

  let filterRecord = {};

  if (meal_type !== undefined) filterRecord["mealtype_id"] = meal_type;
  if (location !== undefined) filterRecord["location_id"] = location;
  if (cuisines !== undefined) filterRecord["cuisine_id"] = { $in: cuisines };
  if (lcost !== undefined && hcost !== undefined)
    filterRecord["min_price"] = { $gte: lcost, $lte: hcost };

  try {
    let result = await RestaurantModel.find(filterRecord).sort({
      min_price: sort,
    });

    let pageCount = Math.round(result.length / perPage);

    result = result.slice(startIndex, endIndex);
    response.status(200).send({
      status: true,
      result,
      pageCount,
      page,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: false,
      message: "server error",
    });
  }
};