import {
  CorcaDataAnalyticsOnPageViewParams,
  CorcaDataAnalyticsOnAddToCartParams,
  CorcaDataAnalyticsOnClickParams,
  CorcaDataAnalyticsOnPurchaseParams,
  CorcaDataAnalyticsOnImpressionParams,
} from './analytics';

export interface CorcaDataParams {
  storeId: string;
  customerId?: string;
  serverMode?: boolean;
  deviceId?: string;
  sessionId?: string;
  receiverEndpoint?: string;
}

export interface CorcaDataConfig extends CorcaDataParams {
  receiverEndpoint: string;
}

export type CorcaDataOnPageViewParams = CorcaDataAnalyticsOnPageViewParams;

export type CorcaDataOnImpressionParams = CorcaDataAnalyticsOnImpressionParams;

export type CorcaDataOnClickParams = CorcaDataAnalyticsOnClickParams;

export type CorcaDataOnAddToCartParams = CorcaDataAnalyticsOnAddToCartParams;

export type CorcaDataOnPurchaseParams = CorcaDataAnalyticsOnPurchaseParams;

export type CorcaDataObserveImpressionParams = {
  element: Element;
  onImpression?: () => void;
  filter?: (element: Element) => boolean;
  once?: boolean;
};
