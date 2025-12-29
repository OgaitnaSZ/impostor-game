import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-setup',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './setup.html',
  styleUrl: './setup.css',
})
export class Setup {
}
