import { Routes } from '@angular/router';
import { Players } from './pages/setup/players/players';
import { Categories } from './pages/setup/categories/categories';
import { Game } from './pages/game/game';
import { Setup } from './pages/setup/setup';
import { Menu } from './pages/menu/menu';
import { Empezar } from './pages/setup/empezar/empezar';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'setup', component: Setup, 
    children: [
      { path: 'categories', component: Categories },
      { path: 'players', component: Players},
      { path: 'game', component: Empezar},
      { path: '**', component: Categories},
    ]
  },
  { path: 'game', component: Game },
  { path: '**', component: Menu },
];
