import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {




  public pagina? = 1;
  public numfilas? = 20;
  public ordenCol? = "id";
  public ordenTipo? = "ASC";
  public ficha_id:number = 0;
  public ficha_atencion_id:number = 0;


  constructor(private http:HttpClient) { }


  obtener(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "pagina":this.pagina,
      "numfilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "ficha_id":this.ficha_id,
      "ficha_atencion_id":this.ficha_atencion_id
    }

    const data = this.http.post(environment.urlRecetas ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }

}
