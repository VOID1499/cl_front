import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http:HttpClient) { }

  public request = {};

  guardar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.post(environment.urlBox, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;

  }


  editar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.put(environment.urlBox, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;

  }

  horarioBox(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.post(environment.urlHorarioBox, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;
  }

  serviciosBox(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.post(environment.urlServiciosBox, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;
  }

  boxsDisponibles(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const ladata:any =  this.http.post(environment.urlBoxsDisponibles, this.request, { headers: new HttpHeaders(seguro) } );
    return ladata;
  }



}
