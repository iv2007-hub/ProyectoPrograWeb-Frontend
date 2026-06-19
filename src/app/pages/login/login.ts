import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        const role = this.authService.getRole()?.toLowerCase();
        console.log('ROL EXACTO:', JSON.stringify(role));

        //Redirige segun el rol del usuario
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'donante') {
          this.router.navigate(['/donor']);
        } else if (role === 'receptor') {
          this.router.navigate(['/receiver']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales invalidas. Intenta de nuevo...';
        this.isLoading = false;
      },
    });
  }
}
