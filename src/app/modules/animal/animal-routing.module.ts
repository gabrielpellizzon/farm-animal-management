import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalViewComponent } from './pages/animal-view/animal-view.component';

const routes: Routes = [{ path: '', component: AnimalViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalRoutingModule {}
