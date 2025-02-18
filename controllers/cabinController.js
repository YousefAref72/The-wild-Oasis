import {
  addCabin,
  removeCabin,
  retrieveCabins,
  updateCabinDb,
} from "../database/cabinDatabase.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { filtersQueryHandler, formatString } from "../utils/helpers.js";

const validAttributes = [
  "name",
  "discount",
  "regular_price",
  "max_capacity",
  "description",
  "image",
];

const getCabins = catchAsync(async (req, res, next) => {
  const filters = filtersQueryHandler(req.query, validAttributes);
  const cabins = await retrieveCabins(filters);

  res.status(200).json({
    status: "successful",
    data: { cabins },
  });
});

const createCabin = catchAsync(async (req, res, next) => {
  let { name, discount, regular_price, max_capacity, description, image } =
    req.body;
  if (
    !name ||
    discount === undefined ||
    !regular_price ||
    !max_capacity ||
    !description
  ) {
    return next(new AppError("Missing data", 400));
  }

  name = formatString(name);
  description = formatString(description);
  const attributes = [
    name,
    discount,
    regular_price,
    max_capacity,
    description,
    image,
  ];

  const newCabin = await addCabin(attributes);
  console.log(newCabin);
  if (newCabin.severity === "ERROR") {
    return next(new AppError("couldn't create new Cabin", 400));
  }
  res.status(200).json({
    status: "successful",
    data: { newCabin },
  });
});

const updateCabin = catchAsync(async (req, res, next) => {
  let { name, discount, regular_price, max_capacity, description, image } =
    req.body;
  const { id: cabin_id } = req.params;

  const toBeUpdated = {
    name,
    discount,
    regular_price,
    max_capacity,
    description,
    image,
  };

  const results = await updateCabinDb(toBeUpdated, cabin_id);
  if (results.severity === "ERROR") {
    return next(new AppError("couldn't Update this Cabin", 400));
  }
  res.status(200).json({
    status: "successful",
    data: { results },
  });
});

const deleteCabin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const response = await removeCabin(id);

  if (response.severity === "ERROR") {
    return next(new AppError("couldn't delete this Cabin", 400));
  }
  res.status(204).json({
    status: "successful",
  });
});

export { createCabin, getCabins, updateCabin, deleteCabin };
