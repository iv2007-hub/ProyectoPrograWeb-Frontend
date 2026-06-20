import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponseDto, CategoryCreateDto, CategoryUpdateDto } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Inyección de dependencias
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7200/api/Category';

  // GET: Obtener todas las categorías
  getAll(): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(this.apiUrl);
  }

  // POST: Crear una categoría
  create(dto: CategoryCreateDto): Observable<CategoryResponseDto> {
    return this.http.post<CategoryResponseDto>(this.apiUrl, dto);
  }

  // PUT: Editar una categoría por ID
  update(id: string, dto: CategoryUpdateDto): Observable<CategoryResponseDto> {
    return this.http.put<CategoryResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  // PATCH: Activar/Desactivar una categoría
  toggleStatus(id: string): Observable<CategoryResponseDto> {
    return this.http.patch<CategoryResponseDto>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
