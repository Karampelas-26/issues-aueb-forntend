import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { CommitteeService } from 'src/app/services/committee.service';
import { User } from 'src/app/interface/User';

export class UsersTableDataSource extends DataSource<User> {
  data: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  paginator: MatPaginator | undefined;
  sort!: MatSort;

  constructor(private committeeService: CommitteeService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    if (this.paginator && this.sort) {
    return this.data.pipe(
      map(() => {
        const sortedData = this.getSortedData([...this.data.value]);
        const pagedData = this.getPagedData(sortedData);
        return pagedData;
      })
    );
  } else {
    throw Error('Please set the paginator and sort on the data source before connecting.');
  }
  }

  disconnect(): void {}

  private getPagedData(data: User[]): User[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]): User[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'email': return compare(a.email, b.email, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  initData(): void {
    this.committeeService.getUsers().subscribe({
      next: (users: User[]) => {
        this.data.next(users);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
