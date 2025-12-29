import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-reveal',
  imports: [NgClass, CommonModule],
  templateUrl: './player-reveal.html',
  styleUrl: './player-reveal.css',
})
export class PlayerReveal {
  @Input() jugador!: Player;
  @Input() palabra!: string;
  @Input() textoBoton: string = 'Siguiente Jugador';
  @Output() onNextPlayer = new EventEmitter<void>();

  dragOffset = 0;
  isDragging = false;
  startY = 0;

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    event.preventDefault();
    const currentY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const diff = currentY - this.startY;
    
    if (diff > 0) {
      this.dragOffset = diff;
    }
  }

  endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.dragOffset = 0;
  }
}
