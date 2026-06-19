// ¿Qué es un guard?
// Es una función que Angular ejecuta ANTES de mostrar una pantalla.
// Si el guard devuelve true, deja pasar. Si devuelve false, bloquea
// y normalmente redirige a otra pantalla (en este caso, al login).

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

// CanActivateFn es el tipo que Angular espera para los guards modernos
// (la forma de función, sin necesitar una clase completa)
export const authGuard: CanActivateFn = () => {
  // inject() es otra forma de obtener servicios, se usa fuera de constructores
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay un token guardado, dejamos pasar al usuario
  if (authService.isLoggedIn()) {
    return true;
  }

  // Si no hay token, lo mandamos al login en lugar de mostrar la pantalla protegida
  router.navigate(['/login']);
  return false;
};
