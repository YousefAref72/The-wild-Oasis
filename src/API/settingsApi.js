import axiosInstance from "./axiosInstance";

const getSettings = async () => {
  try {
    const response = await axiosInstance.get("/settings");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const editSettings = async (data) => {
  try {
    const response = await axiosInstance.put("/settings", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export { getSettings, editSettings };
