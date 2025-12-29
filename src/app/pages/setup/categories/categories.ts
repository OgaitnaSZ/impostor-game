import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../../core/services/storage';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [NgClass],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  router = inject(Router);
  storage = inject(Storage);

  categoriaActual = '';

  ngOnInit(){
    this.categoriaActual = this.storage.cargarCategoria();
  }

  protected readonly categories = [
    "Dragon Ball",
    "Jugadores de Futbol",
    "Trabajos",
    "Marcas",
    "Videojuegos"
  ]

  guardarCategoria(categoria: string) {
    this.storage.guardarCategoria(categoria);
    this.router.navigate(['/setup/players']);
  }
}
