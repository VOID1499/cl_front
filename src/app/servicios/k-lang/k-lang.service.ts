import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KLangService {

  constructor(private http: HttpClient) { }

  datos = {
    "lang": "es"
  }

  diccionario = [
    {
      "clave":"inicio de sesion",
      "texto":"Inicio de Sesión"
    },
    {
      "clave":"olvidaste tu contraseña",
      "texto":"Olvidaste tu contraseña?"
    },
    {
      "clave":"algo mas",
      "texto":"que es otra cosa"
    }

]

  obtener() {

    let seguro = environment.headerSimple;
    const ladata:any =  this.http.post(environment.urlDiccionario, JSON.stringify(this.datos), { headers: new HttpHeaders(seguro)} );
    return ladata;

  }

  obtenerDiccionario(){


    this.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          //response exitoso
           localStorage.setItem("diccionario", data.data)  ;
        } else {
          console.log('Error al cargar diccionario' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar fichas' + JSON.stringify(err.statusText));
      }
    );
  }


  st(texto:any) {
    //alert("funciona");
    return this.diccionario.find( dic => dic.clave == texto )?.texto;
    }



}

