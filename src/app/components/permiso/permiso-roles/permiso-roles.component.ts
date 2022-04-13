import { Component, OnInit } from '@angular/core';
import { PermisoRolService } from 'src/app/servicios/permiso/permiso-rol/permiso-rol.service';

@Component({
  selector: 'app-permiso-roles',
  templateUrl: './permiso-roles.component.html',
  styleUrls: ['./permiso-roles.component.css']
})
export class PermisoRolesComponent implements OnInit {

  public permisos: any;

  constructor(private sprs: PermisoRolService) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.sprs.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
            this.permisos = data;

            console.log(data);
        } else {
          console.log('Error en el login ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

  public guardar(){

this.sprs.guardar(this.permisos).subscribe(
  (data: any) => {
    if (data.code == 0) {
        console.log(data);
    } else {
      console.log('Error en el login ' + data.message);
    }
  },
  (err: any) => {
    console.log('Error en el login ' + JSON.stringify(err.statusText));
  }
);
    console.log("permitido")

  }

}
