import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IssuesTableComponent } from '../issues-table/issues-table.component';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(IssuesTableComponent) dataTable!: IssuesTableComponent;

  value = '';

  filter = 'filters'
  selectedBuilding = '';
  selectedPriority = '';
  selectedStatus = '';
  buildingSitesNames!: Map<string, string[]>;
  autoCompleteForm = new FormControl();

  chipsStatus = [
    { label: 'CREATED', selected: false },
    { label: 'REJECTED', selected: false },
    { label: 'VALIDATED', selected: false },
    { label: 'ASSIGNED', selected: false },
    { label: 'COMPLETED', selected: false },
    { label: 'ARCHIVED', selected: false }
  ];
  chipsPriority = [
    { label: 'Χαμηλή', value: 'LOW',selected: false },
    { label: 'Μεσαία', value: 'MEDIUM',selected: false },
    { label: 'Υψηλή', value: 'HIGH',selected: false }
  ];

  buildings: string[] = [];
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private committeeService: CommitteeService){}

  ngOnInit() {
    this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

    this.committeeService.getAllSitesNames().subscribe({
      next: (res: any) => {
        this.options = res;
      },
      error: err => console.error(err)
    });

    this.committeeService.getBuildingsName().subscribe({
        next: (res: any) => {
          this.buildings = res;
        },
        error: err => console.error(err)
      });

    this.committeeService.getBuildingsSitesName().subscribe({
      next: (res: any) => this.buildingSitesNames = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  getData(){
    this.committeeService.getApplicationsFiltered(this.autoCompleteForm.value, this.selectedBuilding, this.selectedStatus, this.selectedPriority).subscribe({
      next: res => this.dataTable.refreshData(res),
      error: err => console.error(err)
    })
  }
  onApply(){
    this.getData();
    this.sidenav.close();
  }

  onClear(){
    this.autoCompleteForm.reset();
    this.selectedBuilding = '';
    this.selectedStatus = '';
    this.chipsStatus.forEach(chip => chip.selected = false);
    this.chipsPriority.forEach(chip => chip.selected = false);
    this.selectedStatus = '';
    this.getData();
    this.committeeService.getAllSitesNames().subscribe({
      next: (res: any) => {
        this.options = res;
      },
      error: err => console.error(err)
    });
  }

  onStatusSelected(option: any):void {
    option.selected = !option.selected;
    this.selectedStatus = option.label;
  }

  onPrioritySelected(option: any): void {
    option.selected = !option.selected;
    this.selectedPriority = option.value;
  }

  onBuildingSelected(building: string): void {
    if (this.buildingSitesNames.has(building)) {
      this.options = this.buildingSitesNames.get(building) || [];
      this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '')),
      );
    } else {
      this.options = [];
    }
  }
}
