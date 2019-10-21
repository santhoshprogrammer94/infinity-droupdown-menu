import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { AuthHelperService } from './auth-helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseApiService {

  constructor(http: HttpClient, authService: AuthHelperService) {
    super(http, authService);
  }

  getData(data: any): Observable<any> {
    return super.get<any>('api/Movies/upComing', data, false);
  }
}
