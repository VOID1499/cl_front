import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KLangService } from 'src/app/servicios/k-lang/k-lang.service';
import { LoginService } from 'src/app/servicios/login/logeo/login.service';
import { OrganizacionService } from 'src/app/servicios/organizacion/organizacion.service';

@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.css']
})
export class LogeoComponent implements OnInit {

  public organizacion =  { "body": {
    "organizacion": [
        {
            "id": 1,
            "nombre": "Primera Organizacion",
            "correo": "contactoeditado@organizacionprueba.cl",
            "telefono": "0303456",
            "direccion": "prueba editada 1900",
            "nombre_contacto": "NN",
            "created_at": "2021-11-10T21:57:31.000000Z",
            "updated_at": "2021-12-10T14:45:50.000000Z"
        }
    ],
    "pagina_actual": 1,
    "total_paginas": 2,
    "numero_filas": 3,
    "total_registros": 6
}
}


  public email?: string;
  public password?: string;
  public organizacion_id?  = 0;

  @Output() propagar = new EventEmitter<string>();

  constructor(
    private router: Router,
    private sls: LoginService,
    private sos: OrganizacionService,
    public dic:KLangService) {
      this.obtenerOrganizacion();
     // this.dic.obtenerDiccionario("es");
    }

  ngOnInit(): void {

  }




  public logear() {
    console.log(this.organizacion_id);
    this.sls.email = this.email;
    this.sls.password = this.password;
    this.sls.organizacion_id = this.organizacion_id;

    this.sls.logear().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            console.log(data);

            localStorage.setItem(
              'TK',
              data.token_type + ' ' + data.access_token
            );
            localStorage.setItem('KT', data.K_Authorization);

            this.router.navigate(['home']);
          }
        } else {
          console.log('Error en el login ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

  public obtenerOrganizacion(){

    this.sos.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            this.organizacion = data;
          }
        } else {
          console.log('Error Obtener Organizacion' + data.message);
        }
      },
      (err: any) => {
        console.log('Error Obtener Organizacion' + JSON.stringify(err.statusText));
      }
    );
  }

  public recuperar(){

    this.propagar.emit("recuperar");
  }

  public registro(){

    this.propagar.emit("registrar");
  }
}
