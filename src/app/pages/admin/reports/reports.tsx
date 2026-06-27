import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {}
PS C:\Users\Roy Flores\WebstormProjects\ProyectoPrograWeb-Frontend> cat src/app/pages/register/register.html
<div class="register-container">
  <mat-card>
  <mat-card-header>
  <mat-card-title>Crear Cuenta</mat-card-title>
</mat-card-header>

<mat-card-content>
<mat-form-field appearance="outline">
  <mat-label>Nombre completo</mat-label>
<input matInput type="text" [(ngModel)]="fullName" placeholder="Tu nombre" />
  </mat-form-field>

  <mat-form-field appearance="outline">
  <mat-label>Email</mat-label>
  <input matInput type="email" [(ngModel)]="email" placeholder="tu@email.com" />
  </mat-form-field>

  <mat-form-field appearance="outline">
  <mat-label>ContraseÃ±a</mat-label>
<input matInput type="password" [(ngModel)]="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢" />
  </mat-form-field>

  <!-- Mostramos error O Ã©xito, segÃºn lo que haya pasado -->
  <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
<p class="success" *ngIf="successMessage">{{ successMessage }}</p>
</mat-card-content>

<mat-card-actions>
<button mat-raised-button color="primary" (click)="onRegister()" [disabled]="isLoading">
  {{ isLoading ? 'Creando...' : 'Registrarse' }}
</button>

<a routerLink="/login">Â¿Ya tienes cuenta? Inicia sesiÃ³n</a>
</mat-card-actions>
</mat-card>
</div>
