import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
  selector: 'app-tableaudebord',
  templateUrl: './tableaudebord.component.html',
  styleUrls: ['./tableaudebord.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1000, style({ opacity: 0 })))
    ])
  ]
})
export class TableaudebordComponent implements OnInit {

  cat = ['DSI', 'DF', 'DG', 'DRH', 'DF2'];

  public options: any = {
    Chart: {
      type: 'column'//,
      //  height: 700
    },
    title: {
      text: 'Tendance par Direction'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.cat,
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [{
      type: 'column',
      name: 'Total',
      data: [10, 12, 11, 23, 14]
    }, {
      type: 'column',
      name: 'Encours',
      data: [5, 5, 5, 17, 6]
    }, {
      type: 'column',
      name: 'Terminé',
      data: [5, 7, 6, 6, 8]
    }, {
      type: 'spline',
      name: 'Satisfaction',
      data: [3, 2.67, 3, 6.33, 3.33]
    }]
  }
  constructor() { }
  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}