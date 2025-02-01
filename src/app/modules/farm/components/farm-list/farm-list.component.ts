import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FarmResponse } from '../../interfaces/farm.interface';
import { FarmService } from '../../services/farm.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

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
      width: '400px',
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
      error: () => alert('Deleting error'),
      complete: () => this.getFarmList(),
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

  private getFarmList() {
    this.farmService.getAll().subscribe({
      next: (farmList) => {
        this.farmDataSource.data = farmList;
        this.filteredFarms = farmList;
      },
      error: () => alert('Loading error'),
    });
  }
}
