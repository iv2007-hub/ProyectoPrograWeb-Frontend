import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5126/api/Auth';

  constructor(private http: HttpClient) {}

  register(fullName: string, email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, {
      fullName,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  saveToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  // Decodifica el JWT para extraer la informacion del usuario
  // El token tiene 3 partes separadas por puntos: header.payload.signature
  // Solo necesitamos el payload, que esta en base64
  private decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  // Obtiene el rol del usuario actual desde el token
  getRole(): string | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;

    // El backend guarda el rol con esta clave especifica
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    return role ? role.toLowerCase() : null;
  }

  // Obtiene el id del usuario actual desde el token
  getUserId(): string | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;

    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  }

}
