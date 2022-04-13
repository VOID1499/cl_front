import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http:HttpClient) {}

  public ficha_id = 0;
  public plantilla_formulario_id = 0;
  public kid = "";
  public almacen_dato_id= 0;


  guardar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "plantilla_formulario_id":this.plantilla_formulario_id,
      "kid": this.kid,

    }

    const data = this.http.post(environment.urlFicha ,request,{headers: new HttpHeaders(seguro)});
    return data;

  }

}
