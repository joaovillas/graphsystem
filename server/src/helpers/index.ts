export function responseHelper(message: string, statusCode: number) {
  return {
    "message": message,
    "status_code": statusCode,
  };
};
