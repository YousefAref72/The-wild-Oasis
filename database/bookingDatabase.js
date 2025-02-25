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
    b.cabin_id,
    b.guest_id, 
    c.name ,
    g.full_name, g.email,g.country_flag, g.national_id,g.nationality
     `;

  query += ` LIMIT ${LIMIT} OFFSET ${(page - 1) * LIMIT}`;

  const bookings = await pool.query(query);
  if (bookings.rowCount) return bookings.rows;
};
export { retrieveBookings };
