import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import data from '../../profile'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    // { data: [10, 20, 30], label: 'Series 1' },
    // { data: [5, 30, 15], label: 'Series 2' },
  ];
  public lineChartLabels: Label[] = [
    // 'x', 'y', 'z'
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }

  ngOnInit() {
    let profileData = data

    let tempDataStore = {}

    for(let imageUpload of profileData){
      const month = imageUpload.dateAdded.getMonth();
      const image = imageUpload.id

      if(tempDataStore[month]){
        if(tempDataStore[month][image]){
          tempDataStore[month][image] += 1
        } else {
          tempDataStore[month][image] = 1
        }
      } else {
        tempDataStore[month] = {}
        tempDataStore[month][image] = 1
      }
    }

    let imageCount = {}

    for(const month in tempDataStore){
      this.lineChartLabels.push(month)
      for(let image in tempDataStore[month]){
        if(imageCount[image]){
          imageCount[image].push(tempDataStore[month][image])
        } else {
          imageCount[image] = [imageCount[month][image]]
        }
      }
    }

    for(let image in imageCount){
      this.lineChartData.push(
        {data: imageCount[image], label: image}
      )
    }
    debugger
  }

}
