import {Component, OnInit, ViewChild} from '@angular/core';
import {CommitteeService} from "../../../../services/committee.service";

import {ViewEncapsulation} from '@angular/core';
import {Form, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {from} from "rxjs";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,

})


export class StatisticsComponent implements OnInit {



  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedIssue!: string;
  selectedBuilding!: string;
  typeOfIssues: string[] = [];
  buildings: any[] = [];
  startDate = new Date();

  buildingForm = new FormControl('');

  constructor(private committeeService: CommitteeService) {

  }

  fromdate = new FormControl(moment());
  todate = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, date: FormControl) {
    const ctrlValue = date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.date(1);
    date.setValue(ctrlValue);
    datepicker.close();
  }


  ngOnInit(): void {




    this.committeeService.getBuilding().subscribe({
      next: (res: any) => this.buildings = res,
      error: err => console.error(err)
    })
    this.committeeService.getStaticEnums().subscribe({
      next: (res: any) => this.typeOfIssues = res.IssueTypes,
      error: err => console.error(err)
    })
  }


  onFiltersChange(): void {
    if (this.fromdate && this.fromdate.value) {
      console.log(this.fromdate.value.toISOString());
    }
    if (this.todate && this.todate.value) {
      console.log(this.todate.value.toISOString());
    }
    this.committeeService.getStatistics(this.fromDate, this.toDate, this.selectedIssue, this.selectedBuilding).subscribe({
      next: value => console.table(value),
      error: err => console.error(err)
    })
  }

  clearFilters(): void {
    this.fromDate = null;
    this.toDate = null;
    this.selectedIssue = '';
    this.selectedBuilding = '';
    this.committeeService.getStatistics(this.fromDate, this.toDate, this.selectedIssue, this.selectedBuilding).subscribe({
      next: value => console.table(value),
      error: err => console.error(err)
    })
  }


  protected readonly from = from;
}
