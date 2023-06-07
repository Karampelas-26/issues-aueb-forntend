import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { IssuseDataTable } from '../../technician/data-table/data-table-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EquipmentDataTableSource } from './equipment-data-tableSource';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-equipment-data-table',
  templateUrl: './equipment-data-table.component.html',
  styleUrls: ['./equipment-data-table.component.css']
})
export class EquipmentDataTableComponent implements OnInit ,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IssuseDataTable>;
  
  dataSource:EquipmentDataTableSource;
  data:any[]=[];
  displayedColumns =['id', 'site', 'building', 'equipment', 'installationDate']
  constructor(private committee:CommitteeService){
    this.dataSource = new EquipmentDataTableSource(this.data);
  }
  ngOnInit(){
    this.committee.getEquipment.subscribe({
      next:(res:any) =>{
        for(const key in res){
          this.data.push(res[key]);
          
        }
        console.log(this.data);
      },
      error: (err: { error: { message: any; }; }) =>{
        console.error(err.error.message);
      }
    })
  }
  ngAfterViewInit(): void {
      
  }
}
