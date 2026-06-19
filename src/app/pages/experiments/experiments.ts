import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ExperimentService } from '../../services/experiment.service';
import { AuthService } from '../../services/auth.service';
import { Experiment } from '../../models/experiment.model';

@Component({
  selector: 'app-experiments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './experiments.html',
  styleUrl: './experiments.css',
})
export class ExperimentsComponent implements OnInit {
  // Aquí guardamos la lista de experimentos que viene del backend
  experiments: Experiment[] = [];

  // Variables conectadas al formulario para crear un experimento nuevo
  title: string = '';
  result: string = '';
  success: boolean = false;

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private experimentService: ExperimentService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadExperiments();
  }

  // Pide al backend la lista de experimentos del usuario logueado
  loadExperiments(): void {
    this.experimentService.getMyExperiments().subscribe({
      next: (data) => {
        this.experiments = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los experimentos.';
      },
    });
  }

  // Se ejecuta cuando el usuario hace click en "Crear experimento"
  onCreate(): void {
    // Validación simple: el título no puede estar vacío
    if (!this.title.trim()) {
      this.errorMessage = 'El título es obligatorio.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.experimentService
      .create({
        title: this.title,
        result: this.result,
        success: this.success,
      })
      .subscribe({
        next: (newExperiment) => {
          // En lugar de volver a pedir toda la lista al backend, simplemente
          // agregamos el nuevo experimento al arreglo que ya tenemos en memoria
          // Esto hace que la pantalla se actualice al instante, sin esperar
          this.experiments.push(newExperiment);

          // Limpiamos el formulario para que esté listo para el siguiente experimento
          this.title = '';
          this.result = '';
          this.success = false;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'No se pudo crear el experimento.';
          this.isLoading = false;
        },
      });
  }

  // Cierra sesión y manda al usuario de vuelta al login
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
