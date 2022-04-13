import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {

  public id:number = 0;
  public rut:string = "";
  public correo:string = "";
  public nombre:string =  "";
  public apellido_paterno:string = "";
  public apellido_materno:string = "";
  public especialidad_id:number = 0;
  public tipo_profesional_id:number = 0;

  public pagina:number = 1;
  public numfilas:number = 10;
  public ordenCol = "id";
  public ordenTipo = "DESC";

  constructor(private http:HttpClient) {}

  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,

      //"rut":this.rut,
      "correo":this.correo,
      "nombre":this.nombre,
      "apellido_paterno":this.apellido_paterno,
      "apellido_materno":this.apellido_materno,
      "especialidad_id":this.especialidad_id,
      "tipo_profesional_id":this.tipo_profesional_id
    }

    const data:any = this.http.post(environment.urlProfesionales, JSON.stringify(request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }


  listarTodo(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };
    let request = {
      "especialidad_id":this.especialidad_id
    }
    const data:any = this.http.post(environment.urlProfesionalesPorEspecialidad, JSON.stringify(request) ,{ headers:new HttpHeaders(seguro)});
    return data;

  }




}
