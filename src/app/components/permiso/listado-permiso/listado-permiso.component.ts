import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PermisoService } from 'src/app/servicios/permiso/permiso.service';

@Component({
  selector: 'app-listado-permiso',
  templateUrl: './listado-permiso.component.html',
  styleUrls: ['./listado-permiso.component.css']
})
export class ListadoPermisoComponent implements OnInit {

  public permiso?: any;
  closeResult = '';
  public busqueda = '';
  public permisoSeleccionado: any;
  @ViewChild("modalCrear") modalCrear!: NgbModal;
  @ViewChild("modalEdicion") modalEdicion!: NgbModal;

  constructor(public sps: PermisoService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.sps.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            this.permiso = data.body;
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

  public crearPermiso(){
    this.permisoSeleccionado = {};
    this.open(this.modalCrear);
  }

  public editarPermiso(permiso: any){
    this.permisoSeleccionado = permiso;
    this.open(this.modalEdicion);
  }

  public editar(){

    this.sps.id = this.permisoSeleccionado.id;
    this.sps.nombre = this.permisoSeleccionado.nombre;

    this.sps.editar().subscribe(
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

    this.sps.nombre = this.permisoSeleccionado.nombre;

    this.sps.crear().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.listar();
        } else {
          console.log('Error en la creacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la creacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

}
