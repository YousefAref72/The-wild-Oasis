import axiosInstance from "./axiosInstance";

const login = async (email, password) => {
  const response = await axiosInstance.post("/users/login", {
    email,
    password,
  });

  console.log(response);
  return response.data;
};

export { login };
