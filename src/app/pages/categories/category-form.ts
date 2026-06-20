import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryCreateDto, CategoryUpdateDto } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estado del formulario
  categoryName = signal<string>('');
  isEditMode = signal<boolean>(false);
  categoryId = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
    // Detectar si venimos a editar (si hay un ID en la URL)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.categoryId.set(id);

    }
  }

  onSubmit(): void {
    if (!this.categoryName().trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    this.isSubmitting.set(true);

    if (this.isEditMode()) {
      // Caso: EDITAR (PUT)
      const updateDto: CategoryUpdateDto = { name: this.categoryName() };
      this.categoryService.update(this.categoryId()!, updateDto).subscribe({
        next: () => {
          alert('Categoría actualizada con éxito');
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          alert('Error al actualizar la categoría');
          this.isSubmitting.set(false);
          console.error(err);
        },
      });
    } else {
      // Caso: CREAR (POST)
      const createDto: CategoryCreateDto = { name: this.categoryName() };
      this.categoryService.create(createDto).subscribe({
        next: () => {
          alert('Categoría creada con éxito');
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          alert('Error al crear la categoría');
          this.isSubmitting.set(false);
          console.error(err);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/categories']);
  }
}
