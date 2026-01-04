import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../core/services/storage';
import { CommonModule } from '@angular/common';
import { Game as GameService } from '../../core/services/game';
import { PlayerReveal } from './player-reveal/player-reveal';
import { GameTimer } from './game-timer/game-timer';
import { GameEnd } from './game-end/game-end';
import { CanComponentDeactivate } from '../../core/guards/game-guard';

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
  
  // Signals del storage (readonly)
  jugadoresStorage = this.storage.jugadores;
  impostoresStorage = this.storage.impostores;
  
  // Estado local del componente
  jugadores = signal<Player[]>([]);
  impostoresNombres = signal<string[]>([]);
  palabra = signal<string>('');
  jugadorActualIndex = signal<number>(0);
  tiempoTranscurrido = signal<number>(0);
  partidaFinalizada = signal<boolean>(false);
  
  get tiempoFormateado(): string {
    return this.gameService.formatearTiempo(this.tiempoTranscurrido());
  }

  ngOnInit() {
    this.inicializarJuego();
  }

  ngOnDestroy() {
    this.gameService.detenerTemporizador();
  }

  inicializarJuego() {
    this.gameInProgress = true;
    const jugadoresCargados = this.jugadoresStorage();
    const impostores = this.impostoresStorage();

    if (jugadoresCargados.length > 0 && impostores !== null && impostores > 0) {
      // Cargar palabra
      this.storage.cargarPalabra().subscribe(palabra => {
        this.palabra.set(palabra);
      });

      // Desordenar y asignar roles
      const jugadoresDesordenados = this.gameService.desordenarJugadores(jugadoresCargados);
      const jugadoresConRoles = this.gameService.asignarRoles(jugadoresDesordenados, impostores);
      
      this.jugadores.set(jugadoresConRoles);
      
      const nombresImpostores = jugadoresConRoles
        .filter(j => j.rol === 'impostor')
        .map(j => j.nombre);
      this.impostoresNombres.set(nombresImpostores);
    }
  }

  siguienteJugador() {
    const currentIndex = this.jugadorActualIndex();
    const totalJugadores = this.jugadores().length;
    
    if (currentIndex < totalJugadores - 1) {
      this.jugadorActualIndex.set(currentIndex + 1);
    } else {
      // Empezar partida e iniciar temporizador
      this.jugadorActualIndex.set(currentIndex + 1);
      this.gameService.iniciarTemporizador((tiempo) => {
        this.tiempoTranscurrido.set(tiempo);
      });
    }
  }

  terminarPartida() {
    const tiempoFinal = this.gameService.detenerTemporizador();
    this.tiempoTranscurrido.set(tiempoFinal);
    this.partidaFinalizada.set(true);
    this.gameInProgress = false;
  }

  volverAJugar() {
    this.jugadorActualIndex.set(0);
    this.tiempoTranscurrido.set(0);
    this.partidaFinalizada.set(false);
    this.inicializarJuego();
  }

  cambiarPalabra() {
    this.jugadorActualIndex.set(0);
    this.inicializarJuego();
  }

  volverAlMenu() {
    this.gameService.detenerTemporizador();
    this.router.navigate(['/']);
  }

    gameInProgress = false;

  canDeactivate(): boolean {
    if (this.gameInProgress) {
      return confirm('¿Estás seguro de que quieres salir? Perderás el progreso de la partida.');
    }
    return true;
  }
}