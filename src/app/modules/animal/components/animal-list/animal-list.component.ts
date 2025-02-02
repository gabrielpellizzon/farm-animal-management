import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { AnimalResponse, AnimalRequest } from '../../interfaces/animal';
import { AnimalFormComponent } from '../animal-form/animal-form.component';
import { AnimalService } from '../../services/animal.service';
import { AnimalDetailsComponent } from '../animal-details/animal-details.component';
import { XlsExporterService } from '../../../../shared/xls-exporter/xls-exporter.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss',
})
export class AnimalListComponent {
  animalDataSource = new MatTableDataSource<AnimalResponse>();
  displayedColumns = ['details', 'name', 'tag', 'farmId', 'actions'];
  searchAnimalsInput = '';
  filteredAnimals: AnimalResponse[] = [];

  constructor(
    private animalService: AnimalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAnimalList();
  }

  getAnimalName(row: AnimalResponse) {
    return row.name;
  }

  getAnimalTag(row: AnimalResponse) {
    return row.tag;
  }

  getAnimalFarmId(row: AnimalResponse) {
    return row.farmId;
  }

  openConfirmationDialog(element: AnimalResponse) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '60%',
      disableClose: false,
      data: { title: element.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAnimal(element.id);
      }
    });
  }

  deleteAnimal(id: number) {
    this.animalService.delete(id).subscribe({
      error: () => alert('Delete error'),
      complete: () => {
        alert('Delete success');
        this.getAnimalList();
      },
    });
  }

  onSearchChange(searchValue: string) {
    this.searchAnimalsInput = searchValue;
    this.filterAnimals();
  }

  filterAnimals() {
    if (this.searchAnimalsInput.trim() === '') {
      this.animalDataSource.data = this.filteredAnimals;
    } else {
      this.animalDataSource.data = this.filteredAnimals.filter((farm) =>
        farm.name.toLowerCase().includes(this.searchAnimalsInput.toLowerCase())
      );
    }
  }

  openCreateAnimalDialog(animalData?: AnimalResponse) {
    const dialogRef = this.dialog.open(AnimalFormComponent, {
      width: '70%',
      maxWidth: '100vh',
      disableClose: false,
      data: animalData || {},
    });

    dialogRef
      .afterClosed()
      .subscribe((data: AnimalRequest | AnimalResponse) => {
        if (data) {
          if (!animalData) {
            const animalToCreate: AnimalRequest = data;

            this.animalService.create(animalToCreate).subscribe({
              error: () => alert('Create error'),
              complete: () => {
                this.getAnimalList();
                alert('Create success');
              },
            });
          } else {
            const farmToUpdate: AnimalResponse = data as AnimalResponse;

            this.animalService.update(animalData.id, farmToUpdate).subscribe({
              error: () => alert('Update error'),
              complete: () => {
                this.getAnimalList();
                alert('Update success');
              },
            });
          }
        }
      });
  }

  openAnimalDetails(element: AnimalResponse) {
    this.animalService.getById(element.id).subscribe({
      next: (animal) => {
        this.dialog.open(AnimalDetailsComponent, {
          width: '80%',
          maxWidth: '100vh',
          disableClose: false,
          data: animal || {},
        });
      },
      error: () => alert('Load error'),
    });
  }

  exportAsXls() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    const formattedDate = `${day}_${month}_${year}_${time}`;

    XlsExporterService.exportToXls(
      `animals_report_${formattedDate}`,
      this.displayedColumns.filter((h) => !['details', 'actions'].includes(h)),
      this.animalDataSource.data
    );
  }

  private getAnimalList() {
    this.animalService.getAll().subscribe({
      next: (animalList) => {
        this.animalDataSource.data = animalList;
        this.filteredAnimals = animalList;
      },
      error: () => alert('Load error'),
    });
  }
}
