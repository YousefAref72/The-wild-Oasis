import pool from "../server.js";

const signUpDb = async (attributes) => {
  const query = `insert into Users (full_name,email,password,password_confirm) values
                ($1,$2,$3,$4) returning *`;

  const newUser = await pool.query(query, attributes);
  if (newUser.rowCount) return newUser.rows[0];
  return false;
};

const getUserById = async (id) => {
  const query = `select * from users where user_id = $1`;
  const user = await pool.query(query, [id]);
  if (user.rowCount) return user;
  return false;
};
const getUserByEmail = async (email) => {
  const query = `select * from users where email = $1`;
  const user = await pool.query(query, [email]);
  if (user.rowCount) return user.rows[0];
  return false;
};

export { signUpDb, getUserById, getUserByEmail };