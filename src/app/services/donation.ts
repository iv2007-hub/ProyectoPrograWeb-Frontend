import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonationPost } from '../models/donation-post.model';
import { Category } from '../models/category.model';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private apiUrl = 'http://localhost:5126/api/Donation';

  constructor(private http: HttpClient) {}

  getActiveDonations(): Observable<DonationPost[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<DonationPost[]>(`${this.apiUrl}/active`, { headers });
  }

  createRequest(postId: string, receiverId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `http://localhost:5126/api/requests`,
      { postId, receiverId },
      { headers },
    );
  }

  getCategories(): Observable<Category[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Category[]>(`http://localhost:5126/api/category`, { headers });
  }

  getMyRequests(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`http://localhost:5126/api/requests/mine`, { headers });
  }

  getPostById(id: string): Observable<DonationPost> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<DonationPost>(`${this.apiUrl}/${id}`, { headers });
  }

  getNotifications(): Observable<Notification[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Notification[]>(`http://localhost:5126/api/Notification`, { headers });
  }

  confirmReception(requestId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `http://localhost:5126/api/requests/${requestId}/confirm-reception`,
      {},
      { headers },
    );
  }

  getMyDonations(): Observable<DonationPost[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<DonationPost[]>(`${this.apiUrl}/my-donations`, { headers });
  }

  getRequestsByPost(postId: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`http://localhost:5126/api/requests/${postId}`, { headers });
  }

  reservePost(postId: string, requestId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/${postId}/reserve`, { requestId }, { headers });
  }
  createPost(dto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}`, dto, { headers });
  }

  deletePost(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
  updatePost(id: string, dto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, dto, { headers });
  }
  scheduleDelivery(postId: string, dto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/${postId}/schedule`, dto, { headers });
  }

  confirmDelivery(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/${postId}/deliver`, {}, { headers });
  }

}
