import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmViewComponent } from './pages/farm-view/farm-view.component';

const routes: Routes = [{ path: '', component: FarmViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmRoutingModule {}
