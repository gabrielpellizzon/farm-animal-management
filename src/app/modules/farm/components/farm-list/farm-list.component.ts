import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { FarmRequest, FarmResponse } from '../../interfaces/farm.interface';
import { FarmService } from '../../services/farm.service';
import { FarmFormComponent } from '../farm-form/farm-form.component';
import { FarmAnimalListComponent } from '../farm-animal-list/farm-animal-list.component';
import { AnimalResponse } from '../../../animal/interfaces/animal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrl: './farm-list.component.scss',
})
export class FarmListComponent implements OnInit {
  farmDataSource = new MatTableDataSource<FarmResponse>();
  displayedColumns = ['details', 'name', 'animals', 'actions'];
  searchFarmsInput = '';
  filteredFarms: FarmResponse[] = [];

  constructor(private farmService: FarmService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getFarmList();
  }

  getFarmName(row: FarmResponse) {
    return row.name;
  }

  getAnimalsCount(row: FarmResponse) {
    return row.animals?.length;
  }

  openConfirmationDialog(element: FarmResponse) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%',
      disableClose: false,
      data: { title: element.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFarm(element.id);
      }
    });
  }

  deleteFarm(id: number) {
    this.farmService.delete(id).subscribe({
      error: () => alert('Delete error'),
      complete: () => {
        alert('Delete success');
        this.getFarmList();
      },
    });
  }

  onSearchChange(searchValue: string) {
    this.searchFarmsInput = searchValue;
    this.filterFarms();
  }

  filterFarms() {
    if (this.searchFarmsInput.trim() === '') {
      this.farmDataSource.data = this.filteredFarms;
    } else {
      this.farmDataSource.data = this.filteredFarms.filter((farm) =>
        farm.name.toLowerCase().includes(this.searchFarmsInput.toLowerCase())
      );
    }
  }

  openCreateFarmDialog(farmData?: FarmResponse) {
    const dialogRef = this.dialog.open(FarmFormComponent, {
      width: '70%',
      maxWidth: '100vh',
      disableClose: false,
      data: farmData || {},
    });

    dialogRef.afterClosed().subscribe((data: string) => {
      if (data) {
        if (!farmData) {
          const farmToCreate: FarmRequest = { name: data };

          this.farmService.create(farmToCreate).subscribe({
            error: () => alert('Create error'),
            complete: () => {
              this.getFarmList();
              alert('Create success');
            },
          });
        } else {
          const farmToUpdate: FarmResponse = { ...farmData, name: data };

          this.farmService.update(farmData.id, farmToUpdate).subscribe({
            error: () => alert('Update error'),
            complete: () => {
              this.getFarmList();
              alert('Update success');
            },
          });
        }
      }
    });
  }

  openAnimalList(element: FarmResponse) {
    this.farmService.getById(element.id).subscribe({
      next: (farm) => {
        this.dialog.open(FarmAnimalListComponent, {
          width: '80%',
          maxWidth: '100vh',
          disableClose: false,
          data: farm || {},
        });
      },
      error: () => alert('Load error'),
    });

    // this.dialog.open(FarmAnimalListComponent, {
    //   width: '80%',
    //   maxWidth: '100vh',
    //   disableClose: false,
    //   data: element || {},
    // });
  }

  exportFarmsToPDF() {
    if (!this.farmDataSource.data.length) {
      alert('No farms available to export');
      return;
    }

    const content: any[] = [];

    this.farmDataSource.data.forEach((farm, index) => {
      content.push({ text: farm.name, style: 'title' });

      if (farm.animals && farm.animals.length > 0) {
        content.push({
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto'],
            body: [
              [
                { text: 'ID', style: 'tableHeader' },
                { text: 'Nome', style: 'tableHeader' },
                { text: 'Tag', style: 'tableHeader' },
                { text: 'Number of animals', style: 'tableHeader' },
              ],
              ...farm.animals.map((animal) => [
                animal.id,
                animal.name,
                animal.tag,
                '',
              ]),
              [
                '',
                '',
                { text: 'Total number of animals:', style: 'tableFooter' },
                farm.animals.length,
              ],
            ],
          },
          layout: 'lightHorizontalLines',
        });
      } else {
        content.push({
          text: 'No animals registered.',
          italics: true,
          margin: [0, 5, 0, 10],
        });
      }

      if (index < this.farmDataSource.data.length - 1) {
        content.push({ text: '', pageBreak: 'after' });
      }
    });

    const documentDefinition = {
      content,
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white',
          fillColor: '#4CAF50',
          alignment: 'center',
        },
      },
    };

    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    const formattedDate = `${day}_${month}_${year}_${time}`;

    const pdfDoc = pdfMake.createPdf(documentDefinition as any);
    pdfDoc.download(`farms_report_${formattedDate}.pdf`);
  }

  private getFarmList() {
    this.farmService.getAll().subscribe({
      next: (farmList) => {
        //const mockedAnimals = this.mockAnimalsForFarms(farmList);
        this.farmDataSource.data = farmList;
        this.filteredFarms = farmList;
      },
      error: () => alert('Load error'),
    });
  }

  //FUNCTION CREATED TO MOCK ANIMALS (API IS NOT WORKING WELL)
  // private mockAnimalsForFarms(farms: FarmResponse[]): FarmResponse[] {
  //   const mockAnimals: AnimalResponse[] = [];

  //   const animalNames = ['Angus', 'Hereford', 'Brahman', 'Nelore'];

  //   farms.forEach((farm) => {
  //     const numberOfAnimals = Math.floor(Math.random() * 50) + 1;
  //     const animals: AnimalResponse[] = [];

  //     for (let i = 0; i < numberOfAnimals; i++) {
  //       animals.push({
  //         id: mockAnimals.length + 1,
  //         farmId: farm.id,
  //         name: animalNames[Math.floor(Math.random() * animalNames.length)],
  //         tag: `TAG-${i + 1}`,
  //       });
  //     }

  //     farm.animals = animals;
  //     mockAnimals.push(...animals);
  //   });

  //   return farms;
  // }
}
