import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalDetailsComponent } from './animal-details.component';
import { AnimalResponse } from '../../interfaces/animal';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';

describe('AnimalDetailsComponent', () => {
  let component: AnimalDetailsComponent;
  let fixture: ComponentFixture<AnimalDetailsComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AnimalDetailsComponent>>;
  let mockAnimalData: AnimalResponse;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockAnimalData = {
      id: 1,
      name: 'Animal 1',
      tag: 'TAG-1',
      farmId: 1,
    };

    TestBed.configureTestingModule({
      declarations: [AnimalDetailsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockAnimalData },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the animal data passed via MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(mockAnimalData);
  });

  it('should call dialogRef.close when onClose() is called', () => {
    component.onClose();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
