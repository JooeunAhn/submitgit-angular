import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Pages} from "./pages/pages.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', redirectTo: "register"}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
