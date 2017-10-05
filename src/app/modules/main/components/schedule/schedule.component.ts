import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../../../shared/services/array/crud.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public buyerArray: any = [];
  public mainForm: FormGroup;
  public paramsToBuyerMultipleSelect: any;
  public paramsToSellerMultipleSelect: any;
  public paramsToTableData: any;
  public sellerArray: any = [];
  public title: string = "Agendamentos";

  constructor(
    private crud: CrudService
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
      console.log(this.buyerArray.length)
    })

    this.crud.read({
      route: 'participants-products',
      search: [{where: ['participant', 'profile'], value: 'seller'}],
      order: [['participant', 'business_name'], 'desc']
    })
    .then(res => {
      this.sellerArray = res['obj'];
      console.log(this.sellerArray.length)
    })

    this.paramsToSellerMultipleSelect = {
      route: 'participants-products', 
      choice: 'single', 
      placeholder: 'Vendedor', 
      description: ['participant', 'business_name'], 
      value: ['participant', 'id'],
      search: [{where: ['participant', 'profile'], value: 'seller'}],
      order: [['participant', 'business_name'], 'desc']
    }

    this.paramsToBuyerMultipleSelect = {
      route: 'participants-products', 
      choice: 'single', 
      placeholder: 'Comprador', 
      description: ['participant', 'business_name'], 
      value: ['participant', 'id'],
      search: [{where: ['participant', 'profile'], value: 'buyer'}],
      order: [['participant', 'business_name'], 'desc']
    }
  }

  sellerMultipleSelectEventEmitterHandle(e) {
    console.log(e)
  }
}