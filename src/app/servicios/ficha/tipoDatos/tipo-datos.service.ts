import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TipoDatosService {

  public pagina:number = 1;
  public numFilas:number = 2;
  public ordenCol? = "id";
  public ordenTipo? = "ASC";
  public estado:any;
  public nombre? = "";

  constructor(private http:HttpClient) { }



  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "pagina":this.pagina,
      "numFilas": this.numFilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "estado":this.estado,
      "nombre":this.nombre,

    }

    const data = this.http.post(environment.urlTipoDatos ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }




}
