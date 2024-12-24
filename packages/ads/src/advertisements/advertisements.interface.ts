import { type paths } from './schema';
import { CorcaDataCore } from '../core';

export interface CorcaAdvertisementsParams {
  core: CorcaDataCore;
  apiEndpoint: string;
}

type OmitSessionFields<T> = Omit<
  T,
  | 'storeId'
  | 'sessionId'
  | 'deviceId'
  | 'customerId'
  | 'sdkVersion'
  | 'userAgent'
>;

export type CorcaAdvertisementsProductsParams = OmitSessionFields<
  paths['/v1/advertisements/products']['post']['requestBody']['content']['application/json']
>;
