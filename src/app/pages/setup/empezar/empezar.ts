import { Component, inject } from '@angular/core';
import { Storage } from '../../../core/services/storage';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empezar',
  imports: [RouterLink],
  templateUrl: './empezar.html',
  styleUrl: './empezar.css',
})
export class Empezar {
  storage = inject(Storage);
  categoria = '';
  jugadores : number | undefined = 0;
  impostores : number | null = null;

  ngOnInit() {
    this.categoria = this.storage.cargarCategoria();
    this.jugadores = this.storage.cargarJugadores().length;
    this.impostores = this.storage.cargarImpostores();
  }
}
