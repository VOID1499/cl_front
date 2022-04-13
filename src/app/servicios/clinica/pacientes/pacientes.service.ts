import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  public id:number = 0;
 // public rut:string = "";
  public correo:string = "";
  public nombre:string =  "";
  public apellido_paterno:string = "";
  public apellido_materno:string = "";

  public pagina = 1;
  public numfilas = 0;
  public ordenCol = "id";
  public ordenTipo = "DESC";



constructor( private http: HttpClient ) { }


  obtener() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');

    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "id": this.id,
     // "rut":this.rut,
      "nombre":this.nombre,
      "apellido_paterno":this.apellido_paterno,
      "apellido_materno":this.apellido_materno,
      "correo":this.correo


    }

    const data:any =  this.http.post(environment.urlPacientes, request, { headers: new HttpHeaders(seguro) } );

    return data;
  }

  listarTodo() {

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any =  this.http.get(environment.urlPacientes, { headers: new HttpHeaders(seguro) } );

    return data;
  }


  }
