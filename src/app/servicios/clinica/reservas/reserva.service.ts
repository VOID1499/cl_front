import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

constructor(private http:HttpClient) {}


public request:any;

  crearReserva(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.post(environment.urlCrearReserva, JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }


  eliminarReserva(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.post(environment.urlEliminarReserva, JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }



}
