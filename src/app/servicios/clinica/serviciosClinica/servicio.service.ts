import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public request:any;

  constructor(
    private http:HttpClient
  ){}


  editar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.put(environment.urlServicio , JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }

  guardar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.post(environment.urlServicio , JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }




}
