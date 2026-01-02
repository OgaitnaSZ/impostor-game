import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Storage } from '../../../core/services/storage';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-players',
  imports: [FormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
  router = inject(Router);
  storage = inject(Storage);
  snackbarService = inject(Snackbar);
  max = 20;
  players = this.storage.jugadores;

  agregarJugador() {
    const players = this.players();
    let player = `Jugador ${this.players().length + 1}`;
    let increment = 1;

    if (players.length >= this.max) {
      this.snackbarService.show('Se ha alcanzado el número máximo de jugadores.', 'error');
      return;
    }

    while (players.find(p => p.nombre === player)){
      player = `Jugador ${players.length + increment}`;
      increment++;
    }

    const hayDuplicados = players.some((p, i) =>
      players.some((p2, j) =>
        i !== j &&
        p.nombre?.trim().toLowerCase() === p2.nombre?.trim().toLowerCase()
      )
    );
  
    if (hayDuplicados) {
      this.snackbarService.show('Ya existe un jugador con ese nombre', 'error');
      return;
    }

    this.storage.agregarJugador({ nombre: player, rol: 'civil' });
  }

  eliminarJugador(index: number) {
    this.storage.eliminarJugador(index);
  }

  actualizarJugadores() {
    const players = this.players();
  
    const hayDuplicados = players.some((p, i) =>
      players.some((p2, j) =>
        i !== j &&
        p.nombre?.trim().toLowerCase() === p2.nombre?.trim().toLowerCase()
      )
    );
  
    if (hayDuplicados) {
      this.snackbarService.show('Ya existe un jugador con ese nombre', 'error');
      return;
    }
  
    this.storage.guardarJugadores(players);
  }

  tieneNombreDuplicado(index: number): boolean {
    const nombreActual = this.players()[index].nombre?.trim().toLowerCase();
  
    if (!nombreActual) return false;
  
    return this.players().some(
      (p, i) =>
        i !== index &&
        p.nombre?.trim().toLowerCase() === nombreActual
    );
  }
}
