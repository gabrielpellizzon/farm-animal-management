import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalFormComponent } from './animal-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalResponse } from '../../interfaces/animal';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AnimalFormComponent', () => {
  let component: AnimalFormComponent;
  let fixture: ComponentFixture<AnimalFormComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AnimalFormComponent>>;

  const mockAnimal: AnimalResponse = {
    id: 1,
    name: 'Animal 1',
    tag: 'TAG-1',
    farmId: 1,
  };

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [AnimalFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockAnimal },
      ],
    });

    fixture = TestBed.createComponent(AnimalFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component and initialize the form with data', () => {
    expect(component).toBeTruthy();

    expect(component.animalFormGroup.controls['farmId'].value).toBe(
      mockAnimal.farmId
    );
    expect(component.animalFormGroup.controls['name'].value).toBe(
      mockAnimal.name
    );
    expect(component.animalFormGroup.controls['tag'].value).toBe(
      mockAnimal.tag
    );
  });

  it('should update error message when name has error', () => {
    component.animalFormGroup.controls.name.setValue('A');
    component.updateNameErrorMessage();
    expect(component.nameErrorMessage()).toBe(
      'Name must be at least 5 characters long.'
    );
  });

  it('should update error message when tag has error', () => {
    component.animalFormGroup.controls.tag.setValue('T');
    component.updateTagErrorMessage();
    expect(component.tagErrorMessage()).toBe(
      'Tag must be at least 3 characters long.'
    );
  });
});
