import {Component, OnInit, ViewChild} from '@angular/core';
import {CommitteeService} from "../../../../services/committee.service";

import {ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {BarChartComponent} from "../bar-chart/bar-chart.component";

const moment = _rollupMoment || _moment;

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

  selectedIssue!: string;
  selectedBuilding!: string;
  typeOfIssues: string[] = [];
  buildings: any[] = [];

  buildingForm = new FormControl('');

  constructor(private committeeService: CommitteeService) {  }

  fromDate = new FormControl(moment());
  toDate = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, date: FormControl) {
    const ctrlValue = date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.date(1);
    date.setValue(ctrlValue);
    datepicker.close();
  }


  ngOnInit(): void {

    this.clearFilters()


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
    let arrBuild: any;
    if (this.buildingForm.value) {
      arrBuild = this.buildingForm.value;
    }
    let from_date = '';
    let to_date = '';
    if (this.fromDate && this.fromDate.value) {
      from_date = this.fromDate.value.toISOString();
    }
    if (this.toDate && this.toDate.value) {
      to_date = this.toDate.value.toISOString();
    }
    this.committeeService.getStatistics(from_date, to_date, this.selectedIssue, this.selectedBuilding).subscribe({
      next: (value: any) => {
        this.barChart.labels$.next(value.labels);
        let tempArr = [{
          label: value.label,
          data: value.data,
          backgroundColor: this.getRandomColor()
        }]
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
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

    return color;
  }

  clearFilters(): void {
    this.selectedIssue = '';
    this.selectedBuilding = '';
    this.toDate.reset();
    this.fromDate.reset();
    this.onFiltersChange();

  }

  onDownload() {
    this.committeeService.downloadStats().subscribe({
      next: value => this.saveFile(value),
      error: err => console.error(err)
    })
  }

  private saveFile(response: any) {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `statistics_${this.getCurrentDate()}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

  public getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${this.padNumber(day)}/${this.padNumber(month)}/${year}`;
    return formattedDate;
  }

  private padNumber(number: number): string {
    if (number < 10) {
      return '0' + number;
    }
    return number.toString();
  }
}
