import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FarmResponse } from '../../interfaces/farm.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrl: './farm-form.component.scss',
})
export class FarmFormComponent {
  farmFormGroup;
  errorMessage = signal('');

  constructor(
    private dialogRef: MatDialogRef<FarmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FarmResponse
  ) {
    this.farmFormGroup = new FormGroup({
      name: new FormControl<string>(
        { value: '', disabled: false },
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(5)],
        }
      ),
    });

    if (!!Object.keys(this.data)?.length) {
      this.populateForm(this.data);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAdd() {
    if (this.farmFormGroup.valid) {
      this.dialogRef.close(this.farmFormGroup.controls.name.getRawValue());
    }
  }

  updateErrorMessage() {
    if (this.farmFormGroup.controls.name.hasError('required')) {
      this.errorMessage.set('Name is required.');
    } else if (this.farmFormGroup.controls.name.hasError('minlength')) {
      this.errorMessage.set('Name must be at least 5 characters long.');
    } else {
      this.errorMessage.set('');
    }
  }

  private populateForm(data: FarmResponse) {
    this.farmFormGroup.controls.name.setValue(data.name);
  }
}
