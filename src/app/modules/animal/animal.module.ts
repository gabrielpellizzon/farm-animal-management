import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalViewComponent } from './pages/animal-view/animal-view.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateModule } from '../../template/template.module';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

@NgModule({
  declarations: [AnimalViewComponent, AnimalFormComponent, AnimalListComponent, AnimalDetailsComponent],
  imports: [CommonModule, AnimalRoutingModule, SharedModule, TemplateModule],
})
export class AnimalModule {}
