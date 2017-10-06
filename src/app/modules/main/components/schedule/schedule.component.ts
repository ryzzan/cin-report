import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../../../shared/services/array/crud.service';
import { LaravelCrudService } from './../../../../shared/services/laravel/crud.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public buyerArray: any = [];
  public mainForm: FormGroup;
  public matchArray: any = [];
  public paramsToBuyerMultipleSelect: any;
  public paramsToSellerMultipleSelect: any;
  public paramsToWindowMultipleSelect: any;
  public paramsToTableData: any;
  public sellerArray: any = [];
  public scheduleArray: any = [];
  public title: string = "Agendamentos";

  constructor(
    private crud: CrudService,
    private laravelCrud: LaravelCrudService
  ) { }

  ngOnInit() {
    this.mainForm = new FormGroup({
      seller: new FormControl(null, Validators.required),
      buyer: new FormControl(null, Validators.required)
    })

    this.crud.read({
      route: 'participants-products',
      search: [{where: ['participant', 'profile'], value: 'buyer'}],
      order: [['participant', 'business_name'], 'desc']
    })
    .then(res => {
      this.buyerArray = res['obj'];
    })

    this.crud.read({
      route: 'participants-products',
      search: [{where: ['participant', 'profile'], value: 'seller'}],
      order: [['participant', 'business_name'], 'desc']
    })
    .then(res => {
      this.sellerArray = res['obj'];
    })

    this.paramsToSellerMultipleSelect = {
      route: 'participants-products', 
      choice: 'single', 
      placeholder: 'Vendedor', 
      description: ['participant', 'business_name'], 
      value: ['json','participant', 'id'],
      search: [{where: ['participant', 'profile'], value: 'seller'}],
      order: [['participant', 'business_name'], 'desc']
    }

    

    this.laravelCrud.read({
      route: 'matchs'
    })
    .then(res => {
      this.matchArray = res['obj'];
      this.makeList();
    })
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de agendamentos",
        delete: [{
          route: '/main/schedule',
          param: 'id'
        }],
        search: true
      },
      list: {
        array: this.matchArray,
        show: [['seller','business_name'], ['buyer','business_name'], ['window','time_start'] ],
        header: ['Vendedor', 'Comprador', 'Hora de início'],
        edit: {route: '/main/schedule/', param: 'id'},
        order: [['seller','business_name'], 'desc'],
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  sellerMultipleSelectEventEmitterHandle(e) {
    this.paramsToBuyerMultipleSelect = {
      route: 'available-participant/' + e[0].value, 
      choice: 'single', 
      matrixLevelToStart: ['participant'],
      placeholder: 'Comprador', 
      description: ['business_name'], 
      value: ['id'],
      order: [['participant'], 'desc']
    }

    this.paramsToWindowMultipleSelect = {
      route: 'available-participant/' + e[0].value, 
      choice: 'single', 
      matrixLevelToStart: ['windows'],
      placeholder: 'Hora de início', 
      description: ['time_start'], 
      value: ['id'],
      order: [['participant'], 'desc']
    }
  }
  
}