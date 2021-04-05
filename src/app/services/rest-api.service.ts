import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  updateProfile(name: string, email: string, phone_number: string) {
    return this.http.post('/api/post', {name, email, phone_number}, {withCredentials: false});
  }
}
