export function responseHelper(message: string, statusCode: number) {
  return {
    message,
    status_code: statusCode
  };
}
