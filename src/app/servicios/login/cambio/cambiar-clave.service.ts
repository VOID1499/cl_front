import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CambiarClaveService {

  constructor(private http: HttpClient) {}

  public email? = '';
  public password? = '';
  public password_confirmation? = '';
  public password_token? = '';

  cambiarclave() {
    let datos = {
      "email": this.email,
      "password": this.password,
      "password_confirmation": this.password_confirmation,
      "password_token": this.password_token,
    };

    console.log(JSON.stringify(datos));

    let seguro = environment.headerSimple;

    const ladata: any = this.http.post(environment.urlCambioClave, JSON.stringify(datos), { headers: new HttpHeaders(seguro) });

    return ladata;
  }

  public null(variable: any) {
    if (variable === 'NULL') {
      return null;
    }
    if (variable === 'null') {
      return null;
    }
    if (variable === '') {
      return null;
    }
    return variable;
  }
}

