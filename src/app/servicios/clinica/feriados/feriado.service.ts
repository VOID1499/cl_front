import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {

    public showEditar:boolean = false;
    public showAgregar:boolean = false;
    public id:number = 0;
    public nombre:string = "";
    public dia:number = 0;
    public mes:number = 0;
    public estado:number = 0;

  constructor(private http:HttpClient) { }

  guardar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "nombre":this.nombre,
      "dia": this.dia,
      "mes": this.mes,
      "estado": this.estado,
    }
    
    const data = this.http.post(environment.urlFeriado ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }



  editar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request =  {

      "id": this.id,
      "nombre":this.nombre,
      "dia": this.dia,
      "mes": this.mes,
      "estado": this.estado,
    }
    
    const data = this.http.put(environment.urlFeriado ,request,{headers: new HttpHeaders(seguro)});
    return data;
  }
}
