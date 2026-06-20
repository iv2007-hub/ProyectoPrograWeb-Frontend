import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryResponseDto } from '../../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  // Usamos un signal para manejar el estado de la lista de forma reactiva
  categories = signal<CategoryResponseDto[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadCategories();
  }

  // Carga todas las categorías
  loadCategories(): void {
    this.isLoading.set(true);
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar las categorías. Inténtalo de nuevo.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  // Cambiar el estado de Activo/Inactivo desde la tabla
  onToggleStatus(id: string): void {
    this.categoryService.toggleStatus(id).subscribe({
      next: (updatedCategory) => {
        // Actualizamos la lista localmente de inmediato para que se refleje en la pantalla
        this.categories.update((prev) =>
          prev.map((cat) => (cat.id === id ? updatedCategory : cat)),
        );
      },
      error: (err) => {
        alert('No se pudo cambiar el estado de la categoría.');
        console.error(err);
      },
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/admin/categories/edit', id]);
  }
  onNewCategory(): void {
    this.router.navigate(['/admin/categories/new']);
  }
}
