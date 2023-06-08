import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { IssuseDataTable } from '../../technician/data-table/data-table-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EquipmentDataTableSource } from './equipment-data-tableSource';
import { CommitteeService } from 'src/app/services/committee.service';
import { Observable } from 'rxjs';


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
  data:any[]=
  [  
    {typeOfEquipment: 'Προτζεκτορας', buildingName: null, siteName: null},
    {typeOfEquipment: 'Πίνακας', buildingName: null, siteName: null},
    {typeOfEquipment: 'Ethernet', buildingName: null, siteName: null},
    {typeOfEquipment: 'Wifi', buildingName: null, siteName: null} ,
    {typeOfEquipment: 'HDMI', buildingName: null, siteName: null},
    {typeOfEquipment: 'Πόρτα', buildingName: null, siteName: null},
    {typeOfEquipment: 'Κλιματιστικό', buildingName: null, siteName: null},
    {typeOfEquipment: 'Παράθυρα', buildingName: null, siteName: null}

  ];
  displayedColumns =['typeOfEquipment','buildingName','siteName']
  constructor(private committee: CommitteeService){
    console.log(this.data);
    this.dataSource = new EquipmentDataTableSource(this.data);
    
  }


  ngOnInit():void{
    this.fetchData();
  }

  fetchData():void{
    const observable = this.committee.getEquipment();
    observable.subscribe({
      next:(res:any) =>{
        
        for(const key in res){
          
          this.data.push(res[key]);
          
            
        }
        
        console.log(this.data);
      },
      error: (err) =>{
        console.error(err.error.message);
      }
    
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
}
