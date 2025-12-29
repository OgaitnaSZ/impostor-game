import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  http = inject(HttpClient);
  // Signals privados para escritura
  private categoriaSignal = signal<string>(this.cargarCategoriaInicial());
  private jugadoresSignal = signal<Player[]>(this.cargarJugadoresInicial());
  private impostoresSignal = signal<number | null>(this.cargarImpostoresInicial());

  // Signals públicos de solo lectura
  categoria = this.categoriaSignal.asReadonly();
  jugadores = this.jugadoresSignal.asReadonly();
  impostores = this.impostoresSignal.asReadonly();

  // Signal computado para cantidad de jugadores
  cantidadJugadores = computed(() => this.jugadoresSignal().length);

  // Métodos de carga inicial (privados)
  private cargarCategoriaInicial(): string {
    const data = localStorage.getItem('category');
    return data ? JSON.parse(data) : '';
  }

  private cargarJugadoresInicial(): Player[] {
    const data = localStorage.getItem('players');
    return data ? JSON.parse(data) : [];
  }

  private cargarImpostoresInicial(): number | null {
    const data = localStorage.getItem('impostores');
    return data !== null ? Number(data) : null;
  }

  // Métodos de guardado
  guardarCategoria(categoria: string) {
    localStorage.setItem('category', JSON.stringify(categoria));
    this.categoriaSignal.set(categoria);
  }

  guardarJugadores(jugadores: Player[]) {
    localStorage.setItem('players', JSON.stringify(jugadores));
    this.jugadoresSignal.set(jugadores);
  }

  guardarImpostores(impostores: number) {
    localStorage.setItem('impostores', impostores.toString());
    this.impostoresSignal.set(impostores);
  }

  // Helpers
  agregarJugador(player: Player) {
    const current = this.jugadoresSignal();
    const updated = [...current, player];
    localStorage.setItem('players', JSON.stringify(updated));
    this.jugadoresSignal.set(updated);
  }

  eliminarJugador(index: number) {
    const current = this.jugadoresSignal();
    const updated = current.filter((_, i) => i !== index);
    localStorage.setItem('players', JSON.stringify(updated));
    this.jugadoresSignal.set(updated);
  }

  aumentarImpostores() {
    const current = this.impostoresSignal() ?? 1;
    if (current < 4) {
      const nuevo = current + 1;
      localStorage.setItem('impostores', nuevo.toString());
      this.impostoresSignal.set(nuevo);
    }
  }

  disminuirImpostores() {
    const current = this.impostoresSignal() ?? 1;
    if (current > 1) {
      const nuevo = current - 1;
      localStorage.setItem('impostores', nuevo.toString());
      this.impostoresSignal.set(nuevo);
    }
  }

  // Game
  cargarPalabra(): Observable<string> {
    const categoria = this.categoria();
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