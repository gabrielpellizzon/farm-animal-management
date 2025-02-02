import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { FarmListComponent } from './farm-list.component';
import { FarmService } from '../../services/farm.service';
import { FarmResponse } from '../../interfaces/farm.interface';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SharedModule } from '../../../../shared/shared.module';

pdfMake.vfs = pdfFonts.vfs;

describe('FarmListComponent', () => {
  let component: FarmListComponent;
  let fixture: ComponentFixture<FarmListComponent>;
  let farmServiceMock: jasmine.SpyObj<FarmService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    farmServiceMock = jasmine.createSpyObj('FarmService', [
      'getAll',
      'delete',
      'create',
      'update',
    ]);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [FarmListComponent],
      providers: [
        { provide: FarmService, useValue: farmServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation dialog and delete farm', () => {
    const mockFarm: FarmResponse = { id: 1, name: 'Farm 1', animals: [] };
    dialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    farmServiceMock.delete.and.returnValue(of(undefined));

    component.openConfirmationDialog(mockFarm);
    expect(dialogMock.open).toHaveBeenCalled();
    expect(farmServiceMock.delete).toHaveBeenCalledWith(mockFarm.id);
  });

  it('should open create farm dialog and create farm', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of('New Farm'),
    } as any);
    farmServiceMock.create.and.returnValue(of({ id: 2, name: 'New Farm' }));

    component.openCreateFarmDialog();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(farmServiceMock.create).toHaveBeenCalled();
  });

  it('should filter farms correctly', () => {
    component.filteredFarms = [
      { id: 1, name: 'Farm X', animals: [] },
      { id: 2, name: 'Farm B', animals: [] },
    ];

    component.onSearchChange('X');
    expect(component.farmDataSource.data.length).toBe(1);
    expect(component.farmDataSource.data[0].name).toBe('Farm X');
  });

  it('should export farms to PDF', () => {
    spyOn(window, 'alert');
    spyOn(pdfMake, 'createPdf').and.returnValue({
      download: jasmine.createSpy('download'),
    } as any);

    component.farmDataSource = new MatTableDataSource<FarmResponse>([
      {
        id: 1,
        name: 'Farm 1',
        animals: [{ id: 1, farmId: 1, name: 'Animal 1', tag: 'TAG-1' }],
      },
    ]);
    component.exportFarmsToPDF();

    expect(pdfMake.createPdf).toHaveBeenCalled();
  });
});
