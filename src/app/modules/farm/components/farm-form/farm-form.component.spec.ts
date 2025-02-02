import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmFormComponent } from './farm-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FarmResponse } from '../../interfaces/farm.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';

describe('FarmFormComponent', () => {
  let component: FarmFormComponent;
  let fixture: ComponentFixture<FarmFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FarmFormComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [FarmFormComponent],
      imports: [NoopAnimationsModule, SharedModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 1, name: 'Farm 1', animals: [] },
        },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form when data is provided', () => {
    const data: FarmResponse = { id: 1, name: 'Farm 1', animals: [] };
    component.data = data;
    expect(component.farmFormGroup.controls['name'].value).toBe('Farm 1');
  });

  it('should close the dialog with valid form data on Add', () => {
    component.farmFormGroup.controls['name'].setValue('New Farm');
    component.onAdd();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('New Farm');
  });

  it('should close the dialog on Cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should set error message when name is required and form is invalid', () => {
    component.farmFormGroup.controls['name'].setValue('');
    component.updateErrorMessage();
    expect(component.errorMessage()).toBe('Name is required.');
  });

  it('should set error message when name is too short', () => {
    component.farmFormGroup.controls['name'].setValue('Foo');
    component.updateErrorMessage();
    expect(component.errorMessage()).toBe(
      'Name must be at least 5 characters long.'
    );
  });

  it('should not show error message if name is valid', () => {
    component.farmFormGroup.controls['name'].setValue('Valid Farm Name');
    component.updateErrorMessage();
    expect(component.errorMessage()).toBe('');
  });
});
