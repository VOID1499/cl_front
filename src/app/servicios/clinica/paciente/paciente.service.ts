import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  public id? = "";
  public rut? = "";
  public correo? = "";
  public nombre = "";
  public apellido_paterno =  "";
  public apellido_materno = "";

  constructor( private http: HttpClient ) { }


  guardar() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K-Authorization': KAuth! };

    let request = 
      {
        "rut": this.rut,
        "correo": this.correo,
        "nombre": this.nombre,
        "apellido_paterno": this.apellido_paterno,
        "apellido_materno": this.apellido_materno
    }
    

    const ladata:any =  this.http.post(environment.urlPaciente, request, { headers: new HttpHeaders(seguro) } );

    return ladata;
  }


  editar() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K-Authorization': KAuth! };

    let request = 
      {
        "id": this.id,
        "rut": this.rut,
        "correo": this.correo,
        "nombre": this.nombre,
        "apellido_paterno": this.apellido_paterno,
        "apellido_materno": this.apellido_materno
    }
    

    const ladata:any =  this.http.put(environment.urlPaciente, request, { headers: new HttpHeaders(seguro) } );

    return ladata;
  }


}
