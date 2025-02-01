import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { GeneralTemplateComponent } from './general-template/general-template.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FooterComponent, GeneralTemplateComponent, HeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [FooterComponent, GeneralTemplateComponent, HeaderComponent],
})
export class TemplateModule {}
