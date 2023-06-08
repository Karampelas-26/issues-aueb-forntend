import { DataSource } from '@angular/cdk/collections';
import { EquipmentDataTableComponent } from './equipment-data-table.component';
import { CreateSites } from 'src/app/interface/Create-sites';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface equipmentDataTable{
    id: number,
    name:string,
    site:CreateSites
}

export class EquipmentDataTableSource extends MatTableDataSource<equipmentDataTable>{
    // paginator: MatPaginator | undefined;
    // sort: MatSort | undefined;
    
    constructor(data: equipmentDataTable[]){
        super(data);
    }
    
    private getPagedData(data: equipmentDataTable[]): equipmentDataTable[]  {
        if (this.paginator) {
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          return data.splice(startIndex, this.paginator.pageSize);
        } else {
          return data;
        }
      }
    
    // override disconnect(): void {}

    //  connect(): Observable<equipmentDataTable[]> {
    //     if (this.paginator && this.sort) {
    //       // Combine everything that affects the rendered data into one update
    //       // stream for the data-table to consume.
    //       return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
    //         .pipe(map(() => {
    //           return this.getPagedData(this.getSortedData([...this.data ]));
    //         }));
    //     } else {
    //       throw Error('Please set the paginator and sort on the data source before connecting.');
    //     }
    //   }
    
    private getSortedData(data: equipmentDataTable[]): equipmentDataTable[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
          return data;
        }
    
        return data.sort((a, b) => {
          const isAsc = this.sort?.direction === 'asc';
          switch (this.sort?.active) {
            // case 'name': return compare(a.name, b.name, isAsc);
            case 'id': return compare(+a.id, +b.id, isAsc);
            default: return 0;
          }
        });
      }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }