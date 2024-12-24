import { type paths } from './schema';

import {
  CorcaDataAnalyticsParams,
  CorcaDataAnalyticsOnPageViewParams,
  CorcaDataAnalyticsOnImpressionParams,
  CorcaDataAnalyticsOnClickParams,
  CorcaDataAnalyticsOnAddToCartParams,
  CorcaDataAnalyticsOnPurchaseParams,
} from './analytics.interface';
import { CorcaDataCore } from '../core';
import { PACKAGE_VERSION } from '../version';
import axios from 'axios';

const sdkVersion = `js ${PACKAGE_VERSION}`;

export class CorcaDataAnalytics {
  private core: CorcaDataCore;
  private baseURL: string;

  constructor(params: CorcaDataAnalyticsParams) {
    this.core = params.core;
    this.baseURL = params.receiverEndpoint || 'https://receiver.corca.dev';
  }

  commonParams() {
    return {
      ...this.core.getSessionDto(),
      sdkVersion,
      userAgent:
        typeof navigator !== 'undefined' && navigator.userAgent
          ? navigator.userAgent
          : '',
    };
  }

  async post(
    path: keyof paths,
    params:
      | CorcaDataAnalyticsOnPageViewParams
      | CorcaDataAnalyticsOnImpressionParams
      | CorcaDataAnalyticsOnClickParams
      | CorcaDataAnalyticsOnAddToCartParams
      | CorcaDataAnalyticsOnPurchaseParams
  ) {
    await axios.post(
      path,
      { ...this.commonParams(), ...params },
      { baseURL: this.baseURL }
    );
  }

  async onPageView(params: CorcaDataAnalyticsOnPageViewParams) {
    await this.post('/v1/events/page-view/product-detail', params);
  }

  async onImpression(params: CorcaDataAnalyticsOnImpressionParams) {
    await this.post('/v1/events/impression', params);
  }

  async onClick(params: CorcaDataAnalyticsOnClickParams) {
    await this.post('/v1/events/click', params);
  }

  async onAddToCart(params: CorcaDataAnalyticsOnAddToCartParams) {
    await this.post('/v1/events/add-to-cart', params);
  }

  async onPurchase(params: CorcaDataAnalyticsOnPurchaseParams) {
    await this.post('/v1/events/purchase', params);
  }
}
