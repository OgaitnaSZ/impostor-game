import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundParticles } from './utils/background-particles/background-particles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundParticles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
