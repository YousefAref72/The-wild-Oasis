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
  if (user.rowCount) return user.rows[0];
  return false;
};
const getUserByEmail = async (email) => {
  const query = `select * from users where email = $1`;
  const user = await pool.query(query, [email]);
  if (user.rowCount) return user.rows[0];
  return false;
};

const updateUser = async (toBeUpdated, user_id) => {
  try {
    let query = `update Users SET `;
    let cnt = 0;
    Object.entries(toBeUpdated).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v || v === 0) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where user_id = $${++cnt}
      returning *`;
    const readyAtt = Object.values(toBeUpdated).filter((val) => {
      if (val || val === 0) {
        return val + "";
      }
    });
    console.log(query);
    const updatedUser = await pool.query(query, [...readyAtt, user_id]);
    if (updatedUser.rowCount) return updatedUser.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePassword = async (password, id) => {
  try {
    const query = `update users
                  set password = $1,
                  password_confirm = $1,
                  updated_at = now()
                  where user_id = $2 returning *`;
    const res = await pool.query(query, [password, id]);
    if (res.rowCount) return res.rows[0];
    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { signUpDb, getUserById, getUserByEmail, updatePassword, updateUser };
