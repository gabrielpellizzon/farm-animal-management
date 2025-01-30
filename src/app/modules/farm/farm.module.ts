import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmRoutingModule } from './farm-routing.module';
import { FarmListComponent } from './components/farm-list/farm-list.component';
import { FarmFormComponent } from './components/farm-form/farm-form.component';
import { FarmViewComponent } from './pages/farm-view/farm-view.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateModule } from '../../template/template.module';

@NgModule({
  declarations: [FarmListComponent, FarmFormComponent, FarmViewComponent],
  imports: [CommonModule, FarmRoutingModule, SharedModule, TemplateModule],
})
export class FarmModule {}
