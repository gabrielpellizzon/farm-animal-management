import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FarmResponse } from '../../interfaces/farm.interface';

@Component({
  selector: 'app-farm-animal-list',
  templateUrl: './farm-animal-list.component.html',
  styleUrl: './farm-animal-list.component.scss',
})
export class FarmAnimalListComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: FarmResponse,
    private dialogRef: MatDialogRef<FarmAnimalListComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
