import {
  editSettings,
  retrieveSettings,
} from "../database/settingsDatabase.js";
import catchAsync from "../utils/catchAsync.js";

const getSettings = catchAsync(async (req, res, next) => {
  const setting = await retrieveSettings();

  res.status(200).json({
    status: "successful",
    data: { setting },
  });
});
const updateSetting = catchAsync(async (req, res, next) => {
  let {
    max_booking_length,
    min_booking_length,
    max_guest_per_booking,
    breakfast_price,
  } = req.body;
  const attributes = {
    max_booking_length,
    min_booking_length,
    max_guest_per_booking,
    breakfast_price,
  };
  const results = await editSettings(attributes);
  console.log(results);

  res.status(200).json({
    status: "successful",
    data: { results },
  });
});

export { getSettings, updateSetting };
