import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TipoDatoService {

  public id:number = 0;
  public nombre? = "";
  public lista_auxiliar = "";
  public estado:number = 1;
  public tipo_dato:string = "";
  constructor(private http:HttpClient) {}


  guardar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "nombre":this.nombre,
      "lista_auxiliar": this.lista_auxiliar,
      "tipo_dato":this.tipo_dato,
      "estado":this.estado
    }

    const data = this.http.post(environment.urlTipoDato ,request,{headers: new HttpHeaders(seguro)});
    return data;

  }

  editar(){


    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "id": this.id,
      "nombre":this.nombre,
      "tipo_dato":this.tipo_dato,
      "lista_auxiliar": this.lista_auxiliar,
      "estado":this.estado
    }

    const data = this.http.put(environment.urlTipoDato ,request,{headers: new HttpHeaders(seguro)});
    return data;

  }

}
