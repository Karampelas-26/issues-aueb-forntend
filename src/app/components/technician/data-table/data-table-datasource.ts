import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Application } from 'src/app/interface/Application';
import { TechnicianService } from 'src/app/services/technician.service';

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Application> {
  data: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private technicianService: TechnicianService) {
    super();
  }

  connect(): Observable<Application[]> {
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

  private getPagedData(data: Application[]): Application[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Application[]): Application[] {
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
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'siteName':
          return compare(a.siteName, b.siteName, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'buildingName':
          return compare(a.buildingName, b.buildingName, isAsc);
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'issueType':
          return compare(a.issueType, b.issueType, isAsc);
        case 'createDate':
          return compare(a.createDate, b.createDate, isAsc);
        case 'dueDate':
          return compare(a.dueDate, b.dueDate, isAsc);
        default:
          return 0;
      }
    });
  
    return sortedData;
  }
  
  refreshData(applications: Application[]) {
    this.data.next(applications);
  }

  initData(): void {
    this.technicianService.getApplications().subscribe({
      next: (applications: Application[]) => {
        this.data.next(applications);
      },
      error: (err) => {
        console.error(err);
      }
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

