import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {


  public pagina = 1;
  public numfilas = 10;
  public ordenCol = "id";
  public ordenTipo = "DESC";
  public paginacion:boolean = true;
  public profesional_id = 0;
  constructor(
    private http:HttpClient
  ) { }

  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {
      "pagina":  this.pagina,
      "numFilas": this.numfilas,
      "ordenCol": this.ordenCol,
      "ordenTipo": this.ordenTipo,
      "paginacion":this.paginacion
    }

    const data:any = this.http.post(environment.urlServicios , JSON.stringify(request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }

  listarTodo(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {
      "profesional_id":this.profesional_id
    }
    const data:any = this.http.post(environment.urlServiciosPorProfesional ,request,{ headers:new HttpHeaders(seguro)});
    return data;
  }
}
