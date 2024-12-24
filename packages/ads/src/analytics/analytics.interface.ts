import { type paths } from './schema';
import { CorcaDataCore } from '../core';

export interface CorcaDataAnalyticsParams {
  core: CorcaDataCore;
  receiverEndpoint: string;
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

export type CorcaDataAnalyticsOnPageViewParams = OmitSessionFields<
  paths['/v1/events/page-view/product-detail']['post']['requestBody']['content']['application/json']
>;

export type CorcaDataAnalyticsOnClickParams = OmitSessionFields<
  paths['/v1/events/click']['post']['requestBody']['content']['application/json']
>;

export type CorcaDataAnalyticsOnImpressionParams = OmitSessionFields<
  paths['/v1/events/impression']['post']['requestBody']['content']['application/json']
>;

export type CorcaDataAnalyticsOnAddToCartParams = OmitSessionFields<
  paths['/v1/events/add-to-cart']['post']['requestBody']['content']['application/json']
>;

export type CorcaDataAnalyticsOnPurchaseParams = OmitSessionFields<
  paths['/v1/events/purchase']['post']['requestBody']['content']['application/json']
>;
