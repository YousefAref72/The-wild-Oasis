const formatString = (string) => {
  string = string.trim();
  string = string[0].toUpperCase() + string.slice(1).toLowerCase();
  return string;
};

const filtersQueryHandler = (query, validAttributes) => {
  if (
    Object.entries(query).some((filter) => !validAttributes.includes(filter[0]))
  )
    return false;

  const filters = Object.entries(query).map(([key, val]) => {
    if (key.endsWith("id")) return `${key}=${+val}`;
    return `${key}='${val}'`;
  });
  // console.log(filters);
  return filters;
};

const fieldsQueryHandler = (query, validFields) => {
  if (!query.fields) return [];
  const fields = query.fields.split(",");
  if (fields.some((field) => !validFields.includes(field))) return false;
  return fields;
};

const globalErrorHandler = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

export {
  formatString,
  filtersQueryHandler,
  fieldsQueryHandler,
  globalErrorHandler,
};
