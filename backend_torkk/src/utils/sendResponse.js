/**
 * Standardized API response envelope.
 * Every response: { success, message, data, meta, errors }
 */
const sendResponse = (res, statusCode, message, data = null, errors = null, meta = null) => {
  const body = {
    success: statusCode < 400,
    message,
    data,
  };

  if (meta !== null) body.meta = meta;
  if (errors !== null) body.errors = errors;

  return res.status(statusCode).json(body);
};

module.exports = sendResponse;
