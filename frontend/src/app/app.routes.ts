import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MissionListComponent } from './features/missions/mission-list/mission-list.component';
import { VehiculeListComponent } from './features/vehicules/vehicule-list/vehicule-list.component';
import { RendezvousListComponent } from './features/rendezvous/rendezvous-list/rendezvous-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'vehicles', component: VehiculeListComponent },
  { path: 'appointments', component: RendezvousListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
