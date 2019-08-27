import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import data from '../../profile'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;


  constructor() { }

  ngOnInit() {
    const profileData = data

    let tagCount = {}
    for(const x of profileData){

      for(const tag of x.tags) {
        if (tagCount[tag]) {
          tagCount[tag] += 1
        } else {
          tagCount[tag] = 1
        }
      }
    }

    for (const key in tagCount) {
      this.pieChartLabels.push(key)
      const numTags = tagCount[key]
      this.pieChartData.push[numTags]
    }

    console.log(tagCount)
    }
  }


