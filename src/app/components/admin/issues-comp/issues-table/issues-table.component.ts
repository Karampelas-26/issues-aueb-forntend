import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Application } from 'src/app/interface/Application';
import { CommitteeService } from 'src/app/services/committee.service';
import { IssuesTableDataSource } from './issues-table-datasource';
import {EditApplicationComponent} from "../../../technician/edit-application/edit-application.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EditApplicationCommitteeComponent} from "../edit-application-committee/edit-application-committee.component";

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.css']
})
export class IssuesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Application>;
  dataSource: IssuesTableDataSource;
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

  displayedColumns = ['title', 'siteName', 'buildingName', 'status', 'priority', 'issueType', 'createDate','dueDate', 'actions'];

  constructor(private committeeService: CommitteeService, private datePipe: DatePipe, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.dataSource = new IssuesTableDataSource(this.committeeService);

  }
  ngOnInit(): void {
    this.dataSource.initdData();
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
    this.committeeService.completeApplication(id).subscribe({
      next: (res: any) => {
        this.dataSource.initdData();
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
    console.log(row)
    let dialogRef = this.dialog.open(EditApplicationCommitteeComponent, {
      data: {...row}
    });

    dialogRef.afterClosed().subscribe({
      next: value => {
        if(value){
          this.dataSource.initdData();
        }
      }
    })
  }
}
