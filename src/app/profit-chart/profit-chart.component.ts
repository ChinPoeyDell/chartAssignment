import { Component, OnInit } from '@angular/core';
import data from '../../multiYearLaptopSales.js'
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-profit-chart',
  templateUrl: './profit-chart.component.html',
  styleUrls: ['./profit-chart.component.css']
})
export class ProfitChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit() {
    let profitData = data

    let tempDataStore = {}

    for(let profit of profitData){
    const month = profit.monthSold
    const model = profit.model
    const sales = profit.salesPrice
    const cost = profit.cost
    const profitEarn = sales - cost

    if(tempDataStore[month]){
      if(tempDataStore[month][model]){
        tempDataStore[month][profitEarn] = tempDataStore[month][profitEarn] + tempDataStore[month][profitEarn]
      } else {
        tempDataStore[month][profitEarn] = 1
      }
    } else {
      tempDataStore[month] = {}
      tempDataStore[month][model] = 1
    }
    }
  

  let modelProfit = {}

  for(const month in tempDataStore){
    this.barChartLabels.push(month)
    for(let profitEarn in tempDataStore[month]){
      if(modelProfit[profitEarn]){
        modelProfit[profitEarn].push(tempDataStore[month][profitEarn])
      } else {
        modelProfit[profitEarn] = [tempDataStore[month][profitEarn]]
      }
    }
  }

  for(let profitEarn in modelProfit){
    this.barChartData.push(
      {data: modelProfit[profitEarn], label: profitEarn}
    )
  }
}
}
