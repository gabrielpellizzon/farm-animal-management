import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalListComponent } from './animal-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimalService } from '../../services/animal.service';
import { of } from 'rxjs';
import { AnimalResponse } from '../../interfaces/animal';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { AnimalFormComponent } from '../animal-form/animal-form.component';
import { AnimalDetailsComponent } from '../animal-details/animal-details.component';
import { CsvExporterService } from '../../../../shared/csv-exporter/csv-exporter.service';
import { SharedModule } from '../../../../shared/shared.module';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let animalServiceMock: jasmine.SpyObj<AnimalService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let csvExporterServiceMock: jasmine.SpyObj<CsvExporterService>;

  beforeEach(() => {
    animalServiceMock = jasmine.createSpyObj('AnimalService', [
      'getAll',
      'delete',
      'create',
      'update',
      'getById',
    ]);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    csvExporterServiceMock = jasmine.createSpyObj('CsvExporterService', [
      'exportToCsv',
    ]);

    TestBed.configureTestingModule({
      declarations: [AnimalListComponent],
      providers: [
        { provide: AnimalService, useValue: animalServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: CsvExporterService, useValue: csvExporterServiceMock },
      ],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of animals on init', () => {
    const mockAnimals: AnimalResponse[] = [
      { id: 1, name: 'Animal 1', tag: 'TAG-1', farmId: 1 },
      { id: 2, name: 'Animal 2', tag: 'TAG-2', farmId: 1 },
    ];

    animalServiceMock.getAll.and.returnValue(of(mockAnimals));

    component.ngOnInit();

    expect(animalServiceMock.getAll).toHaveBeenCalled();
    expect(component.animalDataSource.data).toEqual(mockAnimals);
    expect(component.filteredAnimals).toEqual(mockAnimals);
  });

  it('should open confirmation dialog and delete animal', () => {
    const mockAnimal: AnimalResponse = {
      id: 1,
      name: 'Animal 1',
      tag: 'TAG-1',
      farmId: 1,
    };

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));

    dialogMock.open.and.returnValue(dialogRefMock);

    component.openConfirmationDialog(mockAnimal);

    expect(dialogMock.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      width: '60%',
      disableClose: false,
      data: { title: 'Animal 1' },
    });
    expect(animalServiceMock.delete).toHaveBeenCalledWith(mockAnimal.id);
  });

  it('should search and filter animals', () => {
    const mockAnimals: AnimalResponse[] = [
      { id: 1, name: 'Animal 1', tag: 'TAG-1', farmId: 1 },
      { id: 2, name: 'Animal 2', tag: 'TAG-2', farmId: 1 },
    ];

    component.filteredAnimals = mockAnimals;
    component.onSearchChange('Animal 1');
    component.filterAnimals();

    expect(component.animalDataSource.data.length).toBe(1);
    expect(component.animalDataSource.data[0].name).toBe('Animal 1');
  });

  it('should open animal form dialog for creating an animal', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(null));

    dialogMock.open.and.returnValue(dialogRefMock);

    component.openCreateAnimalDialog();

    expect(dialogMock.open).toHaveBeenCalledWith(AnimalFormComponent, {
      width: '70%',
      maxWidth: '100vh',
      disableClose: false,
      data: {},
    });
  });

  it('should open animal form dialog for editing an animal', () => {
    const mockAnimal: AnimalResponse = {
      id: 1,
      name: 'Animal 1',
      tag: 'TAG-1',
      farmId: 1,
    };

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(mockAnimal));

    dialogMock.open.and.returnValue(dialogRefMock);

    component.openCreateAnimalDialog(mockAnimal);

    expect(dialogMock.open).toHaveBeenCalledWith(AnimalFormComponent, {
      width: '70%',
      maxWidth: '100vh',
      disableClose: false,
      data: mockAnimal,
    });
  });

  it('should open animal details dialog', () => {
    const mockAnimal: AnimalResponse = {
      id: 1,
      name: 'Animal 1',
      tag: 'TAG-1',
      farmId: 1,
    };

    animalServiceMock.getById.and.returnValue(of(mockAnimal));

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
      'close',
    ]);
    dialogMock.open.and.returnValue(dialogRefMock);

    component.openAnimalDetails(mockAnimal);

    expect(animalServiceMock.getById).toHaveBeenCalledWith(mockAnimal.id);

    expect(dialogMock.open).toHaveBeenCalledWith(AnimalDetailsComponent, {
      width: '80%',
      maxWidth: '100vh',
      disableClose: false,
      data: mockAnimal,
    });
  });
});
