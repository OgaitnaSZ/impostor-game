import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Game {
  private intervaloTiempo: any = null;
  private tiempoActual = 0;

  desordenarJugadores(jugadores: Player[]): Player[] {
    const copia = [...jugadores];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  asignarRoles(jugadores: Player[], cantidadImpostores: number): Player[] {
    // Reiniciar todos a civil
    const jugadoresConRoles = jugadores.map(j => ({ ...j, rol: 'civil' as 'civil' | 'impostor' }));
    
    let asignados = 0;
    while (asignados < cantidadImpostores) {
      const index = Math.floor(Math.random() * jugadoresConRoles.length);
      if (jugadoresConRoles[index].rol === 'civil') {
        jugadoresConRoles[index].rol = 'impostor';
        asignados++;
      }
    }
    
    return jugadoresConRoles;
  }

  iniciarTemporizador(callback: (tiempo: number) => void): void {
    this.tiempoActual = 0;
    this.intervaloTiempo = setInterval(() => {
      this.tiempoActual++;
      callback(this.tiempoActual);
    }, 1000);
  }

  detenerTemporizador(): number {
    if (this.intervaloTiempo) {
      clearInterval(this.intervaloTiempo);
      this.intervaloTiempo = null;
    }
    return this.tiempoActual;
  }

  formatearTiempo(segundos: number): string {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
