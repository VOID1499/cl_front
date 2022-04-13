import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  public pagina = 1;
  public numfilas = 8;
  public ordenCol = "id";
  public ordenTipo = "DESC";
  public id? = null;
  public enfermedades = "";
  public nombre = "";


  constructor(private http:HttpClient) { }

  obtener(){

  let Auth =  localStorage.getItem('TK');
  let KAuth =  localStorage.getItem('KT');
  let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

  let request = {

    "pagina":this.pagina,
    "numFilas": this.numfilas,
    "ordenCol": this.ordenCol,
    "ordenTipo": this.ordenTipo,
    "id":this.id,
    "enfermedades":this.enfermedades,
    "nombre":this.nombre,
  }
  const ladata:any =  this.http.post(environment.urlEnfermedades, request, { headers: new HttpHeaders(seguro) } );
  return ladata;

  }

}
