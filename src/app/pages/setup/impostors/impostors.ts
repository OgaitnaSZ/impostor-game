import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Storage } from '../../../core/services/storage';

@Component({
  selector: 'app-impostors',
  imports: [],
  templateUrl: './impostors.html',
  styleUrl: './impostors.css',
})
export class Impostors {
  storage = inject(Storage);
  impostores = this.storage.impostores;

  aumentarImpostores() {
    this.storage.aumentarImpostores();
  }

  disminuirImpostores() {
    this.storage.disminuirImpostores();
  }

}
