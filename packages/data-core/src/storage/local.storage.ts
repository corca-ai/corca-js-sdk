import { LocalStorageParams, Storage } from './storage.interface';

export class LocalStorage implements Storage<string> {
  private key: string = '';
  private newKey: string = '';

  constructor(config: LocalStorageParams) {
    const { key } = config;
    this.key = key;
    if (this.key.startsWith('adcio-')) {
      this.newKey = this.key.replace('adcio-', 'corca-');
    }
  }

  set(id: string): void {
    if (!localStorage) return;
    if (this.newKey) {
      localStorage.setItem(this.newKey, id);
    }
    localStorage.setItem(this.key, id);
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
    if (!localStorage) return '';
    const value = localStorage.getItem(this.key);
    if (!value) return '';

    return value;
  }
}
