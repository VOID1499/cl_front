import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  public id = 0;
  public plantilla_formulario_id  = 0;
  public ficha_id = 0;
  public profesional_id = 0;
  public fecha:any;

  constructor(private http:HttpClient) {}

  guardar(request:any){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlAtencion ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }

  editar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "id": this.id,
      "fecha":this.fecha
    }

    const data = this.http.put(environment.urlAtencion ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }

  buscarAtencion(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "atencion_id": this.id,

    }

    const data = this.http.post(environment.urlbuscarAtencion ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }
}
