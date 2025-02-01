import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FarmResponse } from '../../interfaces/farm.interface';
import { FarmService } from '../../services/farm.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrl: './farm-list.component.scss',
})
export class FarmListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  farmDataSource = new MatTableDataSource<FarmResponse>();
  displayedColumns = ['name', 'animals', 'actions'];
  filteredFarms: FarmResponse[] = [];

  constructor(private farmService: FarmService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getFarmList();
    this.setPaginator();
  }

  setPaginator() {
    this.farmDataSource.paginator = this.paginator;
  }

  getFarmName(row: FarmResponse) {
    return row.name;
  }

  getAnimalsCount(row: FarmResponse) {
    return row.animals?.length;
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
