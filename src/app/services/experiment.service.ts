import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiment, ExperimentDto } from '../models/experiment.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExperimentService {
  private apiUrl = 'http://localhost:5126/api/Experiment';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  create(dto: ExperimentDto): Observable<Experiment> {
    return this.http.post<Experiment>(this.apiUrl, dto, {
      headers: this.getHeaders(),
    });
  }

  getMyExperiments(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }
}
