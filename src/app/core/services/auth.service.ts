import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.BASE_URL;
  private endPointUrl = this.baseUrl + '/auth';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.endPointUrl}/login`;
    return this.http.post(url, {
      data: {
        username,
        password
      }
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.endPointUrl}/register`;
    return this.http.post(url, { username, email, password });
  }

}
