import { Component, OnInit } from '@angular/core';

/**
 * Services
 */
import { CrudService } from './../../shared/services/array/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  competitionsObject: any;
  paramsToMenuSideNav: any;
  title: string = "CIN";

  constructor(
    private crud: CrudService
  ) { }

  ngOnInit() {
    this.paramsToMenuSideNav = {
      menuSettings: [{
        description: "Participantes",
        route: ['/main/participant']
      }, {
        description: "Agendamento",
        route: ['/main/schedule']
      }]
    }
  }
}
