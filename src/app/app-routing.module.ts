import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'farm', pathMatch: 'full' },
  {
    path: 'farm',
    loadChildren: () =>
      import('./modules/farm/farm.module').then((m) => m.FarmModule),
  },
  { path: 'animal', loadChildren: () => import('./modules/animal/animal.module').then(m => m.AnimalModule) },
  { path: '**', redirectTo: 'farm' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
