import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TechnicianService } from 'src/app/services/technician.service';
import { DataTableComponent } from '../data-table/data-table.component';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;

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

  constructor(private techService: TechnicianService){}

  ngOnInit() {
    this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

    this.techService.getAllSitesNames().subscribe({
      next: (res: any) => {
        this.options = res;
      },
      error: err => console.error(err)
    });

    this.techService.getBuildingsName().subscribe({
        next: (res: any) => {
          this.buildings = res;
        },
        error: err => console.error(err)
      });

    this.techService.getBuildingsSitesName().subscribe({
      next: (res: any) => this.buildingSitesNames = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  onApply(){
    this.techService.getApplicationsFiltered(this.autoCompleteForm.value, this.selectedBuilding, this.selectedStatus, this.selectedPriority).subscribe({
      next: res => this.dataTable.refreshData(res),
      error: err => console.error(err)
    })
    this.sidenav.close();
  }

  onClear(){
    this.autoCompleteForm.reset();
    this.selectedBuilding = '';
    this.selectedStatus = '';
    this.chipsStatus.forEach(chip => chip.selected = false);
    this.chipsPriority.forEach(chip => chip.selected = false);
    this.selectedStatus = '';
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

