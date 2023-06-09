import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        //we need dates
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "patisiwn 76",
            data: ['167','376', '52', '79', '92',
								 '574', '673', '546'],
            backgroundColor: 'green'
          },{
            label: "patisiwn 80",
            data: ['167','376', '52', '79', '92',
								 '574', '673', '546'],
            backgroundColor: 'yellow'
          },{
            label: "patisiwn 96",
            data: ['167','376', '52', '79', '92',
								 '574', '673', '546'],
            backgroundColor: 'blue'
          },{
            label: "troias 3",
            data: ['167','376', '52', '79', '92',
								 '574', '673', '546'],
            backgroundColor: 'red'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });


  }

}
