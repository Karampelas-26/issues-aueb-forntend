import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import {BehaviorSubject} from "rxjs";
Chart.register(...registerables);


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  public chart: any;

  public labels$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public datasets$: BehaviorSubject<{label: string, data: string[], backgroundColor: string}[]> = new BehaviorSubject<{label: string, data: string[], backgroundColor: string}[]>([]);


  ngOnInit(): void {
    this.labels$.subscribe(labels => {
      if(this.chart){
        this.destroyChart()
      }
      this.createChart();
    });

    this.datasets$.subscribe(datasets => {
      if(this.chart){
        this.destroyChart()
      }
      this.createChart();
    });
  }


  ngOnDestroy(): void {
    this.destroyChart();
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        //we need dates
        labels: this.labels$.value,
        datasets: this.datasets$.value
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  con(){
    console.log(this.labels$.value)
    console.log(this.datasets$.value)
  }
}
