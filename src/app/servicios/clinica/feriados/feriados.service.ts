import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

    public pagina:number = 1;
    public numfilas:number = 0;
    public ordenCol? = "id";
    public ordenTipo? = "DESC";
    public paginacion:boolean = true;

  constructor(private http:HttpClient) { }

  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "paginacion":this.paginacion,
      "pagina":this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
    }

    const data = this.http.post(environment.urlFeriados ,request,{headers: new HttpHeaders(seguro)});
    return data;

  }
}
