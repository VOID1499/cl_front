import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

public pagina? = 1;
public numfilas? = 20;
public ordenCol? = "id";
public ordenTipo? = "DESC";
public name? = "";
public email? = "";


constructor( private http: HttpClient ) { }


  obtener() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K-Authorization': KAuth! };

    let request =  {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "name": this.name,
      "email": this.email
    }

    const ladata:any =  this.http.post(environment.urlPacientes, request, { headers: new HttpHeaders(seguro) } );

    return ladata;
  }


  }
