import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface BodyRequest<T> extends Request {
  body: T;
}

export interface ParamsRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export interface BodyParamsRequest<T extends ParamsDictionary, U> extends Request {
  params: T;
  body: U;
}
