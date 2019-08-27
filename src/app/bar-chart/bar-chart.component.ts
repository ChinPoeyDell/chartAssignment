import { Component, OnInit } from '@angular/core';
import data from '../../profile.js'
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit() {
    let profileData = data

    let likePerTag = {}

    for(let profile of profileData){
      const month = profile.month
      const like = profile.like
      const tag = profile.tags

      if(likePerTag[month]){
        if(likePerTag[month][tag]){
          likePerTag[month][tag] += 1
        } else {
          likePerTag[month][tag] = 1
        }
      } else {
        likePerTag[month] = {}
        likePerTag[month][tag] = 1
      }
      }

      let likeCount = {}

      for(const month in likePerTag){
        this.barChartLabels.push(month)
        for(let tag in likePerTag[month]){
          if(likeCount[tag]){
            likeCount[tag].push(likePerTag[month][tag])
        } else {
          likeCount[tag] = [likePerTag[month][tag]]
        }
      }
    
    }

    for(let tag in likeCount){
      this.barChartData.push(
        {data: likeCount[tag], label: tag}
      )
    }
  }

}
