// Este archivo define qué componente se muestra según la URL del navegador.
// Es como un mapa: "si la URL es /login, muestra LoginComponent", etc.

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ExperimentsComponent } from './pages/experiments/experiments';
import { ReceiverDashboard } from './pages/receiver/receiver-dashboard/receiver-dashboard';
import { DonorDashboard } from './pages/donor/donor-dashboard/donor-dashboard';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { DeliveryAuditLog } from './pages/admin/delivery-audit-log/delivery-audit-log';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  // Cuando la URL está vacía (la raíz del sitio), redirigimos a /login
  // pathMatch: 'full' significa que solo aplica si la URL está completamente vacía
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // canActivate: [authGuard] significa que antes de mostrar esta pantalla,
  // Angular ejecuta authGuard. Si el guard dice que no hay token, redirige a /login
  // Así evitamos que alguien sin sesión vea esta pantalla escribiendo la URL directo
  { path: 'experiments', component: ExperimentsComponent, canActivate: [authGuard] },

  { path: 'donor', component: DonorDashboard, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboard, canActivate: [authGuard] },
  { path: 'receiver', component: ReceiverDashboard, canActivate: [authGuard] },
  { path: 'admin/delivery-audit-log', component: DeliveryAuditLog, canActivate: [authGuard] },

  // Cualquier URL que no coincida con las anteriores, redirige a /login
  { path: '**', redirectTo: '/login' },
];
