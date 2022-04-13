import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PermisoRolService {

  public role_id = 2;

  constructor(private http: HttpClient) { }

  Listar() {

    let dato = {
      "role_id": this.role_id
    }

    let seguro = environment.headerSimple;
    console.log(environment.urlPermisoRol)

    const ladata:any =  this.http.post(environment.urlPermisoRol, JSON.stringify(dato), { headers: new HttpHeaders(seguro)} );

    return ladata;

 }

 guardar( permisos:any ){
  let seguro = environment.headerSimple;
  console.log(environment.urlPermisoRol)

  const ladata:any =  this.http.post(environment.urlAgregarPermisoRol, JSON.stringify(permisos), { headers: new HttpHeaders(seguro)} );

  return ladata;
 }

 public null(variable:any) {
   if (variable === "NULL") { return null; }
   if (variable === 'null') { return null; }
   if (variable === '') { return null; }
   return variable;
  }

}
