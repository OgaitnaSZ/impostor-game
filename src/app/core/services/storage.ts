import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  http = inject(HttpClient);

  guardarCategoria(categoria: string) {
    localStorage.setItem('category', JSON.stringify(categoria));
  }

  cargarCategoria() {
    const data = localStorage.getItem('category');
  
    if (data) {
      return JSON.parse(data);
    }
  }

  guardarJugadores(jugadores: Player[]) {
    localStorage.setItem('players', JSON.stringify(jugadores));
  }

  cargarJugadores() {
    const data = localStorage.getItem('players');
    if (data) {
      return JSON.parse(data);
    }
  }

  guardarImpostores(impostores: number) {
    localStorage.setItem('impostores', impostores.toString());
  }
  
  cargarImpostores(): number | null {
    const data = localStorage.getItem('impostores');
    return data !== null ? Number(data) : null;
  }

  cargarPalabra(): Observable<string> {
    const categoria = this.cargarCategoria();
    let ruta = ``;

    switch (categoria ){
      case 'Dragon Ball':
        ruta = '../data/dbz.json';
        break;

      case 'Jugadores de Futbol':
        ruta = '../data/futbol_jugadores.json';
        break;

      case 'Trabajos':
        ruta = '../data/trabajos.json';
        break;

      case 'Marcas':
        ruta = '../data/marcas.json';
        break;

      case 'Videojuegos':
        ruta = '../data/videojuegos.json';
        break;

      default: 
       return throwError(() => new Error('Categoría inválida'));
    }

    return this.http.get<string[]>(ruta).pipe(
      map(palabras => {
        const index = Math.floor(Math.random() * palabras.length);
        return palabras[index];
      })
    );
  }
}