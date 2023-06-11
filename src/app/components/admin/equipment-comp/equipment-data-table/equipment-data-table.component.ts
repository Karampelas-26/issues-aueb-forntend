import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EquipmentDataTableSource } from './equipment-data-tableSource';
import { CommitteeService } from 'src/app/services/committee.service';
import { Observable } from 'rxjs';
import {DataTableDataSource} from "../../../technician/data-table/data-table-datasource";
import {Application} from "../../../../interface/Application";
import {IssuesTableDataSource} from "../../issues-comp/issues-table/issues-table-datasource";
import {Equipment} from "../../../../interface/Equipment";
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AddEquipmentToSiteModalComponent } from '../add-equipment-to-site-modal/add-equipment-to-site-modal.component';


@Component({
  selector: 'app-equipment-data-table',
  templateUrl: './equipment-data-table.component.html',
  styleUrls: ['./equipment-data-table.component.css']
})
export class EquipmentDataTableComponent implements OnInit ,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Equipment>;
  dataSource: EquipmentDataTableSource;

  displayedColumns =['typeOfEquipment','actions']
  constructor(private committeeService: CommitteeService,private dialog:MatDialog){
    this.dataSource = new EquipmentDataTableSource(this.committeeService);

  }

  ngOnInit():void{
    this.setData();
  }

  setData(){
    this.dataSource.initData();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onUpdate(equipment: any){
    let dialogRef = this.dialog.open(AddEquipmentToSiteModalComponent, {data: equipment, width: '300px'});
  }
  onDelete(equipmentId:number){
    let dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(result) {
          this.committeeService.deleteEquipment(equipmentId).subscribe({
            next: res => {

              //here i want to remove the user: User from dataSource.data.value[]

              const updatedData = this.dataSource.data.value.filter(item => item.id !== equipmentId);
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
