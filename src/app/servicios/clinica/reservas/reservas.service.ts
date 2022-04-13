import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  public request:any;

  constructor(private http:HttpClient) {}



  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.post(environment.urlHorasDisponibles, JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }


}
