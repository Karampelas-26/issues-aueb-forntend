import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { Application } from 'src/app/interface/Application';
import { TechnicianService } from 'src/app/services/technician.service';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditUserModalComponent} from "../../admin/users-comp/edit-user-modal/edit-user-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {EditApplicationComponent} from "../edit-application/edit-application.component";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Application>;
  dataSource: DataTableDataSource;

  priority: { [key: string]: string } = {
    LOW: 'expand_more',
    MEDIUM: 'drag_handle',
    HIGH: 'expand_less'
  };

  statusColors: { [key: string]: string } = {
    CREATED: 'rgba(4, 102, 200, 0.7)', //blue
    REJECTED: 'rgba(208, 0, 0, 0.7)', //red
    VALIDATED: 'rgba(114, 9, 183, 0.7)', //purple
    ASSIGNED: 'rgba(251, 133, 0, 0.7)', //oragne
    COMPLETED: 'rgba(22, 219, 101, 0.7)', //green
    ARCHIVED: 'rgba(191, 192, 192, 0.7)' //gray
  };

  displayedColumns = ['title', 'siteName', 'buildingName', 'status', 'priority',  'issueType', 'createDate','dueDate', 'actions'];

  constructor(private techService: TechnicianService, private datePipe: DatePipe, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.dataSource = new DataTableDataSource(this.techService);

  }
  ngOnInit(): void {
    this.dataSource.initData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  refreshData(applications: Application[]){
    this.dataSource.refreshData(applications);
  }

  onComplete(id: string) {
    this.techService.completeApplication(id).subscribe({
      next: (res: any) => {
        this.dataSource.initData();
        this.snackBar.open('Application with id: '+ id + " " + res.message, "Close", {
          duration: 3000
        });
        console.log(res.message)
      },
      error: err => {
        this.snackBar.open('Error: ' , "Close", {
          duration: 3000
        });
        console.error(err)
      }
    })
  }

  onEdit(row: Application) {
    let dialogRef = this.dialog.open(EditApplicationComponent, {
      data: {...row}
    });

    dialogRef.afterClosed().subscribe({
      next: value => {
        if(value){
          this.dataSource.initData();
        }
      }
    })
  }
}
