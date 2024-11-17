export class StorageService {
  private static _instance: StorageService;

  constructor(private storage: Storage = localStorage) {
    if (StorageService._instance) {
      return StorageService._instance;
    }

    StorageService._instance = this;
  }

  setItem(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    this.storage.setItem(key, serializedValue);
  }

  getItem<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  getToken(): string | null {
    const token = this.storage.getItem('authToken');
    return token ? JSON.parse(token) : null;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
