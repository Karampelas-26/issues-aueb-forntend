import { DataSource } from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {CommitteeService} from "../../../../services/committee.service";
import {map} from "rxjs/operators";
import {Equipment} from "../../../../interface/Equipment";

export class EquipmentDataTableSource extends DataSource<Equipment>{
  data: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private committeeService: CommitteeService) {
    super();
  }

  connect(): Observable<Equipment[]> {
    if (this.paginator && this.sort) {
      return merge(this.data, this.paginator.page, this.sort.sortChange)
        .pipe(
          map(() => {
            let sortedData = this.getSortedData([...this.data.value]);
            sortedData = this.getPagedData(sortedData);
            return sortedData;
          })
        );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: Equipment[]): Equipment[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Equipment[]): Equipment[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    const sortState: Sort = { active: this.sort.active, direction: this.sort.direction };
    const sortedData = data.slice();

    // Perform sorting based on the active sort state
    sortedData.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      switch (sortState.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'typeOfEquipment':
          return compare(a.typeOfEquipment, b.typeOfEquipment, isAsc);
        default:
          return 0;
      }
    });

    return sortedData;
  }

  refreshData(applications: Equipment[]) {
    this.data.next(applications);
  }

  initData(): void {
    this.committeeService.getEquipment().subscribe({
      next: (equipments: Equipment[]) => {
        console.table(equipments)
        this.data.next(equipments);
      },
      error: err => console.error(err)
    });
  }
}

function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return (a.localeCompare(b)) * (isAsc ? 1 : -1);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) * (isAsc ? 1 : -1);
  } else if (a instanceof Date && b instanceof Date) {
    return (a.getTime() - b.getTime()) * (isAsc ? 1 : -1);
  } else {
    return 0;
  }
}
