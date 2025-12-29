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
  players: Player[] = [];
  max = 10;
  impostores = 1;

  ngOnInit(){
    const storedPlayers = this.storage.cargarJugadores();
    if(storedPlayers){
      this.players = storedPlayers;
    }
  }

  agregarJugador(player: string){
    if(this.players.length >= this.max){
      alert('Se ha alcanzado el número máximo de jugadores.');
      return;
    }
    this.players.push({ nombre: player, rol: 'civil' });
    this.storage.guardarJugadores(this.players);
  }

  eliminarJugador(index: number){
    this.players.splice(index, 1);
    this.storage.guardarJugadores(this.players);
  }

  actualizarJugadores(){
    this.storage.guardarJugadores(this.players);
  }
}
