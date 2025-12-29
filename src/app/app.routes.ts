import { Routes } from '@angular/router';
import { Players } from './pages/setup/players/players';
import { Categories } from './pages/setup/categories/categories';
import { Game } from './pages/game/game';
import { Setup } from './pages/setup/setup';
import { Menu } from './pages/menu/menu';
import { Impostors } from './pages/setup/impostors/impostors';
import { ComoJugar } from './pages/como-jugar/como-jugar';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'setup', component: Setup, 
    children: [
      { path: 'players', component: Players},
      { path: 'categories', component: Categories },
      { path: 'impostors', component: Impostors},
      { path: '**', component: Players},
    ]
  },
  { path: 'game', component: Game },
  { path: 'como-jugar', component: ComoJugar },
  { path: '**', component: Menu },
];
