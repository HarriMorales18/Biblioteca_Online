import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api'
  private authApi = `${this.api}/auth`

  user = signal<any>(null)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: any) {
    return this.http.post(`${this.authApi}/login`, credentials)
  }

  register(data: any) {
    return this.http.post(`${this.authApi}/register`, data)
  }

  getCurrentUser(){
    return this.http.get(`${this.api}/users/me`)
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this.user.set(null)
    this.router.navigate(['/login'])
  }

  isLogged() {
    return !!localStorage.getItem('token')
  }

}