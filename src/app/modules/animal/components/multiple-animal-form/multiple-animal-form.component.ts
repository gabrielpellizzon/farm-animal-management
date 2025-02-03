import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-multiple-animal-form',
  templateUrl: './multiple-animal-form.component.html',
  styleUrl: './multiple-animal-form.component.scss',
})
export class MultipleAnimalFormComponent {
  animalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MultipleAnimalFormComponent>
  ) {
    this.animalForm = this.fb.group({
      animals: this.fb.array([]),
    });

    this.addAnimal();
  }

  get animals(): FormArray {
    return this.animalForm.get('animals') as FormArray;
  }

  createAnimal(): FormGroup {
    return this.fb.group({
      farmId: new FormControl<number>(
        { value: 0, disabled: false },
        { nonNullable: true, validators: [Validators.required] }
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
  }

  addAnimal(): void {
    this.animals.push(this.createAnimal());
  }

  removeAnimal(index: number): void {
    this.animals.removeAt(index);
  }

  onAdd(): void {
    this.dialogRef.close(this.animalForm.get('animals')!.value);
  }
}
