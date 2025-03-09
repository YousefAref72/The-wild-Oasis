import pool from "../server.js";

const retrieveBookings = async (fields = [], filters = [], sort = [], page) => {
  // changable !!
  const LIMIT = 10;

  let query = `SELECT `;
  if (fields.length) {
    fields.forEach(
      (field, i) => (query += field + (i !== fields.length - 1 ? " , " : " "))
    );
  } else {
    query += `
    b.booking_id,
    b.created_at,
    b.start_date,
    b.end_date,
    b.num_nights,
    b.num_guests,
    b.cabin_price,
    b.total_price,
    b.status,
    b.is_paid,
    b.has_breakfast,
    b.observations,
    b.cabin_id,
    b.guest_id
    `;
  }
  query +=
    ",c.name, g.full_name, g.email, g.country_flag, g.national_id,g.nationality from Bookings b, cabins c, guests g where c.cabin_id = b.cabin_id and g.guest_id = b.guest_id";

  if (filters.length) {
    query += " AND ";
    filters = filters.join(" AND ");
    query += filters;
  }

  if (sort.length) {
    query += " ORDER BY ";
    sort = sort.join(" , ");
    query += sort;
  }
  query += ` GROUP BY 
    b.booking_id,
    b.created_at,
    b.start_date,
    b.end_date,
    b.num_nights,
    b.num_guests,
    b.cabin_price,
    b.total_price,
    b.status,
    b.has_breakfast,
    b.observations,
    b.is_paid,
    b.cabin_id,
    b.guest_id, 
    c.name ,
    g.full_name, g.email,g.country_flag, g.national_id,g.nationality
     `;

  query += ` LIMIT ${LIMIT} OFFSET ${(page - 1) * LIMIT}`;

  const bookings = await pool.query(query);
  if (bookings.rowCount) return bookings.rows;
};

const retrieveBookingsAfterDate = async (date, fields) => {
  try {
    // let query = `select created_at, total_price, cabin_price from bookings where created_at >= $1`;
    let query = `select `;
    if (fields.length) {
      fields.forEach(
        (field, i) => (query += field + (i !== fields.length - 1 ? " , " : " "))
      );
    } else {
      query += `
      b.booking_id,
      b.created_at,
      b.start_date,
      b.end_date,
      b.num_nights,
      b.num_guests,
      b.cabin_price,
      b.total_price,
      b.status,
      b.is_paid,
      b.has_breakfast,
      b.observations,
      b.cabin_id,
      b.guest_id
      `;
    }
    query +=
      ", g.full_name from Bookings b, guests g where g.guest_id = b.guest_id and b.created_at >= $1";
    console.log(fields);
    // console.log(date);
    const bookings = await pool.query(query, [date]);
    if (bookings.rowCount) return bookings.rows;
    return false;
  } catch (error) {
    throw error;
  }
};

const editBooking = async (toBeUpdated, booking_id) => {
  try {
    let query = `update Bookings SET `;
    let cnt = 0;
    Object.entries(toBeUpdated).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v || v === 0) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where booking_id = $${++cnt}
      returning *`;
    const readyAtt = Object.values(toBeUpdated).filter((val) => {
      if (val || val === 0) {
        return val + "";
      }
    });
    console.log(query);
    const updatedBooking = await pool.query(query, [...readyAtt, booking_id]);
    if (updatedBooking.rowCount) return updatedBooking.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeBooking = async (id) => {
  try {
    const query = `delete from bookings where booking_id = $1`;
    const res = await pool.query(query, [id]);

    return res.rowCount;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export {
  retrieveBookings,
  retrieveBookingsAfterDate,
  editBooking,
  removeBooking,
};
