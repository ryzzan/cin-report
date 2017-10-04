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
      order: [['participant', 'business_name'], 'desc']
    })
    .then(res => {
      this.buyerArray = res;
    })
  }

}