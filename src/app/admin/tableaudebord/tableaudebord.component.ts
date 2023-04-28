import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import * as Highcharts from "highcharts";
import { VehiculeService } from "src/app/services/vehicule.service";

declare var require: any;

@Component({
  selector: "app-tableaudebord",
  templateUrl: "./tableaudebord.component.html",
  styleUrls: ["./tableaudebord.component.scss"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(1000)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(1000, style({ opacity: 0 }))),
    ]),
  ],
})
export class TableaudebordComponent implements OnInit {
  totalVehicule: any;
  notifTitle: string;
  tableData$: any = [];
  totalEntretien: any;
  listopAsurance: any;
  public listopVisite: any = [];

  cat = ["DSI", "DF", "DG", "DRH", "DF2"];
  totalReparation: any;
  totalSinistre: any;
  totalPanne: any;
  totalCuve: any;
  totalCuveMontant: number;
  listEntretienprogramme: any;
  totalcartecarburant: any;

  /*public options: any = {
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
  }*/
  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit() {
    //Highcharts.chart('container', this.options);

    this.loadTableaudeBord();
    this.loadTopBonpourNotification();
  }

  loadTableaudeBord() {
    this.vehiculeService.TotalTableaudeBord().subscribe((topcinqret) => {
      this.tableData$ = topcinqret;
      this.totalVehicule = this.tableData$.results.totalvehiculeval.length;
      this.totalEntretien = this.tableData$.results.totalentretien.length;
      this.totalReparation = this.tableData$.results.totalreparation.length;
      this.totalSinistre = this.tableData$.results.totalsinistre.length;
      this.totalPanne = this.tableData$.results.totalpanne.length;
      this.totalCuve = this.tableData$.results.totalcuve[0].total_cuve;
      this.totalcartecarburant = this.tableData$.results.totalcartecarburant[0].total_cartecarburant;


      //alert(this.totalCuve * 650);
      this.totalCuveMontant = this.totalCuve * 650

      
      this.listopVisite = this.tableData$.results.notifvisitevignette.slice(0,10);
      this.listopAsurance = this.tableData$.results.notifassurance.slice(0, 10);
    });
  }

  loadTopBonpourNotification() {
    this.vehiculeService.listenotification().subscribe(
       topcinqret => {
         this.tableData$ = topcinqret;
        /* this.totalVisite = this.tableData$.results.notifvisitevignette.length;
         this.totalAssurance = this.tableData$.results.notifassurance.length;*/
        
 
 
         this.listopVisite = this.tableData$.results.notifvisitevignette.slice(0, 10);
         this.listopAsurance = this.tableData$.results.notifassurance.slice(0, 10);
         this.listEntretienprogramme = this.tableData$.results.entretienprogramme.slice(0, 10);

       }
     );
   }
}

/*totalcuve
: 

: 
[{0: 32, 1: "45731e23-b74f-11ed-a660-a08cfdd2f594", 2: "d60c2f79-b74d-11ed-a660-a08cfdd2f594",…},…]

: 
[{0: 56, 1: "c327c904-dae3-11ed-a660-a08cfdd2f594", 2: "e1befe3d-d9de-11ed-a660-a08cfdd2f594",…}]

: 

: 
[,…]
success
: 
true*/
