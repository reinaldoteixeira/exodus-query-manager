import * as core from 'express-serve-static-core';

export interface Query extends core.Query {}

export interface Params extends core.ParamsDictionary {}

export interface CustomRequest<
  ReqBody = any,
  ReqQuery = Query,
  URLParams extends Params = core.ParamsDictionary
> extends core.Request<URLParams, any, ReqBody, ReqQuery> {}

export interface ResponseListType {
  success: boolean;
  data?: object;
  message?: string;
}

export interface CreateType {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

export interface IdParamType extends Params {
  id: string;
}

export interface EditBodyType extends CreateType {}

export interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}
