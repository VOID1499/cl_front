import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {


  public request ={

  }

  constructor(private http:HttpClient) {}


    obtenerHorario(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlAgendaProfesional ,this.request,{headers: new HttpHeaders(seguro)});
    return data;

  }
}
