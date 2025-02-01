import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FarmRequest, FarmResponse } from '../../interfaces/farm.interface';
import { FarmService } from '../../services/farm.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { FarmFormComponent } from '../farm-form/farm-form.component';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrl: './farm-list.component.scss',
})
export class FarmListComponent implements OnInit {
  paginator!: MatPaginator;
  farmDataSource = new MatTableDataSource<FarmResponse>();
  displayedColumns = ['name', 'animals', 'actions'];
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
      maxWidth: '100rem',
      disableClose: false,
      data: farmData || {},
    });

    dialogRef.afterClosed().subscribe((data: string) => {
      if (data) {
        console.log(data);
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

  private getFarmList() {
    this.farmService.getAll().subscribe({
      next: (farmList) => {
        this.farmDataSource.data = farmList;
        this.filteredFarms = farmList;
      },
      error: () => alert('Load error'),
    });
  }
}
