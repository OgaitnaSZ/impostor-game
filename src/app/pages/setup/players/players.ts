import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Storage } from '../../../core/services/storage';

@Component({
  selector: 'app-players',
  imports: [FormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
  router = inject(Router);
  storage = inject(Storage);
  max = 10;
  players = this.storage.jugadores;

  agregarJugador() {
    let player = `Jugador ${this.players().length + 1}`;
    let increment = 1;

    if (this.players().length >= this.max) {
      alert('Se ha alcanzado el número máximo de jugadores.');
      return;
    }

    while (this.players().find(p => p.nombre === player)){
      player = `Jugador ${this.players().length + increment}`;
      increment++;
    }

    this.storage.agregarJugador({ nombre: player, rol: 'civil' });
  }

  eliminarJugador(index: number) {
    this.storage.eliminarJugador(index);
  }

  actualizarJugadores() {
    const currentPlayers = this.players();
    this.storage.guardarJugadores(currentPlayers);
  }
}
