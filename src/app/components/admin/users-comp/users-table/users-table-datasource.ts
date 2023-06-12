import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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

  connect(): Observable<User[]> {
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

  private getPagedData(data: User[]): User[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: User[]): User[] {
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
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'firstname':
          return compare(a.firstname, b.firstname, isAsc);
        case 'lastname':
          return compare(a.lastname, b.lastname, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        case 'address':
          return compare(a.address, b.address, isAsc);
        case 'gender':
          return compare(a.gender, b.gender, isAsc);
        case 'role':
          return compare(a.role, b.role, isAsc);
        case 'creationDate':
          return compare(a.createdDate, b.createdDate, isAsc);
        default:
          return 0;
      }
    });

    return sortedData;
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

