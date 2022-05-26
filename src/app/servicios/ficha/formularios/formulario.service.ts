import { HttpClient ,HttpClientModule, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  public requestTiposFormulario = {
    "paginacion":true,
    "pagina": 1,
    "numFilas": 10,
    "ordenCol": "id",
    "ordenTipo": "desc",
  }

  public  request =  {
    "pagina": 1,
    "numFilas": 10,
    "ordenCol": "id",
    "ordenTipo": "desc",
    "nombre": "",
    "organizacion_id":0
   }

  public requestCargarFormulario =  {
    "plantilla_formulario_id": 0,
    "almacen_dato_id":0
  };

  public requestFormulario =  {
    "plantillaFormulario": {
      "id": 0,
      "nombre":"",
      "descripcion":""
    },
    "camposFormulario": [ {
      "nombre":"",
      "posicion":0,
      "estado":1,
      "tipo_dato_formulario_id": 0,
      "tipo_dato":"",
      "tipo_dato_formulario": {
        "id": 0,
        "nombre": "",
        "lista_auxiliar": {"lista_auxiliar":[{}]},
        "tipo_dato": "",
        "referencia_table": null,
        "estado": 1
    }
    },
    ]
  }



  public requestFormularioDatos =  {

    "almacen_dato_id":0,
    "plantillaFormulario": {
      "id": 0,
      "nombre":"",
      "descripcion":"",
      "tipo_formulario_id":0
    },
    "camposFormulario": [ {
      "id_campo":0,
      "nombre":"",
      "posicion":0,
      "estado":1,
      "tipo_dato_formulario_id": 0,
      "tipo_dato":"",
      "tipo_dato_formulario": {
        "id": 0,
        "nombre": "",
        "lista_auxiliar":"",
        "_lista_auxiliar":{"lista_auxiliar":[{"nombre":""}]},
        "tipo_dato": "",
        "referencia_table": "",
        "estado": 1
    },
    "dato": {
      "id":0,
      "almacen_dato_id":0,
      "plantilla_formulario_dato_id":0,
      "valor":""
  }
    },
    ]
  }



  public id:number = 0;
  public posicion = 0;
  public tipo_dato_formulario_id:number = 0;

  constructor(private http:HttpClient) {
    this.requestFormulario.camposFormulario = [];
  }

  guardar(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let indice = 0;
    this.requestFormularioDatos.camposFormulario.forEach(item => {
          item.posicion =  indice;
          indice++
    });

    const data = this.http.post(environment.urlFormularioCrear,this.requestFormularioDatos,{headers:new HttpHeaders(seguro)});
    return data;

  }


  editar(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let indice = 0;
    this.requestFormularioDatos.camposFormulario.forEach(item => {
          item.posicion =  indice;
          indice++
    });

    const data = this.http.post(environment.urlFormularioEditar ,this.requestFormularioDatos ,{headers: new HttpHeaders(seguro)});
    return data;

  }


  listarPlantillas(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlFormularios ,this.request,{headers: new HttpHeaders(seguro)});
    return data;

  }


  cargarFormulario(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };
    const data = this.http.post(environment.urlCargarFormulario, this.requestCargarFormulario, {headers: new HttpHeaders(seguro)});
    return data;

  }



  guardarDatos(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlGuardarDatos ,this.requestFormularioDatos,{headers: new HttpHeaders(seguro)});
    return data;

  }


  tiposFormularios(){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data = this.http.post(environment.urlTiposFormulario,this.requestTiposFormulario, {headers: new HttpHeaders(seguro)});
    return data;

  }

  agregarTippFormulario(item:any){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {
      "tipo":item.tipo,
      "id":item.id
    }
    const data = this.http.post(environment.urlTipoFormulario ,request, {headers: new HttpHeaders(seguro)});
    return data;

  }

  eliminarTippFormulario(item:any){

    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    let request = {
      "id":item.id
    }
    const data = this.http.post(environment.urlEliminarTipoFormulario ,request, {headers: new HttpHeaders(seguro)});
    return data;

  }




}

