import pool from "../server.js";

const retrieveSettings = async () => {
  try {
    const query = `select max_booking_length , min_booking_length , max_guest_per_booking , breakfast_price from Settings`;
    const setting = await pool.query(query);
    return setting.rows[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
const editSettings = async (toBeUpdated) => {
  try {
    let query = `update Settings SET `;
    let cnt = 0;
    Object.entries(toBeUpdated).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v || v === 0) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` returning *`;

    const readyAtt = Object.values(toBeUpdated).filter((val) => {
      if (val || val === 0) {
        return val + "";
      }
    });
    const updatedSettings = await pool.query(query, readyAtt);
    if (updatedSettings.rowCount) return updatedSettings.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { retrieveSettings, editSettings };
