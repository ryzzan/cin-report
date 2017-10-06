import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*Array*/
import { environment } from './../../../../environments/environment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrudService {
  errors: any = [];
  headersToAuth: any;
  optionsToAuth: any;
  url = environment.urlToApi;

  constructor(private http: Http) {}

  create = (params) => new Promise((resolve, reject) => {
    let route: string = params.route;
    let objectToCreate: any = params.objectToCreate;

    if(!route) { // Verifica se pelo menos uma child foi definida
      reject({
        cod: "c-01",
        message: "Informar erro c-01 ao administrador"
      });
    }

    this.http
    .post(
      this.url+route,
      objectToCreate
    )
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Cadastro feito com sucesso"//Cadastro feito com sucesso
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  read = (params) => new Promise ((resolve, reject) => {
    let hide = "", limit = "", obj, objFiltered = [], search = [], 
    objFilteredTemp = [], objKeys, order = [], page = "", 
    setGet = "", where = "", show = "", totalForPagination: number, finalLimit: number;

    if(params) {
      if(!params.route) {
        if(!params.array) {
          reject({
            cod: "r-01",
            message: 'Defina a rota de pesquisa ou envie uma array para a listagem (route: string || array: any)'
          })
        }
      }

      if(params.show && params.hide) {
        reject({
          cod: "ra-02",
          message: "Não pode declarar os parâmetros show e hide ao mesmo tempo"
        });
      }

      if(params.show) {
        setGet = "?";
        show = "&show=[";
        
        for(let lim = params.show.length, i =0; i < lim; i++) {
          show += params.show[i]+",";            
        }

        show = show.substring(0, show.length - 1)+"]";
      }

      if(params.search && params.search.length > 0) {
        search.push(params.search);
      }

      if(params.hide) {
        setGet = "?";
        hide = "&hide=";
        
        for(let lim = params.hide.length, i =0; i < lim; i++) {
          hide += params.hide[i]+",";            
        }

        hide = hide.substring(0, hide.length - 1);
      }

      if(params.limit) {
        setGet = "?";
        limit = "&limit="+params.limit;
      }

      if(params.order) {
        if(params.order.length == 2) {
          order[0] = params.order[0];
          order[1] = params.order[1];
        }
      }

      if(params.page) {
        setGet = "?";
        page = "page="+params.page;
      } else {
        if(params.route != "user") {
          setGet = "?";
          page = "page=1";
        } else {
          page = ""
        }
      }

      this.headersToAuth = new Headers({
        'Authorization': sessionStorage.getItem('access_token')
      });

      this.optionsToAuth = new RequestOptions({
        'headers': this.headersToAuth
      })

      if(params.array) {
        if(params.array != "" && params.array != undefined) {
          obj = params.array;
          objFilteredTemp = obj;
          
          if(order.length > 0) {
            if(order[1] === 'desc') {
              if(order[0].length > 1) {
                objFiltered = this.propertyFromMatrix(obj, order[0], order[1], search);
              } else {
                objFiltered = obj.sort();
              }
            } else {
              if(order[0].length > 1) {
                objFiltered = this.propertyFromMatrix(obj, order[0], order[1], search);
              } else {
                objFiltered = obj.sort();
              }
            }
  
            obj = objFiltered;
            totalForPagination = objFiltered.length;
  
            finalLimit = Math.ceil(totalForPagination/params.limit)
          }
          
          if(limit) {
            let temp = [];
            let arrayStart;
            let arrayEnd;
            
            objFiltered = [];
            
            if(params.page < 2) {
              if(totalForPagination >= params.limit) {
                arrayStart = params.page - 1;
                arrayEnd = params.limit;
              } else if(totalForPagination < params.limit && totalForPagination > 0){
                arrayStart = params.page - 1;
                arrayEnd = obj.length;
  
                objFilteredTemp = obj;
              } else {
                console.log("sem resultado")
              }
            } else if(params.page < finalLimit) {
              arrayStart = (params.page * params.limit - params.limit);
              arrayEnd = params.page * params.limit;
            } else {
              arrayStart = (params.page * params.limit - params.limit);
              arrayEnd = totalForPagination;
            }
  
            for(let lim = arrayEnd, i = arrayStart; i < lim; i++) {       
              objFiltered.push(obj[i]);
            }
            
            obj = objFiltered;
          }
          
          obj.total = totalForPagination;
          obj.totaNoFilter = objFilteredTemp.length;
  
          resolve({
            obj
          });
        }
      } else {
        this.http.get(
          environment.urlToApi + params.route, // + setGet + page +  show + hide + limit + order + search,
          this.optionsToAuth
        )
        .subscribe(res => { 
          if(res['_body'] != "" && res['_body'] != undefined) {
            obj = JSON.parse(res['_body']);
            objFilteredTemp = obj;
            
            if(order.length > 0) {
              if(order[1] === 'desc') {
                if(order[0].length > 1) {
                  objFiltered = this.propertyFromMatrix(obj, order[0], order[1], search);
                } else {
                  objFiltered = obj.sort();
                }
              } else {
                if(order[0].length > 1) {
                  objFiltered = this.propertyFromMatrix(obj, order[0], order[1], search);
                } else {
                  objFiltered = obj.sort();
                }
              }
    
              obj = objFiltered;
              totalForPagination = objFiltered.length;
    
              finalLimit = Math.ceil(totalForPagination/params.limit)
            }
    
            if(limit) {
              let temp = [];
              let arrayStart;
              let arrayEnd;
              
              objFiltered = [];
              
              if(params.page < 2) {
                if(totalForPagination >= params.limit) {
                  arrayStart = params.page - 1;
                  arrayEnd = params.limit;
                } else if(totalForPagination < params.limit && totalForPagination > 0){
                  arrayStart = params.page - 1;
                  arrayEnd = obj.length;
    
                  objFilteredTemp = obj;
                } else {
                  console.log("sem resultado")
                }
              } else if(params.page < finalLimit) {
                arrayStart = (params.page * params.limit - params.limit);
                arrayEnd = params.page * params.limit;
              } else {
                arrayStart = (params.page * params.limit - params.limit);
                arrayEnd = totalForPagination;
              }
    
              for(let lim = arrayEnd, i = arrayStart; i < lim; i++) {       
                objFiltered.push(obj[i]);
              }
              
              obj = objFiltered;
            }
            
            obj.total = totalForPagination;
            obj.totaNoFilter = objFilteredTemp.length;
    
            resolve({
              obj
            });
          }
        })
      }
    } else {
      reject({
        cod: "p-01",
        message: "Definir parâmetros mínimos do serviço"
      })
    }
  })

  update = (params) => new Promise((resolve, reject) => {
    let route: string = params.route;
    let objectToUpdate: any = params.objectToUpdate;
    let paramToUpdate: any = params.paramToUpdate;

    if(!route) {
      reject({
        cod: "u-01",
        message: "Informar erro u-01 ao administrador"
      });
    }

    if(!paramToUpdate) {
      reject({
        cod: "u-02",
        message: "Informar erro u-02 ao administrador"
      });
    }

    this.http
    .put(
      this.url+route+"/"+paramToUpdate,
      objectToUpdate
    )
    .subscribe(res => {
      resolve({
        cod: "u-03",
        message: "Atualização feita com sucesso"
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  delete = (params) => new Promise((resolve, reject) => {
    let route: string = params.route;
    let paramToDelete: any = params.paramToDelete;

    if(!route) {
      reject({
        cod: "u-01",
        message: "Informar erro u-01 ao administrador"
      });
    }

    if(!paramToDelete) {
      reject({
        cod: "u-02",
        message: "Informar erro u-02 ao administrador"
      });
    }

    for(let lim = paramToDelete.length, i = 0; i < lim; i++) {
      this.http
      .delete(
        this.url+route+"/"+paramToDelete[i]
      )
      .subscribe(res => {
        if(i == (lim - 1)) {
          resolve({
            cod: "u-03",
            message: "Ítens apagados com sucesso"
          });
        }
      }, rej => {
        if(rej['_body']) {
          let json = JSON.parse(rej['_body']);
          reject({
            cod: "error-c-01",
            message: JSON.stringify(json.message)
          })
        } else {
          console.log(rej)
        }
      })
    }
  })

  propertyFromMatrix = (object, property, order, search) => {
    let temp = [];
    let id = [];
    
    let lastObject = [];
    let searchObject = [];
    
    //search start
    if(search.length > 0) {
      let checkId;
      let regex = new RegExp(search[0][0].value, 'gi');
      let searchFilteredResults = [];
      let searchResults = [];
      let tempLoopToSearch = [];
      let tempLoopToSearch2;
      let tempToSearch = [];
      
      for(let lim = object.length, i = 0; i < lim; i++) {    
        //Montando busca a partir dos campos definidos como where no paramêtro search início
        for(let lim2 = search[0].length, j = 0; j < lim2; j++) {
          for(let lim3 = search[0][j].where.length, k = 0; k < lim3; k++) {
            if(tempLoopToSearch.length < 1) {
              tempLoopToSearch = object[i][search[0][j].where[k]];
            } else {
              tempLoopToSearch2 = tempLoopToSearch[search[0][j].where[k]];
              tempLoopToSearch = tempLoopToSearch2;
            }
          };

          tempToSearch.push({
            field: tempLoopToSearch, 
            id: object[i]['id']
          });

          tempLoopToSearch = [];
        }
        //Montando busca a aprtir dos campos definidos como where no paramêtro search fim
      
      }
      
      //Fazendo a busca através de regex montada em cima da propriedade value do parâmetro search início
      for(let lim = tempToSearch.length, i = 0; i < lim; i++) {
        if(tempToSearch[i].field.toLowerCase().match(regex) != null) {
          searchResults.push(tempToSearch[i]['id']);
        }
      }

      searchFilteredResults = searchResults.sort(); //order id, so we can check easily repetition in case of more than one result to same json array

      //Montando novo objeto a parti dos resultados iniciais da pesquisa início
      for(let lim = searchFilteredResults.length, i = 0; i < lim; i++) {
        for(let lim2 = object.length, j = 0; j < lim2; j++) {
          if(searchFilteredResults[i] == object[j]['id']) {
            if(searchFilteredResults[i] != searchFilteredResults[i - 1]) { //in case there are more than one result to same json array
              searchObject.push(object[j]);
            }
          }
        }
      }

      object = searchObject;
      //Montando novo objeto a parti dos resultados iniciais da pesquisa fim
      
      //Fazendo a busca através de regex montada em cima da propriedade value do parâmetro search fim
    }
    //search end

    //order and limit start
    for(let lim = object.length, i = 0; i < lim; i++) {
      let tempLoop;
      let tempLoop2;

      for(let lim2 = property.length, j = 0; j < lim2; j++) {
        if(tempLoop == undefined) {          
          tempLoop = object[i][property[j]];
        } else {
          tempLoop2 = tempLoop[property[j]];
          tempLoop = tempLoop2;
        } 
      };

      temp.push({
        field: tempLoop, 
        id: object[i]['id']
      });
      
      if(order == "asc") {
        for(let lim3 = temp.length, k = 1; k < lim3; k++) {
          let swap;
          
          if(temp[k - 1]['field'].toLowerCase() > temp[k]['field'].toLowerCase()) {
            swap = temp[k];
            temp[k] = temp[k - 1];
            temp[k - 1] = swap;
          }
        };
      } else {
        for(let lim3 = temp.length, k = 1; k < lim3; k++) {
          let swap;

          if(temp[k - 1]['field'].toLowerCase() < temp[k]['field'].toLowerCase()) {
            swap = temp[k];
            temp[k] = temp[k - 1];
            temp[k - 1] = swap;
          }
        };
      }
    }
    //order and limit end
    
    for(let lim = temp.length, i = 0; i < lim; i++) {
      for(let lim2 = object.length, j = 0; j < lim2; j++) {
        if(temp[i]['id'] == object[j]['id']) {
          lastObject.push(object[j]);
        }
      }
    }

    return lastObject;
  }
}
