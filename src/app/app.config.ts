// Este archivo configura cosas globales de la app — como qué servicios
// están disponibles para toda la aplicación desde el inicio.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // provideHttpClient habilita HttpClient en toda la app
    // Sin esto, AuthService y ExperimentService no podrían hacer peticiones HTTP
    // y Angular lanzaría un error al intentar inyectar HttpClient
    provideHttpClient(),
  ],
};
