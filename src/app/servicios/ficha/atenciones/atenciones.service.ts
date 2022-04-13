import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionesService {


  public pagina = 1;
  public numfilas = 0;
  public ordenCol? = "id";
  public ordenTipo? = "DESC";
  public ficha_id? = null;

  constructor(private http:HttpClient) { }

  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "pagina":this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "ficha_id": this.ficha_id,
    }

    const data = this.http.post(environment.urlAtenciones,request,{headers: new HttpHeaders(seguro)});
    return data;
  }

}
