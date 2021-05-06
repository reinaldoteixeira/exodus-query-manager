import * as core from 'express-serve-static-core';

export interface Query extends core.Query {}

export interface Params extends core.ParamsDictionary {}

export interface CustomRequest<
  ReqBody = any,
  ReqQuery = Query,
  URLParams extends Params = core.ParamsDictionary
> extends core.Request<URLParams, any, ReqBody, ReqQuery> {}

export interface ListType extends Query {
  status?: string;
  take: string;
  skip: string;
}

export interface DetailType extends Params {
  id: string;
}

export interface ExplainQueryType extends Query {
  database: string;
}

export interface ExplainParamType extends Params {
  id: string;
}

export interface ExplainType {
  id: string;
  database: string;
}

export interface CreateType {
  userId: string;
  host: string;
  ddl: string;
  databases: string;
  description: string;
  timeToRun: string;
  schedule: string;
}

export interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

export interface ResponseListType {
  success: boolean;
  data?: object;
  total?: number;
  message?: string;
}