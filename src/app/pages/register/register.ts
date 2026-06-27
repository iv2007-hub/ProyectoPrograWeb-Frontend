import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  roles = ['Donante', 'Receptor'];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    this.authService.register(this.fullName, this.email, this.password, this.role).subscribe({
      next: () => {
        this.successMessage = 'Cuenta creada. Ahora inicia sesion.';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
