import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarClaveService {

  constructor(private http: HttpClient) { }

  public email? = "";


  recuperar() {

   let datos = {
     "email": this.email
    }

    console.log(JSON.stringify(datos));

    let seguro = environment.headerSimple;

    const ladata:any =  this.http.post(environment.urlRecuperacion, JSON.stringify(datos), { headers: new HttpHeaders(seguro)} );

    return ladata;

 }

 public null(variable:any) {
   if (variable === "NULL") { return null; }
   if (variable === 'null') { return null; }
   if (variable === '') { return null; }
   return variable;
  }

}
