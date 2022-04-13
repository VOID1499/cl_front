import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  constructor(private http: HttpClient) {}

  public name?: string;
  public password?: string;
  public password_confirmation?: string;
  public email?: string;
  public link?: number;

  registrar() {
    let datos = {
      email: this.email,
      name: this.name,
      password: this.password,
      password_confirmation: this.password_confirmation,
      link: this.link,
    };

    console.log(JSON.stringify(datos));

    let seguro = environment.headerSimple;

    const ladata: any = this.http.post(environment.urlRegistro, JSON.stringify(datos), { headers: new HttpHeaders(seguro) });

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
