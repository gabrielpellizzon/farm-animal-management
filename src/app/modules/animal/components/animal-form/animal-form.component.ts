import { Component, Inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalResponse } from '../../interfaces/animal';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.scss',
})
export class AnimalFormComponent {
  animalFormGroup;
  farmIdErrorMessage = signal('');
  nameErrorMessage = signal('');
  tagErrorMessage = signal('');

  constructor(
    private dialogRef: MatDialogRef<AnimalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnimalResponse
  ) {
    this.animalFormGroup = new FormGroup({
      farmId: new FormControl<number>(
        { value: 0, disabled: false },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl<string>(
        { value: '', disabled: false },
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(5)],
        }
      ),
      tag: new FormControl<string>(
        { value: '', disabled: false },
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(3)],
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
    if (this.animalFormGroup.valid) {
      this.dialogRef.close(this.animalFormGroup.getRawValue());
    }
  }

  updateFarmIdErrorMessage() {
    if (this.animalFormGroup.controls.farmId.hasError('required')) {
      this.farmIdErrorMessage.set('Farm ID is required.');
    } else {
      this.farmIdErrorMessage.set('');
    }
  }

  updateNameErrorMessage() {
    if (this.animalFormGroup.controls.name.hasError('required')) {
      this.nameErrorMessage.set('Name is required.');
    } else if (this.animalFormGroup.controls.name.hasError('minlength')) {
      this.nameErrorMessage.set('Name must be at least 5 characters long.');
    } else {
      this.nameErrorMessage.set('');
    }
  }

  updateTagErrorMessage() {
    if (this.animalFormGroup.controls.tag.hasError('required')) {
      this.farmIdErrorMessage.set('Tag is required.');
    } else if (this.animalFormGroup.controls.tag.hasError('minlength')) {
      this.tagErrorMessage.set('Tag must be at least 3 characters long.');
    } else {
      this.tagErrorMessage.set('');
    }
  }

  private populateForm(data: AnimalResponse) {
    this.animalFormGroup.controls.farmId.setValue(data.farmId);
    this.animalFormGroup.controls.name.setValue(data.name);
    this.animalFormGroup.controls.tag.setValue(data.tag);
  }
}
