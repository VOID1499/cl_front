import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {


  public request:any;

    public id:number = 0;
    public rut? = "";
    public nombre? = "";
    public apellido_paterno?  = "";
    public apellido_materno?  = "";
    public descripcion? = "";
    public correo? =  "";
    public especialidad?:any = [];
    public tipo?:any = [];


  constructor(private http:HttpClient) {}

  guardar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlProfesional ,this.request,{headers: new HttpHeaders(seguro)});
    return data;

  }


  editar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.put(environment.urlProfesional ,this.request,{headers: new HttpHeaders(seguro)});
    return data;

  }

}
