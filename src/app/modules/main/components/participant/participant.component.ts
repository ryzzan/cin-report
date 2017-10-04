import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../../../shared/services/array/crud.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  public mainForm: FormGroup;
  public paramsToTableData: any;
  public list: any;
  public toolbar: any;


  constructor(
    private crud: CrudService
  ) { }

  ngOnInit() {
    this.mainForm = new FormGroup({
      'competition_id': new FormControl(1),
      'institution_name': new FormControl(null,Validators.required)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de participantes",
        delete: [{
          route: '/participant/list',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "participants-products",
        show: [['participant', 'business_name'], ['participant', 'tranding_name'], ['participant', 'cnpj_number']],
        header: ['Nome Fantasia', 'Razão Social', 'CNPJ'],
        order: [['participant', 'business_name'], 'desc'],
        edit: {route: '/participant/list/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
}
