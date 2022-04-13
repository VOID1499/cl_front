import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DiasService {


  public pagina? = 1;
  public numfilas? = 20;
  public ordenCol? = "id";
  public ordenTipo? = "DESC";
  
  constructor( private http: HttpClient ) { }

  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {

      "paginia": this.pagina,
      "numfilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo":this.ordenCol

    };
    
    const ladata:any =  this.http.post(environment.urlDias, request, { headers: new HttpHeaders(seguro) } );

    return ladata;

  }
}
