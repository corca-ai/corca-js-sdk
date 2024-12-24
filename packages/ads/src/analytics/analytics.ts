import {
  CorcaDataAnalyticsParams,
  CorcaDataAnalyticsOnPageViewParams,
  CorcaDataAnalyticsOnImpressionParams,
  CorcaDataAnalyticsOnClickParams,
  CorcaDataAnalyticsOnAddToCartParams,
  CorcaDataAnalyticsOnPurchaseParams,
} from './analytics.interface';
import { CorcaHttpPost } from '../corca-http-post';

export class CorcaDataAnalytics extends CorcaHttpPost {
  constructor(params: CorcaDataAnalyticsParams) {
    super({
      core: params.core,
      baseURL: params.receiverEndpoint || 'https://receiver.corca.dev',
    });
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
