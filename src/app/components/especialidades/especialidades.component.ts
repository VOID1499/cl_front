import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { EspecialidadService } from 'src/app/servicios/clinica/especialidades/especialidad.service';
import { EspecialidadesService } from 'src/app/servicios/clinica/especialidades/especialidades.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  @ViewChild("modalGuardar") modalGuardar!: NgbModal;

  public especialidades:any = [];
  public closeResult = "";
  public busqueda = '';
  public nombre = '';
  public id =  0;
  public nombreModal = "Sin nombre";

  constructor(
    private modalService: NgbModal,
    public especialidadesService:EspecialidadesService,
    public especialidadService:EspecialidadService,
   ) {
    this.especialidadesService.numfilas = 3;
    this.cargarTabla();

  }


  ngOnInit(): void {

  }


  cargarTabla(){

    this.especialidadesService.paginacion  = true;
    this.especialidadesService.nombre = this.busqueda;
    this.especialidadesService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.especialidades = data.body;
          console.log(data.message,data.body);
          // this.router.navigate(['cambioClave']);
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );

  }


  abrirModal( nombre = "", id = 0 ) {

    if (nombre != "") {

      this.nombreModal = "Editar Especialidad " + nombre;
      this.nombre = nombre
      this.id = id;

    }  else {

      this.nombreModal = "Guardar Especialidad ";
      this.nombre= "";
      this.id = 0;

    }
    this.open(this.modalGuardar);

  }


  public guardar() {

    this.especialidadService.nombre = this.nombre;

    this.especialidadService.guardar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.nombre = "";
          this.cargarTabla();
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }


  public editar() {
    this.especialidadService.nombre = this.nombre;
    this.especialidadService.id = this.id;
    this.especialidadService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.nombre = "";
          this.cargarTabla();
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  validarCampos(form:any){
    if(form.valid) {
      if (this.id == 0 ) {
        this.guardar();
        } else {
        this.editar();
        }
      this.modalService.dismissAll();
      }else{
        console.log("Formulario erroneo");
      }
    }


}
