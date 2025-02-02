import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimalResponse } from '../../interfaces/animal';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.scss',
})
export class AnimalDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AnimalResponse,
    private dialogRef: MatDialogRef<AnimalDetailsComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
