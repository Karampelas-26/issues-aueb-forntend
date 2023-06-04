import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable  } from '@angular/material/table';
import { UsersTableDataSource } from './users-table-datasource';
import { CommitteeService } from 'src/app/services/committee.service';
import { User } from 'src/app/interface/User';
import { DatePipe } from '@angular/common';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { VerifyDeleteModalComponent } from '../verify-delete-modal/verify-delete-modal.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: UsersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'email', 'firstname', 'lastname', 'phone', 'address', 'gender', 'createdDate', 'role', 'action'];

  constructor(private committeeService: CommitteeService, private datePipe: DatePipe, private dialog: MatDialog) {
    this.dataSource = new UsersTableDataSource(committeeService);
  }

  ngOnInit(): void {
    this.dataSource.initData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEdit(user: User) {
    let dialogRef = this.dialog.open(EditUserModalComponent, {
      data: {...user}
    });

    dialogRef.afterClosed().subscribe({
      next:(result) => {
        if (result && result.saveData) {
          const editedUser = result.data;
          this.committeeService.updateUser(editedUser).subscribe({
            next: (res) => {
              console.log(res);
              const updatedData = this.dataSource.data.value.map(item =>
                item.id === editedUser.id ? editedUser : item
              );
      
              this.dataSource.data.next(updatedData);
            }, 
            error: (err) => console.error(err)
          })
          console.log('Data saved:', editedUser);
        } else {
          console.log('Dialog closed without saving changes.');
        }

      }
    })
  }

  onDelete(userId: string){
    let dialogRef = this.dialog.open(VerifyDeleteModalComponent);

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(result) {
          this.committeeService.deleteUser(userId).subscribe({
            next: res => {
              
              //here i want to remove the user: User from dataSource.data.value[]
      
              const updatedData = this.dataSource.data.value.filter(item => item.id !== userId);
              this.dataSource.data.next(updatedData);
              console.log(res)
            },
            error: err => console.error(err)
          })
        }
      }, 
      error: (err) => console.error(err)
    })
  }
}
