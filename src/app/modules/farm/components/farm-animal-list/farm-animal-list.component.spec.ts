import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmAnimalListComponent } from './farm-animal-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FarmResponse } from '../../interfaces/farm.interface';
import { SharedModule } from '../../../../shared/shared.module';

describe('FarmAnimalListComponent', () => {
  let component: FarmAnimalListComponent;
  let fixture: ComponentFixture<FarmAnimalListComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FarmAnimalListComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [FarmAnimalListComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 1, name: 'Farm 1', animals: [] },
        },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data through MAT_DIALOG_DATA', () => {
    const data: FarmResponse = { id: 1, name: 'Farm 1', animals: [] };
    component.data = data;
    fixture.detectChanges();
    expect(component.data).toEqual(data);
  });

  it('should close the dialog when onClose is called', () => {
    component.onClose();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
