export function sendSuccess(res, data, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

export function sendError(res, message = "Error", statusCode = 500, data = null) {
  return res.status(statusCode).json({
    success: false,
    data,
    message,
  });
}

export default {
  sendSuccess,
  sendError,
};
