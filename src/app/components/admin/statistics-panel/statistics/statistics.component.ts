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
import {BarChartComponent} from "../bar-chart/bar-chart.component";

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
  @ViewChild(BarChartComponent) barChart!: BarChartComponent;


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
    console.log("this.should be the buiilding")
    console.log(this.buildingForm.value);
    let arrBuild: any;
    if (this.buildingForm.value) {
      arrBuild = this.buildingForm.value;
    }
    let formDate = '';
    let toDate = '';
    if (this.fromdate && this.fromdate.value) {
      formDate = this.fromdate.value.toISOString();
    }
    if (this.todate && this.todate.value) {
      toDate = this.todate.value.toISOString();
    }
  this.committeeService.getStatistics(formDate, toDate, this.selectedIssue, arrBuild).subscribe({
      next: (value: any) => {
        this.barChart.labels$.next(value.monthNumbers);
        let tempArr = [];
        for(let val of value.otherPOJOs){
          tempArr.push({
            label: val.id,
            data: val.counts,
            backgroundColor: this.getRandomColor()
          })
        }
        this.barChart.datasets$.next(tempArr);
      },
      error: err => console.error(err)
    })
  }

  getRandomColor(): string {
    // Generate random RGB values between 0 and 255
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert RGB values to hexadecimal format
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

    return color;
  }

  clearFilters(): void {
    this.fromDate = null;
    this.toDate = null;
    this.selectedIssue = '';
    this.selectedBuilding = '';
    // this.committeeService.getStatistics(this.fromDate, this.toDate, this.selectedIssue, this.selectedBuilding).subscribe({
    //   next: value => console.table(value),
    //   error: err => console.error(err)
    // })
  }

}
