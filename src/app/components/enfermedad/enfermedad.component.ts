import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnfermedadService } from 'src/app/servicios/ficha/enfermedades/enfermedad.service';


@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.css']
})
export class EnfermedadComponent implements OnInit {


  public closeResult = '';
  @ViewChild("modalEditarEnfermedad") modalEditarEnfermedad!: NgbModal;
  @Input() enfermedad:any;

  constructor(
    private modalService: NgbModal,
    private EnfermedadService:EnfermedadService
  ) { }

  ngOnInit(): void {
  }



  abrirModal(){
    this.open(this.modalEditarEnfermedad)
  }

  editarEnfermedad(){
    this.EnfermedadService.id = this.enfermedad.id;
    this.EnfermedadService.nombre = this.enfermedad.nombre;
    this.EnfermedadService.descripcion = this.enfermedad.descripcion;

    this.EnfermedadService.editar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
        this.modalService.dismissAll();
      }else{
        console.log("Error al editar enfermedad" + data.message);
      }
    },(err:any)=>{
      console.log("Error al editar enfermedad" + JSON.stringify(err.statusText));
    });
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
    this.editarEnfermedad();
  }else{
    console.log("Formulario erroneo");
  }
}

}
