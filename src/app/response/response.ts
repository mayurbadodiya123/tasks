import httpStatus from "http-status";

class ResponseStatus {
  static success = (message: string, data: any) => {
    return {
      setting: {
        message,
        status: httpStatus.OK,
      },
      data: data || [],
    };
  };
}

export default ResponseStatus;
