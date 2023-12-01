import { HttpResponse } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode:200, 
  body
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode:201, 
  body
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    boby: message
  };
};


export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    boby: 'Something went wrong'
  };
};