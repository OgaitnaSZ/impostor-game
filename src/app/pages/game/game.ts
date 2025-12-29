import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../core/services/storage';
import { CommonModule } from '@angular/common';
import { Game as GameService } from '../../core/services/game';
import { PlayerReveal } from './player-reveal/player-reveal';
import { GameTimer } from './game-timer/game-timer';
import { GameEnd } from './game-end/game-end';

@Component({
  selector: 'app-game',
  imports: [    
    CommonModule, 
    PlayerReveal, 
    GameTimer, 
    GameEnd],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private storage = inject(Storage);
  private router = inject(Router);
  private gameService = inject(GameService);
  
  jugadores: Player[] = [];
  impostores: number | null = null;
  impostoresNombres: string[] = [];
  palabra = '';
  jugadorActualIndex = 0;
  tiempoTranscurrido = 0;
  partidaFinalizada = false;

  get tiempoFormateado(): string {
    return this.gameService.formatearTiempo(this.tiempoTranscurrido);
  }

  ngOnInit() {
    this.inicializarJuego();
  }

  ngOnDestroy() {
    this.gameService.detenerTemporizador();
  }

  inicializarJuego() {
    const jugadoresCargados = this.storage.cargarJugadores();
    this.impostores = this.storage.cargarImpostores();

    if (jugadoresCargados.length > 0 && this.impostores !== null && this.impostores > 0) {
      // Cargar palabra
      this.storage.cargarPalabra().subscribe(palabra => {
        this.palabra = palabra;
      });

      // Desordenar y asignar roles
      const jugadoresDesordenados = this.gameService.desordenarJugadores(jugadoresCargados);
      this.jugadores = this.gameService.asignarRoles(jugadoresDesordenados, this.impostores);
      console.log(this.jugadores);
      this.impostoresNombres = this.jugadores
        .filter(j => j.rol === 'impostor')
        .map(j => j.nombre);
    }
  }

  siguienteJugador() {
    if (this.jugadorActualIndex < this.jugadores.length - 1) {
      this.jugadorActualIndex++;
    } else {
      // Empezar partida e iniciar temporizador
      this.jugadorActualIndex++;
      this.gameService.iniciarTemporizador((tiempo) => {
        this.tiempoTranscurrido = tiempo;
      });
    }
  }

  terminarPartida() {
    this.tiempoTranscurrido = this.gameService.detenerTemporizador();
    this.partidaFinalizada = true;
  }

  volverAJugar() {
    this.jugadorActualIndex = 0;
    this.tiempoTranscurrido = 0;
    this.partidaFinalizada = false;
    this.inicializarJuego();
  }

  cambiarPalabra() {
    this.jugadorActualIndex = 0;
    this.inicializarJuego();
  }

  volverAlMenu() {
    this.gameService.detenerTemporizador();
    this.router.navigate(['/']);
  }
}