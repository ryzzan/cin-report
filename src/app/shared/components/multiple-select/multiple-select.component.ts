import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

/**
 * Services
 */
import { CrudService } from './../../services/array/crud.service';

@Component({
  selector: 'ntm-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit {
  @Input() params;
  @Output() multipleSelectEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  errors: any = [];
  
  /**
   * Propriedades relacionadas a listagem de opções (obrigatório)
   */
  addButton: boolean = false;
  choice: string; //Sicgle od multiple - multiple by default
  route: string;
  description: any;
  value: any;
  listArray: any = [];
  filteredList: any = [];
  itemCtrl: FormControl;
  order: any;
  searchValue: any;
  showListToggle: boolean = false;
  index: number = -1;
  checkItemIndex: number;
  top: number = 0;
  checkUpAndDown: boolean = false;
  limitToDown: number = 0;
  filterByTerm: any;

  /**
   * Propriedades relacionadas a remoção de opções da listagem (opcional)
   */

  /**
   * Propriedades relacionadas a criação de array de objeto a partir das 
   * escolhas da listagem (obrigatório)
   */
  arrayOfObjects: any = [];

  constructor(
    private crud: CrudService
  ) { }

  ngOnInit() {
    // Validações de parametros start
    if(!this.params){
      this.errors.push({
        cod: 'p-01',
        message: 'Error p-01'
      })
    } else {
      if(!this.params.route){
        this.errors.push({
          cod: 'ms-01',
          message: 'Error ms-01'
        })
      } else {
        this.route = this.params.route;
      }

      if(this.params.search){
        if(this.searchValue = this.params.search['obj']) {
          this.searchValue = this.params.search['obj'];
        } else {
          this.searchValue = this.params.search;
        }
      }

      if(!this.params.description){
        this.errors.push({
          cod: 'ms-02',
          message: 'Error ms-02'
        })
      } else {
        this.description = this.params.description;
      }

      if(!this.params.choice) {
        this.choice = 'multiple';
      } else {
        this.choice = this.params.choice;
      }

      if(!this.params.value){
        this.errors.push({
          cod: 'ms-03',
          message: 'Error ms-03'
        })
      } else {
        this.value = this.params.value;
      }

      if(!this.params.placeholder) {
        this.errors.push({
          cod: 'ms-04',
          message: 'Error ms-04'
        })
      }

      if(this.params.order) {
        this.order = this.params.order;
      }
      // Validações de parametros end

      this.itemCtrl = new FormControl(null);

      this.makeList();
    }
  }

  /**
   * Métodos relacionados a criação da listagem
   */
  makeList = () => {
    let readParams = {
      route: this.route,
      search: this.searchValue,
      order: this.order
    }
    
    this.listArray = [];
    this.crud.read(readParams)
    .then(res => {
      let description;
      let tempArray = [];
      let tempDescription;
      let tempDescription2;
      let tempValue;
      let tempValue2;
      let value;

      if(res['obj']) {
        tempArray.push(res['obj']);
      } else {
        tempArray.push(res);
      }
      
      for(let lim = tempArray[0].length, i = 0; i < lim; i++){
        if(this.description.length && this.value.length) {
          for(let lim2 = this.description.length, j = 0; j < lim2; j++) {
            if(tempDescription == undefined) {          
              tempDescription = tempArray[0][i][this.description[j]];
            } else {
              tempDescription2 = tempDescription[this.description[j]];
              tempDescription = tempDescription2;
            } 
          };

          description = tempDescription;

          for(let lim2 = this.value.length, j = 0; j < lim2; j++) {
            if(tempValue == undefined) {          
              tempValue = tempArray[0][i][this.value[j]];
            } else {
              tempValue2 = tempValue[this.value[j]];
              tempValue = tempValue2;
            } 
          };

          value = tempValue;

          this.listArray.push({
            description: description,
            value: value
          })
        } else {
          this.listArray.push({
            description: tempArray[0][i][this.description],
            value: tempArray[0][i][this.value]
          })
        }
      }
      this.listArray = Object.keys(this.listArray).map(k => this.listArray[k]);
      this.filteredList = this.listArray;
      this.removeItemFromArray();
    })
  }

  showList = (event) => {
    if(event.type === 'focusin'){
      this.showListToggle = true;
    } else {
      this.showListToggle = false;
      this.checkItemIndex = null;
      this.index = -1;
      this.top = 0;
      this.limitToDown = 0;
    }
  }

  listNavigation = (event) => {
    if(event.code === 'ArrowDown'){
      if(!this.showListToggle){
        this.showListToggle = true;
      }
      if(this.index >= -1 && this.index < (this.filteredList.length - 1)){
        this.index++;
        this.checkItemIndex = this.index;
        if(this.index > 7 && this.limitToDown > (this.index - 7) * (-28)){
          this.top -= 28;
          this.limitToDown += this.top;
          this.checkUpAndDown = true;
        }
      } else {
        this.index = this.index;
        this.checkItemIndex = this.index;
      }
    }
    
    if(event.code === 'ArrowUp'){
      if(this.index > 0){
        this.index--;
        this.checkItemIndex = this.index;
        if(this.index < (this.filteredList.length - 8) && this.checkUpAndDown){
          this.top += 28;
          if(this.top > 0){
            this.top = 0;
          }
          this.limitToDown += 28;
          if(this.limitToDown < 0){
            this.limitToDown += 28;
          }
          if(this.index === 0){
            this.checkUpAndDown = false;
          }
        }
      } else {
        this.index = this.index;
        this.checkItemIndex = this.index;
      }
    }

    if(event.code === 'Enter'){
      event.preventDefault();
      if(this.checkItemIndex != null){
        this.itemCtrl.setValue(this.filteredList[this.checkItemIndex].description);
        this.showListToggle = false;
        this.checkItemIndex = null;
        this.index = -1;
        this.checkUpAndDown = false;
        this.top = 0;
        this.limitToDown = 0;
        if(this.choice == "multiple") {
          this.addButton = true;
        } else {
          this.createSingleObject();
        }
      }
    }

    if(event.code === 'Escape'){
      this.showListToggle = false;
      this.checkItemIndex = null;
      this.index = -1;
      this.checkUpAndDown = false;
      this.top = 0;
      this.limitToDown = 0;
    }

    if(event.code === 'Backspace'){
      this.addButton = false;
    }
  }

  objectListNavigation = (index) => {
    this.itemCtrl.setValue(this.filteredList[index].description);
    this.showListToggle = false;
    this.checkItemIndex = null;
    this.index = -1;
    if(this.choice == "multiple") {
      this.addButton = true;
    } else {
      this.createSingleObject();
    }
  }

  filter = (event) => {
    this.clearSearch();
    this.filterByTerm = setTimeout(() => {
      let arrayFiltered = this.filteredList;
      if(event.target.value !== undefined || event.target.value !== ''){
        arrayFiltered =  this.listArray.filter(snap => {
          return snap['description'].toLowerCase().includes(event.target.value.toLowerCase());
        })
        this.filteredList = arrayFiltered;
        if(event.code != 'Escape' && this.filteredList.length > 0 && !this.addButton){
          this.showListToggle = true;
        }
      } else {
        this.removeItemFromArray();
      }
    }, 500);
  }

  clearSearch = () => {
    clearTimeout(this.filterByTerm);
  }

  /**
   * Métodos relacionados a remoção de opções da listagem
   */
  removeItemFromArray = () => {
    let check = false;
    let array = [];
    this.listArray.forEach(item => {
      if(this.arrayOfObjects.length > 0){
        this.arrayOfObjects.forEach(object => {
          if(object === item.description){
            check = true;
          }
        });
      }
      if(!check){
        array.push(item);
      }
      check = false;
    });
    this.listArray = array;
    this.filteredList = this.listArray;
  }

  /**
   * Métodos relacionados a criação de array de objeto a partir das
   * escolhas da listagem
   */
  createSingleObject = () => {
    this.arrayOfObjects = [];
    this.arrayOfObjects.push(this.itemCtrl.value);
    this.itemCtrl.setValue(undefined);
    this.addButton = false;
    this.makeList();
    
    this.multipleSelectEventEmitter.emit(this.arrayOfObjects);
  }

  createMultipleObject = (value) => {
    this.arrayOfObjects.push(value);
    this.itemCtrl.setValue(undefined);
    this.addButton = false;
    this.makeList();
    
    this.multipleSelectEventEmitter.emit(this.arrayOfObjects);
  }

  removeItemFromObject = (index) => {
    this.arrayOfObjects.splice(index, 1);
    this.makeList();
  }

  teste = (i) => {
    this.crud.read({
      route: 'available-participant/'+this.filteredList[i]['value']
    })
    .then(res => {
      console.log(res);
    })
  }
}
