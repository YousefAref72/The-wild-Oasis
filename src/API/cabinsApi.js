import axiosInstance from "./axiosInstance";

export const getCabins = async () => {
  try {
    const response = await axiosInstance.get("/cabins");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const addCabin = async (cabin) => {
  try {
    const response = await axiosInstance.post("/cabins", cabin);

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const removeCabins = async (id) => {
  try {
    const response = await axiosInstance.delete(`/cabins/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
