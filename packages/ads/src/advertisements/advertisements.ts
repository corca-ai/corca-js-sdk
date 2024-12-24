import {
  CorcaAdvertisementsParams,
  CorcaAdvertisementsProductsParams,
} from './advertisements.interface';
import { CorcaHttpPost } from '../corca-http-post';

export class CorcaAdvertisements extends CorcaHttpPost {
  constructor(params: CorcaAdvertisementsParams) {
    super({
      core: params.core,
      baseURL: params.apiEndpoint || 'https://api.ads.corca.dev',
    });
  }

  async products(params: CorcaAdvertisementsProductsParams) {
    await this.post('/v1/advertisements/products', params);
  }
}
