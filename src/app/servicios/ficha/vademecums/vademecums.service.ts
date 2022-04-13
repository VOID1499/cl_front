import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VademecumsService {


  public pagina:number = 1;
  public numfilas:number = 10;
  public ordenCol:string = "id";
  public ordenTipo:string = "DESC";
  public id? = null;
  public nombre:string = "";


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
      "nombre":this.nombre
    }
    const ladata:any =  this.http.post(environment.urlVademecums, request, { headers: new HttpHeaders(seguro) } );

    return ladata;
  }



}
