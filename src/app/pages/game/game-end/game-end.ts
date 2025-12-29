import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-end',
  imports: [CommonModule],
  templateUrl: './game-end.html',
  styleUrl: './game-end.css',
})
export class GameEnd {
  @Input() tiempoFinal!: string;
  @Input() impostores!: string[];
  @Output() onPlayAgain = new EventEmitter<void>();
  @Output() onBackToMenu = new EventEmitter<void>();
}
