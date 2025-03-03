import axiosInstance from "./axiosInstance";

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

export { login, signup };
