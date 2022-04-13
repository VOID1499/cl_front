import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public pagina:number = 1;
  public numfilas:number = 10;
  public ordenCol? = "id";
  public ordenTipo? = "DESC";
  public id:number = 0;
  public nombre? = "";
  public paginacion = true;



  constructor(private http:HttpClient) { }


  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {

      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "id": this.id,
      "nombre": this.nombre,
      "paginacion":this.paginacion
    }

    const data:any = this.http.post(environment.urlEspecialidades,request,{ headers: new HttpHeaders(seguro) });
    return data;
  }
}
