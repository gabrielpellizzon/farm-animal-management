import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-general-template',
  templateUrl: './general-template.component.html',
  styleUrl: './general-template.component.scss',
})
export class GeneralTemplateComponent {
  @Input() title: string = '';
  @Input() isWhiteBackground: boolean = true;
  @Input() backButtonVisible: boolean = false;

  constructor(private location: Location) {}

  onBack(): void {
    this.location.back();
  }
}
