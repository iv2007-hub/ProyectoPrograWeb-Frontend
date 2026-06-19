// Este es el componente raíz, el punto de entrada de toda la app visual.
// Su único trabajo es mostrar el contenido de la ruta actual con <router-outlet>

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
