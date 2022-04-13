import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizacionService } from 'src/app/servicios/organizacion/organizacion.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-organizacion',
  templateUrl: './listado-organizacion.component.html',
  styleUrls: ['./listado-organizacion.component.css']
})
export class ListadoOrganizacionComponent implements OnInit {

  public organizacion: any;
  public organizacion_seleccionada: any;
  public id?: number;
  public nombre = '';
  public correo = '';
  public nombre_contacto = '';
  public close_result = "";

  @ViewChild("modalCrear") modalCrear!: NgbModal;
  @ViewChild("modalEdicion") modalEdicion!: NgbModal;

  constructor(public sos: OrganizacionService, private modalService: NgbModal) {
    this.sos.numfilas = 3;
    this.listar();
  }

  ngOnInit(): void {}

  open(content:any) {
    this.modalService.open( content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.close_result = `Closed with: ${result}`;
    });
  }

  public crearOrganizacion(){
    this.organizacion_seleccionada = {};
    this.open(this.modalCrear);
  }

  public editarOrganizacion(organizacion: any){
    this.organizacion_seleccionada = organizacion;
    this.open(this.modalEdicion);
  }

  public listar() {
    this.sos.id = this.id;
    this.sos.nombre = this.nombre;
    this.sos.correo = this.correo;
    this.sos.nombre_contacto = this.nombre_contacto;
    this.sos.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            this.organizacion = data.body;
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

  public crear(){
    this.sos.nombre = this.organizacion_seleccionada.nombre;
    this.sos.correo = this.organizacion_seleccionada.correo;
    this.sos.telefono = this.organizacion_seleccionada.telefono;
    this.sos.direccion = this.organizacion_seleccionada.direccion;
    this.sos.nombre_contacto = this.organizacion_seleccionada.nombre_contacto;
    this.sos.crear().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.organizacion_seleccionada = {};
          this.listar();
        } else {
          console.log('Error en la actualizacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la actualizacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

  public editar(){

    this.sos.id = this.organizacion_seleccionada.id;
    this.sos.nombre = this.organizacion_seleccionada.nombre;
    this.sos.correo = this.organizacion_seleccionada.correo;
    this.sos.telefono = this.organizacion_seleccionada.telefono;
    this.sos.direccion = this.organizacion_seleccionada.direccion;
    this.sos.nombre_contacto = this.organizacion_seleccionada.nombre_contacto;
    this.sos.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
        } else {
          console.log('Error en la actualizacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la actualizacion de datos ' + JSON.stringify(err.statusText));
      }
    );
  }

}
