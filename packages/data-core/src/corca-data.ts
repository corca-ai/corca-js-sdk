import {
  CorcaDataObserveImpressionParams,
  CorcaDataOnAddToCartParams,
  CorcaDataOnClickParams,
  CorcaDataOnImpressionParams,
  CorcaDataOnPageViewParams,
  CorcaDataOnPurchaseParams,
  CorcaDataConfig,
  CorcaDataParams,
} from './corca-data.interface';
import { CorcaDataAnalytics } from './analytics';
import { CorcaDataCore } from './core';
import { CorcaDataImpressionObserver } from './impression-observer';

export class CorcaData {
  private readonly config: CorcaDataConfig;
  private core: CorcaDataCore;
  private analytics: CorcaDataAnalytics;

  constructor(config: CorcaDataParams) {
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

  // AdcioAnalytics
  public onPageView(params: CorcaDataOnPageViewParams) {
    return this.analytics.onPageView(params);
  }

  public onImpression(logOptions: CorcaDataOnImpressionParams) {
    return this.analytics.onImpression(logOptions);
  }

  public onClick(logOptions: CorcaDataOnClickParams) {
    return this.analytics.onClick(logOptions);
  }

  public onAddToCart(params: CorcaDataOnAddToCartParams) {
    return this.analytics.onAddToCart(params);
  }

  public onPurchase(params: CorcaDataOnPurchaseParams) {
    return this.analytics.onPurchase(params);
  }

  // AdcioImpressionObserver
  public observeImpression(params: CorcaDataObserveImpressionParams) {
    const observer = new CorcaDataImpressionObserver({ filter: params.filter });
    if (params.onImpression) {
      observer.addImpressionListener(params.element, params.onImpression);
    }
    return observer.observe(params.element);
  }
}
