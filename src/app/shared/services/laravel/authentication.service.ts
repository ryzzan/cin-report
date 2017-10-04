import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Settings
 */
import { environment } from './../../../../environments/environment';

/**
 * Others libraries
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthenticationService {
  headersToAuth: Headers;
  optionsToAuth: RequestOptions;
  url = environment.urlToOauthToken;
  urlToApi = environment.urlToApi;

  constructor(
    private http: Http
  ) { }

  login = (params) => new Promise((resolve, reject) => {
    let temp;

    this.headersToAuth = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http
    .post(
      this.url,
      {
        "client_secret": "wzxx5JuaQEo546KOAVzLfY9FAJYWUjYtPWpWTFqW",
        "client_id": 2,
        "grant_type": "password",
        "username": params.email,
        "password": params.password
      },
      this.optionsToAuth
    ).subscribe(res => {
      if(res.ok) {
        temp = JSON.parse(res['_body']);
        
        sessionStorage.setItem('access_token', 'Bearer ' + temp.access_token);

        resolve({
          cod: "l-01",
          message: "Login feito com sucesso"
        });
      }
    }, err => {
      if(err.statusText == "Unauthorized") {
        resolve({
          cod:"le-01",
          message: "O e-mail ou senha errado(s)."
        })
      }
    }, () => {
      console.log("Nada")
    })
  })
}
