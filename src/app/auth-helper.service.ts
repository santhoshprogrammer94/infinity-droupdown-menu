import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

const accessTokenKey = 'refreshToken';
const roleKey = 'roleKey';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  isUserLogged$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  userRole$: Subject<string> = new BehaviorSubject<string>("");

  private isSessionStored: boolean;

  constructor() {
    this.isSessionStored = !!window.sessionStorage.getItem(accessTokenKey);
    this.isUserLogged$.next(!!this.storage.getItem(accessTokenKey));
    this.userRole$.next(this.storage.getItem(roleKey));
  }

  private get storage() {
    return this.isSessionStored ? window.sessionStorage : window.localStorage;
  }

  setAccessToken(accessToken: string,
    isSessionStored: boolean,
    role: string,
  ): void {
    this.isSessionStored = isSessionStored;
    this.storage.setItem(accessTokenKey, accessToken);
    this.storage.setItem(roleKey, role);
    this.isUserLogged$.next(true);
    this.userRole$.next(role);
  }

  getAccessToken(): string {
    return this.storage.getItem(accessTokenKey);
  }

  removeAccessToken(): void {
    this.storage.removeItem(accessTokenKey);
    this.storage.removeItem(roleKey);
    this.isUserLogged$.next(false);
  }
}
