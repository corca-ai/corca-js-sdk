import {
  CorcaDataAnalyticsOnPageViewParams,
  CorcaDataAnalyticsOnAddToCartParams,
  CorcaDataAnalyticsOnPurchaseParams,
  CorcaDataAnalyticsOnClickParams,
  CorcaDataAnalyticsOnImpressionParams,
} from './analytics';
import { CorcaDataAnalytics } from './analytics';
import { CorcaDataCore } from './core';
import { ImpressionObserver } from './impression-observer';

export type CorcaAdsParams = {
  storeId: string;
  customerId?: string;
  serverMode?: boolean;
  deviceId?: string;
  sessionId?: string;
  receiverEndpoint?: string;
};

export type CorcaAdsConfig = CorcaAdsParams & {
  receiverEndpoint: string;
};

export type CorcaDataObserveImpressionParams = {
  element: Element;
  onImpression?: () => void;
  filter?: (element: Element) => boolean;
  once?: boolean;
};

export class CorcaAds {
  protected readonly config: CorcaAdsConfig;
  protected core: CorcaDataCore;
  protected analytics: CorcaDataAnalytics;

  constructor(config: CorcaAdsParams) {
    this.config = {
      receiverEndpoint: 'https://receiver.corca.dev',
      ...config,
    };
    this.core = new CorcaDataCore({
      storeId: this.config.storeId,
      customerId: this.config.customerId,
      serverMode: this.config.serverMode,
      deviceId: this.config.deviceId,
      sessionId: this.config.sessionId,
    });

    this.analytics = new CorcaDataAnalytics({
      core: this.core,
      receiverEndpoint: this.config.receiverEndpoint,
    });
  }

  public getConfig() {
    return this.config;
  }

  public getDeviceId() {
    return this.core.getDeviceId();
  }

  public getCustomerId() {
    return this.core.getCustomerId();
  }

  public setCustomerId(customerId: string) {
    this.core.setCustomerId(customerId);
  }

  public getSessionId() {
    return this.core.getSessionId();
  }

  public getSessionDto() {
    return this.core.getSessionDto();
  }

  public onPageView(params: CorcaDataAnalyticsOnPageViewParams) {
    return this.analytics.onPageView(params);
  }

  public onAddToCart(params: CorcaDataAnalyticsOnAddToCartParams) {
    return this.analytics.onAddToCart(params);
  }

  public onPurchase(params: CorcaDataAnalyticsOnPurchaseParams) {
    return this.analytics.onPurchase(params);
  }

  public onImpression(logOptions: CorcaDataAnalyticsOnImpressionParams) {
    return this.analytics.onImpression(logOptions);
  }

  public onClick(logOptions: CorcaDataAnalyticsOnClickParams) {
    return this.analytics.onClick(logOptions);
  }

  public observeImpression(params: CorcaDataObserveImpressionParams) {
    const observer = new ImpressionObserver({ filter: params.filter });
    if (params.onImpression) {
      observer.addImpressionListener(params.element, params.onImpression);
    }
    return observer.observe(params.element);
  }
}
