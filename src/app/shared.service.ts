/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { apiPath, currencyApiKey } from 'src/environments/constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl = 'https://free.currconv.com/api/v7';
  public exit = new Subject<string>(); // Observable string sources
  exit$ = this.exit.asObservable(); // Observable string streams
  // public history = [];
  storageKey = 'history';
  // private _storage: Storage | null = null;
  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }
  exitApp() {
    this.exit.next();
  }

  async saveHistory(input: string, from: string, result: string, to: string, type: any) {
    // this.history.push({ input, from, result, to, type });
    const data = await this.storage.get(this.storageKey) || [];
    data.push({ input, from, result, to, type });
    this.storage?.set(this.storageKey, data);
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this.storage.create();
    // const storage = await this.storage.create();
    // this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    // return await this._storage?.set(key, value);
    return await this.storage?.set(key, value);
  }

  public async get(key?: string) {
    // return await this._storage?.get(key);
    return await this.storage?.get(key ? key : this.storageKey);
  }

  public async clear() {
    // return await this._storage?.get(key);
    return await this.storage?.clear();
  }

  getCurrencies() {
    return this.http.get(this.getApiUrl(apiPath.currencies));
  }

  getCountries() {
    return this.http.get(this.getApiUrl(apiPath.countries));
  }

  getConvert(q: string) {
    return this.http.get(this.getApiUrl(apiPath.convert, `&q=${q}`));
  }

  getHistorical(q: string, date: string, endDate: string) {
    let query = `&q=${q}`;
    query += `&date=${date}`;
    query += `&endDate=${endDate}`;
    return this.http.get(this.getApiUrl(apiPath.convert, query));
  }

  getApiUrl(path: string, query = '') {
    return `https://free.currconv.com/api/v7/${path}?apiKey=${currencyApiKey}${query}`;
  }
}
