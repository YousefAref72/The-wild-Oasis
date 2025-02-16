import pool from "../server.js";

const retrieveCabins = async (filters) => {
  let query = "select ";
  query +=
    "cabin_id,name, discount, regular_price, max_capacity, description, image ";

  query += " from cabins ";
  if (filters) {
    query += "where " + filters.join(" AND ");
  }
  const cabins = await pool.query(query);
  return cabins.rows;
};

const addCabin = async (attributes) => {
  try {
    const query = `insert into cabins (name,discount,regular_price,max_capacity,description,image)
    values ($1,$2,$3,$4,$5,$6) returning *`;
    console.log(query);
    const newCabin = await pool.query(query, attributes);
    if (newCabin.rowCount) return newCabin.rows[0];
    return false;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const removeCabin = async (id) => {
  try {
    const query = `delete from cabins where cabin_id = $1`;
    const res = await pool.query(query, [id]);

    return res.rowCount;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export { addCabin, retrieveCabins, removeCabin };
