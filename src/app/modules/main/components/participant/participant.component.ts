import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'

/*Services*/
import { CrudService } from './../../../../shared/services/array/crud.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  public buyerForm: FormGroup;
  public paramsToTableData: any;
  public list: any;
  mask: any = {
    cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/,'-', /\d/,/\d/],
    cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/, /\d/],
    date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    zip: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    ddd: [/\d/,/\d/],
    phone: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,],
    cellphone: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,],
    uf: [/[A-Za-z]/,/[A-Za-z]/,]
  };
  public sellerForm: FormGroup;
  public title: string;
  public toolbar: any;


  constructor(
    private crud: CrudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.title = "Atualizar participante";
      } else {
        this.title = "Cadastrar participante";
      }
    })

    this.sellerForm = new FormGroup({
      'participant': new FormGroup({
        'profile': new FormControl('seller'),
        'cnpj_number': new FormControl(null, Validators.required),
        'business_name': new FormControl(null, Validators.required),
        'tranding_name': new FormControl(null, Validators.required),
        'foundation_year': new FormControl(null, Validators.required),
        'employees_quantity': new FormControl(null, Validators.required),
        'legal_person': new FormControl(null, Validators.required),
        'company_size': new FormControl(null, Validators.required)
      }),
      'contact': new FormGroup({
        'postal_code': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'number': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'state': new FormControl(null, Validators.required),
        'district': new FormControl(null, Validators.required),
        'company_email': new FormControl(null, [Validators.required, Validators.email]),
        'company_site': new FormControl(null),
        'digital_data_type': new FormControl(null),
        'company_social_media_url': new FormControl(null),
        'company_phone_type': new FormControl(null), //Require participantPhoneObject
        'company_phone_ddd': new FormControl(null),
        'company_phone_number': new FormControl(null),        
      }),      
      'representative': new FormGroup({
        'representative_treatment': new FormControl(null),//required
        'representative_cpf': new FormControl(null),//required
        'representative_name': new FormControl(null),//required
        'representative_position': new FormControl(null),
        'representative_birthday': new FormControl(null),
        'representative_schooling': new FormControl(null),
        'representative_email': new FormControl(null), //required, email
        'representative_postal_code': new FormControl(null),//required
        'representative_address': new FormControl(null),//required
        'representative_city': new FormControl(null),//required
        'representative_state': new FormControl(null),//required
        'representative_phone_type': new FormControl(null), //Require representativePhoneObject
        'representative_phone_ddd': new FormControl(null),//required
        'representative_phone_number': new FormControl(null),//required        
      }),
      'interest': new FormGroup({
        'company_interests': new FormControl(null),
        'participation_events': new FormControl(null),
        'revenues_country': new FormControl(null),
        'sales_capacity': new FormControl(null),
        'local_revenues': new FormControl(null),
        'other_state': new FormControl(null),
        'other_state_revenues': new FormControl(null),
        'other_country': new FormControl(null),
        'other_country_revenues': new FormControl(null),
      }),
      'activity': new FormGroup({
        'group_id': new FormControl(null, Validators.required),
        'subgroup_id': new FormControl(null, Validators.required),
        'product_id': new FormControl(null, Validators.required),
        'other_product': new FormControl(null),
      })
    })

    this.buyerForm = new FormGroup({
      'participant': new FormGroup({
        'profile': new FormControl('buyer'),
        'cnpj_number': new FormControl(null, Validators.required),
        'business_name': new FormControl(null, Validators.required),
        'tranding_name': new FormControl(null, Validators.required),
        'foundation_year': new FormControl(null, Validators.required),
        'employees_quantity': new FormControl(null, Validators.required),
        'legal_person': new FormControl(null, Validators.required),
        'language': new FormControl(null, Validators.required),
        'other_language': new FormControl(null),
      }),
      'contact': new FormGroup({
        'country': new FormControl(null, Validators.required),
        'postal_code': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'number': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'state': new FormControl(null, Validators.required),
        'district': new FormControl(null, Validators.required),
        'company_email': new FormControl(null, [Validators.required, Validators.email]),
        'company_site': new FormControl(null),
        'digital_data_type': new FormControl(null),
        'company_social_media_url': new FormControl(null),
        'company_phone_type': new FormControl(null), //Require participantPhoneObject
        'company_phone_ddd': new FormControl(null),
        'company_phone_number': new FormControl(null),        
      }),      
      'representative': new FormGroup({
        'representative_treatment': new FormControl(null), //required
        'representative_cpf': new FormControl(null), //required
        'representative_name': new FormControl(null), //required
        'representative_position': new FormControl(null),
        'representative_email': new FormControl(null), //required, email
        'representative_phone_type': new FormControl(null), //Require representativePhoneObject
        'representative_phone_ddd': new FormControl(null), //required
        'representative_phone_number': new FormControl(null), //required
      }),
      'interest': new FormGroup({
        'company_interests': new FormControl(null),
        'partner_profile': new FormControl(null),
        'revenues_country': new FormControl(null),
        'local_revenues': new FormControl(null),
        'other_state': new FormControl(null),
        'other_state_revenues': new FormControl(null),
        'other_country': new FormControl(null),
        'other_country_revenues': new FormControl(null),
      }),
      'activity': new FormGroup({
        'subgroup_id': new FormControl(null, Validators.required),
        'product_id': new FormControl(null, Validators.required),
        'other_product': new FormControl(null),
      })
    })

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de participantes",
        delete: [{
          route: '/main/participant',
          param: 'id'
        }],
        search: true
      },
      list: {
        route: "participants-products",
        show: [['participant','cnpj_number'], ['participant','business_name'], ['participant','tranding_name'], ['products','name']],
        header: ['CNPJ', 'Razão Social', 'Nome Fantasia', 'Produtos'],
        order: [['participant','business_name'], 'desc'],
        edit: {route: '/main/participant/', param: 'id'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }
}
