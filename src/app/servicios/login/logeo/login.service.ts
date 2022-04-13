import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public email? = "";
  public password? = "";
  public organizacion_id? = 0;

  logear() {

   let datos = {
     "email": this.email,
     "password": this.password,
     "organizacion_id": this.organizacion_id
    }

    console.log(JSON.stringify(datos));

    let seguro = environment.headerSimple;

    const ladata:any =  this.http.post(environment.urlLogeo, JSON.stringify(datos), { headers: new HttpHeaders(seguro)} );

    return ladata;

 }

 public null(variable:any) {
   if (variable === "NULL") { return null; }
   if (variable === 'null') { return null; }
   if (variable === '') { return null; }
   return variable;
  }

}
