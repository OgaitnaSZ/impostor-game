import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-timer',
  imports: [CommonModule],
  templateUrl: './game-timer.html',
  styleUrl: './game-timer.css',
})
export class GameTimer {
  @Input() tiempoFormateado!: string;
  @Input() primerJugador!: string;
  @Output() onEndGame = new EventEmitter<void>();
}
