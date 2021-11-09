import { Component, OnInit, Input } from '@angular/core';
import { DailyReport } from 'src/app/interface/DailyReport';
import { Options} from 'highcharts'
import { Chart } from 'angular-highcharts';
// import * as Highcharts from 'highcharts'
// import addMore from "highcharts/highcharts-more";

// addMore(Highcharts)
// import more from 'highcharts/highcharts-more';
// more(Highcharts
//   )
@Component({
  selector: 'app-daily-temperature-chart',
  templateUrl: './daily-temperature-chart.component.html',
  styleUrls: ['./daily-temperature-chart.component.css']
})
export class DailyTemperatureChartComponent implements OnInit {
  @Input() dailyReport:DailyReport[] = []
  dailyTempChart:any;
  chartOptions: Options = {}
  temperatureArray:any = []
  datesArray:any = [];
  months:any = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  ngOnInit(): void {
    this.temperatureArray = this.dailyReport.map(interval => {
      return [parseFloat(interval['temperatureMin']),parseFloat(interval['temperatureMax'])]
    })


    let date = new Date().getDate();
    let month = new Date().getMonth();
    this.datesArray.push(`${this.months[month]} ${date}`);
    for (let i = 1; i < this.temperatureArray.length; i++) {
      let chartDate = new Date(
        new Date().getTime() + i * 24 * 60 * 60 * 1000
      ).getDate();
      let chartMonth = new Date(
        new Date().getTime() + i * 24 * 60 * 60 * 1000
      ).getMonth();
      this.datesArray.push(`${this.months[chartMonth]} ${chartDate}`);
    }

    this.chartOptions = {
  
      chart: {
          type: 'arearange',
          zoomType: 'x',
          scrollablePlotArea: {
              minWidth: 600,
              scrollPositionX: 1
          }
      },
    
      title: {
          text: 'Temperature variation by day'
      },
    
      xAxis: {
          categories: this.datesArray
      },
    
      yAxis: {
          title: {
              text: null
          }
      },
    
      tooltip: {
          // crosshair: true,
          shared: true,
          valueSuffix: '°C',
          xDateFormat: '%A, %b %e'
      },
    
      legend: {
          enabled: false
      },
    
      series: [{
        type: 'arearange',
        name: 'Temperatures',
        data: this.temperatureArray
      }]
    
    }
    // console.log(this.temperatureArray)
    this.bindGraph()
  }



  bindGraph(){
    this.dailyTempChart = new Chart(this.chartOptions)
  }
    

  constructor() { }




  

}
