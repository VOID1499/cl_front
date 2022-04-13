import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public pagina:number = 1;
  public numfilas:number = 5;
  public ordenCol = "id";
  public ordenTipo = "ASC";

  public id?: number;
  public name?: string;
  public email?: string;
  public password?: number;
  public password_confirmation?: string;
  public link?: number;
  public role_id?: string;



  constructor(private http: HttpClient) {}

  Listar() {
   let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let dato = {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo
    };

    const ladata: any = this.http.post(environment.urlUsuario, JSON.stringify(dato), {headers: new HttpHeaders(seguro)});

    return ladata;
  }

  crear() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let dato = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "password_confirmation": this.password_confirmation,
      "link": this.link,
      "role_id": this.role_id

    };

    const ladata: any = this.http.post(environment.urlCrearUsuario, JSON.stringify(dato), {headers: new HttpHeaders(seguro), });

    return ladata;
  }

  editar() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let dato = {
      "id": this.id,
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "password_confirmation": this.password_confirmation,
      "link": this.link,
      "role_id": this.role_id
    };

    const ladata: any = this.http.put(environment.urlEditarUsuario, JSON.stringify(dato), {headers: new HttpHeaders(seguro), });

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
