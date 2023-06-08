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
  constructor(private committeeService: CommitteeService){
    this.dataSource = new EquipmentDataTableSource(this.committeeService);

  }

  ngOnInit():void{
    this.dataSource.initData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
