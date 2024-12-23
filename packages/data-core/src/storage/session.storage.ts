import { SessionStorageParams, Storage } from './storage.interface';

export class SessionStorage implements Storage<string> {
  private key: string = '';
  private newKey: string = '';

  constructor(config: SessionStorageParams) {
    const { key, expiration } = config;
    this.key = key;
    if (expiration) {
      const timer = setTimeout(() => this.reset(), expiration);
      window.addEventListener('unload', () => clearTimeout(timer));
    }
    if (this.key.startsWith('adcio-')) {
      this.newKey = this.key.replace('adcio-', 'corca-');
    }
  }

  reset(): string {
    this.set('');
    return this.getOrSet();
  }

  set(id: string): void {
    if (!sessionStorage) return;
    if (this.newKey) {
      sessionStorage.setItem(this.newKey, id);
    }
    sessionStorage.setItem(this.key, id);
  }

  getOrSet(): string {
    let id = this.get();
    if (!id) {
      id = crypto.randomUUID();
      this.set(id);
    }
    this.set(id);
    return id;
  }

  get(): string {
    if (!sessionStorage) return '';
    const value = sessionStorage.getItem(this.key);
    if (!value) return '';

    return value;
  }
}
