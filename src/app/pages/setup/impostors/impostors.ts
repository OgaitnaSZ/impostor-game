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
  impostores = 1;

  ngOnInit(){
    const storedImpostor = this.storage.cargarImpostores();
    if(storedImpostor){
      this.impostores = storedImpostor;
    }
  }

  aumentarImpostores(){
    if(this.impostores < 4){
      this.impostores++;
      this.storage.guardarImpostores(this.impostores);
    }
  }

  disminuirImpostores(){
    if(this.impostores >1){
      this.impostores--;
      this.storage.guardarImpostores(this.impostores);
    }
  }
}
