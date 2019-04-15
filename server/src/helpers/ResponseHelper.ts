const helper = (message:string,statusCode:number) => {
  return {
    "message":message,
    "status_code":statusCode,
  };
};

export default helper;