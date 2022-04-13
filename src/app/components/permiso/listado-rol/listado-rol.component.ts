import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PermisoRolService } from 'src/app/servicios/permiso/permiso-rol/permiso-rol.service';
import { RolService } from 'src/app/servicios/permiso/rol/rol.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-rol',
  templateUrl: './listado-rol.component.html',
  styleUrls: ['./listado-rol.component.css'],
})
export class ListadoRolComponent implements OnInit {

  @Output() propagar = new EventEmitter<string>();
  public rol?: any;
  closeResult = '';
  public busqueda = '';
  public rolSeleccionado: any;
  @ViewChild("modalCrear") modalCrear!: NgbModal;
  @ViewChild("modalEdicion") modalEdicion!: NgbModal;

  constructor(public srs: RolService, private modalService: NgbModal, private sprs: PermisoRolService) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.srs.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            this.rol = data.body;
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

  open(content:any) {
    this.modalService.open( content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  public crearRol(){
    this.rolSeleccionado = {};
    this.open(this.modalCrear);
  }

  public editarRol(rol: any){
    this.rolSeleccionado = rol;
    this.open(this.modalEdicion);
  }

  public editarPermiso(role_id: any){

    this.sprs.role_id = role_id;

    this.propagar.emit("editar");
  }

  public editar(){

    this.srs.id = this.rolSeleccionado.id;
    this.srs.nombre = this.rolSeleccionado.nombre;
    this.srs.descripcion = this.rolSeleccionado.descripcion;

    this.srs.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
        } else {
          console.log('Error en la actualizacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la actualizacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

  public crear(){

    this.srs.nombre = this.rolSeleccionado.nombre;
    this.srs.descripcion = this.rolSeleccionado.descripcion;

    this.srs.crear().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
        } else {
          console.log('Error en la actualizacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la actualizacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

}
