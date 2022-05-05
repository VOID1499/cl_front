import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxsService {

      public request = {
        "paginacion":true,
        "pagina":1,
        "numFilas":10,
        "ordenCol":"id",
        "ordenTipo":"ASC"
      }

  constructor(private http:HttpClient) { }

  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.post(environment.urlBoxs, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;

  }


}
