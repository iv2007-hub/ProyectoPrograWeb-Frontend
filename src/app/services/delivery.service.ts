import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryRecord } from '../models/delivery.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private apiUrl = 'http://localhost:5126/api/Delivery';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  // Arma el header de autorización con el token guardado
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // GET /api/Delivery — el log completo de auditoría
  getAll(): Observable<DeliveryRecord[]> {
    return this.http.get<DeliveryRecord[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // GET /api/Delivery/user/{userId} — historial de un usuario específico
  getByUser(userId: string): Observable<DeliveryRecord[]> {
    return this.http.get<DeliveryRecord[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
