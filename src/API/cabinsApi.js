import axiosInstance from "./axiosInstance";
import supabase, { supabaseUrl } from "../services/supabase";

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
    const hasImgPath = typeof cabin.image === "string";
    const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // 1-  Creating the cabin
    const response = await axiosInstance.post("/cabins", {
      ...cabin,
      image: hasImgPath ? cabin.image : imagePath,
    });

    // 2- Uploading the image
    if (!hasImgPath) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.image);

      // 3. Delete the cabin IF there was an error uplaoding image
      if (storageError) {
        console.log(storageError);
        await axiosInstance.delete(`/cabins/${response.cabin_id}`);
        throw new Error("An Error has occured and the cabin wasn't created!");
      }
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
async function uploadImg(image, imageName) {
  // 2- Uploading the image
  console.log(image, imageName);
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    throw new Error("An Error has occured and the cabin wasn't created!");
  }
}

export const editCabin = async (cabinToEdit) => {
  let { cabin_id, ...editValues } = cabinToEdit;
  console.log(editValues);
  const imgFile = editValues.image;
  let imageName;
  if (editValues.image) {
    imageName = `${Math.random()}-${editValues.image.name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    editValues = { ...editValues, image: imagePath };
  }
  const response = await axiosInstance.put(`/cabins/${cabin_id}`, editValues);

  if (editValues.image) {
    await uploadImg(imgFile, imageName);
  }

  return response.data;
};

export const removeCabins = async (id) => {
  try {
    const response = await axiosInstance.delete(`/cabins/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
