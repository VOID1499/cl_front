import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionService {

  public pagina:number = 1;
  public numfilas:number = 5;
  public ordenCol? = "id";
  public ordenTipo? = "ASC";

  public id?: number;
  public nombre?: string;
  public correo?: string;
  public telefono?: string;
  public direccion?: string;
  public nombre_contacto?: string;

  constructor(private http: HttpClient) {}

  Listar() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
   // let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let seguro = environment.headerSimple;
    
    let dato = {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "id": this.id,
      "nombre": this.nombre,
      "correo": this.correo,
      "nombre_contacto": this.nombre_contacto
    };

    const ladata: any = this.http.post(environment.urlOrganizaciones, JSON.stringify(dato), {headers: new HttpHeaders(seguro)});

    return ladata;
  }

  crear() {
    let seguro = environment.headerSimple;

    let dato = {
      "nombre": this.nombre,
      "correo": this.correo,
      "telefono": this.telefono,
      "direccion": this.direccion,
      "nombre_contacto": this.nombre_contacto
    };

    const ladata: any = this.http.post(environment.urlCrearOrganizacion, JSON.stringify(dato), { headers: new HttpHeaders(seguro)});

    return ladata;
  }

  editar() {
    let seguro = environment.headerSimple;

    let dato = {
      "id": this.id,
      "nombre": this.nombre,
      "correo": this.correo,
      "telefono": this.telefono,
      "direccion": this.direccion,
      "nombre_contacto": this.nombre_contacto
    };

    const ladata: any = this.http.put(environment.urlEditarOrganizacion, JSON.stringify(dato), { headers: new HttpHeaders(seguro)});

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
