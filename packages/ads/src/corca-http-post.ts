import axios from 'axios';
import { CorcaDataCore } from './core';
import { PACKAGE_VERSION } from './version';

const sdkVersion = `js ${PACKAGE_VERSION}`;

export interface CorcaHttpPostParams {
  core: CorcaDataCore;
  baseURL: string;
}

export class CorcaHttpPost {
  private core: CorcaDataCore;
  private baseURL: string;

  constructor(params: CorcaHttpPostParams) {
    this.core = params.core;
    this.baseURL = params.baseURL;
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

  async post(path: string, params: any) {
    await axios.post(
      path,
      { ...this.commonParams(), ...params },
      { baseURL: this.baseURL }
    );
  }
}
