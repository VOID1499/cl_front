import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {






  constructor(private http:HttpClient) { }


  guardar(request:any){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let data = this.http.post(environment.urlReceta , request ,{headers: new HttpHeaders(seguro)});
    return data;

  }

  obtener(ficha_atencion_id:number){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "ficha_atencion_id":ficha_atencion_id,
    }
   let data = this.http.post(environment.urlRecetas , request ,{headers: new HttpHeaders(seguro)});
   return data;

  }

}
