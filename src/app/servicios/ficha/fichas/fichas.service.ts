import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FichasService {


  public pagina = 1;
  public numfilas = 20;
  public ordenCol? = "fichas.id";
  public ordenTipo? = "DESC";
  public kid? = "";
  public fecha? = "";
  public showTable:boolean = true;
  public ficha:any;
  public showFichaMedica:boolean = false;
  constructor(private http:HttpClient) {


   }


  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "pagina":this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "kid":this.kid,
      "fecha":this.fecha
    }

    const data = this.http.post(environment.urlFichas ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }

}
