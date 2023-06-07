import { DataSource } from '@angular/cdk/collections';
import { EquipmentDataTableComponent } from './equipment-data-table.component';
import { CreateSites } from 'src/app/interface/Create-sites';
import { MatTableDataSource } from '@angular/material/table';
export interface equipmentDataTable{
    id: number,
    name:string,
    site:CreateSites
}

export class EquipmentDataTableSource extends MatTableDataSource<equipmentDataTable>{
    constructor(data: equipmentDataTable[]){
        super(data);
    }
}