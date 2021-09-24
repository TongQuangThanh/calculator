/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public exit = new Subject<string>(); // Observable string sources
  exit$ = this.exit.asObservable(); // Observable string streams
  public history = [];
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }
  exitApp() {
    this.exit.next();
  }
  saveHistory(input: string, result: string) {
    this.history.push({input, result});
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    return await this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }
}
