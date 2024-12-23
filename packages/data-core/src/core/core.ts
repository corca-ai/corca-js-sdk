import { CorcaDataCoreParams } from './core.interface';
import { createStorage } from '../storage/storage.factory';
import { Storage } from '../storage/storage.interface';

export class CorcaDataCore {
  private sessionStorage: Storage<string>;

  private storeId: string;
  private serverMode: boolean;

  private deviceId: string;
  private customerId?: string;

  constructor({
    storeId,
    customerId,
    serverMode,
    deviceId,
    sessionId,
  }: CorcaDataCoreParams) {
    this.storeId = storeId;

    this.serverMode = serverMode || false;
    if (this.serverMode) {
      if (!deviceId || !sessionId) {
        throw new Error('Server mode requires deviceId and sessionId');
      }
      this.deviceId = deviceId;
      this.sessionStorage = createStorage({
        memory: { initialValue: sessionId },
      });
    } else {
      this.deviceId = createStorage({
        local: { key: `adcio-device-${storeId}` }, // TODO adcio -> corca-data
      }).getOrSet();
      this.sessionStorage = createStorage({
        session: {
          key: `adcio-session-${storeId}`, // TODO adcio -> corca-data
          expiration: 30 * 60 * 1000, // GA default: 30 mins
        },
      });
      this.sessionStorage.getOrSet(); // initialize sessionId if it's expired
    }

    this.customerId = customerId;
  }

  public setCustomerId(customerId: string) {
    this.customerId = customerId;
  }

  public getSessionDto(): {
    storeId: string;
    sessionId: string;
    deviceId: string;
    customerId?: string;
  } {
    return {
      storeId: this.getStoreId(),
      sessionId: this.getSessionId(),
      deviceId: this.getDeviceId(),
      customerId: this.getCustomerId(),
    };
  }

  public getSessionId(): string {
    return this.sessionStorage.get();
  }

  public getStoreId(): string {
    return this.storeId;
  }

  public getDeviceId(): string {
    return this.deviceId;
  }

  public getCustomerId(): string | undefined {
    return this.customerId;
  }
}
