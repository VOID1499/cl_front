import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VademecumService {

  public id? = null;
  public  nombre:string = "";
  public  descripcion:string = "";


  constructor(private http:HttpClient) { }

  guardar(){

  let Auth =  localStorage.getItem('TK');
  let KAuth =  localStorage.getItem('KT');
  let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

  let request = {

    "nombre":this.nombre,
    "descripcion":this.descripcion
  }
  const ladata:any =  this.http.post(environment.urlVademecum, request, { headers: new HttpHeaders(seguro) } );
  return ladata;

  }

  editar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {

      "id":this.id,
      "nombre":this.nombre,
      "descripcion":this.descripcion
    }
    const ladata:any =  this.http.put(environment.urlVademecum, request, { headers: new HttpHeaders(seguro) } );
    return ladata;

    }


}
