import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DiaService {

  public id? = null;
  public nombre? = '';


  constructor(private http:HttpClient) {}

  guardar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "nombre": this.nombre,
    }

    const data:any = this.http.post(environment.urlDia,request,{ headers: new HttpHeaders(seguro) } );
    return data;
  }



  editar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "id":  this.id,
      "nombre": this.nombre,
    
    }

    const data:any = this.http.post(environment.urlDia,request,{ headers: new HttpHeaders(seguro) } );
    return data;
  }

  

}
