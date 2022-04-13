import { Component, OnInit,ViewChild } from '@angular/core';
import { EnfermedadesService } from 'src/app/servicios/ficha/enfermedades/enfermedades.service';
import { EnfermedadService } from 'src/app/servicios/ficha/enfermedades/enfermedad.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit {

  public closeResult  = "";
  @ViewChild('modalAgregarEnfermedad') modalAgregarEnfermedad!:NgbModal;
  public total_registros:any;
  public enfermedades:any = [];
  public nombre = "";
  public descripcion = "";
  public busqueda = "";

  constructor(
     public EnfermedadesService:EnfermedadesService,
     public EnfermedadService:EnfermedadService,
     private modalService:NgbModal

  ) {

  }

  ngOnInit(): void {
    this.cargarTabla();
  }


  cargarTabla(){
    this.EnfermedadesService.nombre = this.busqueda;
    this.EnfermedadesService.nombre = this.busqueda;
    this.EnfermedadesService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {

          this.total_registros = data.body.total_registros;
          this.enfermedades = data.body.enfermedades;

        } else {
          console.log('Error al cargar enfermedades ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al cargar enfermedades ' + JSON.stringify(err.statusText));
      }
    );
  }


  abrirModal(){
    this.nombre = "";
    this.descripcion = "";
    this.open(this.modalAgregarEnfermedad);
  }


  agregarEnfermedad(){

    this.EnfermedadService.nombre = this.nombre;
    this.EnfermedadService.descripcion = this.descripcion;

    this.EnfermedadService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
        this.modalService.dismissAll();
      }else{
        console.log("Error al agregar enfermedad" + data.message);
      }
    },(err:any)=>{
      console.log("Error al agregar enfermedad" + JSON.stringify(err.statusText));
    });
    this.cargarTabla();
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

  if(form.valid){
    this.agregarEnfermedad();
  }else{
    console.log("Formulario erroneo");
  }
}


}
