import supabase, { supabaseUrl } from "../services/supabase";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
const login = async (email, password) => {
  const response = await axiosInstance.post("/users/login", {
    email,
    password,
  });

  console.log(response);
  return response.data;
};
const signup = async ({ full_name, email, password }) => {
  const response = await axiosInstance.post("/users/signup", {
    full_name,
    email,
    password,
    password_confirm: password,
  });

  console.log(response);
  return response.data;
};

async function uploadImg(image, imageName) {
  // Uploading the image
  console.log(image, imageName);
  const { error: storageError } = await supabase.storage
    .from("users-images")
    .upload(imageName, image);

  if (storageError) {
    throw new Error("An Error has occured!");
  }
}

const updateUser = async (userToEdit) => {
  try {
    let { user_id, ...editValues } = userToEdit;
    const imgFile = editValues.image;
    console.log(imgFile);
    let imageName;
    if (imgFile) {
      imageName = `${Math.random()}-${editValues.image.name}`.replaceAll(
        "/",
        ""
      );
      const imagePath = `${supabaseUrl}/storage/v1/object/public/users-images/${imageName}`;
      editValues = { ...editValues, image: imagePath };
      await uploadImg(imgFile, imageName);
    }
    console.log(editValues);
    const response = await axiosInstance.put(`/users/updateMe`, editValues, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const updatePassword = async ({ currentPassword, newPassword }) => {
  try {
    console.log(11);
    const response = await axiosInstance.put(
      `/users/updatepassword`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export { login, signup, updateUser, updatePassword };
