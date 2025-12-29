import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Storage } from '../../core/services/storage';

@Component({
  selector: 'app-setup',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './setup.html',
  styleUrl: './setup.css',
})
export class Setup {
  storage = inject(Storage);

  categoria = this.storage.categoria;
  jugadores = this.storage.cantidadJugadores;
  impostores = this.storage.impostores;
}
