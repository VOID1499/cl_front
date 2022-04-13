import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { TipoProfesionalService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesional.service';
import { TipoProfesionalesService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesionales.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tipo-profesional',
  templateUrl: './tipo-profesional.component.html',
  styleUrls: ['./tipo-profesional.component.css']
})
export class TipoProfesionalComponent implements OnInit {

  public closeResult = "";
  @ViewChild('modalEditarTipoProfesional') modalEditarTipoProfesional!:NgbModal;
  @Input() tipo_profesional:any;

  constructor(
    public TipoProfesionalService:TipoProfesionalService,
    private modalService:NgbModal
    ) { }

  ngOnInit(): void {
  }

  abrirModal(){
    this.open(this.modalEditarTipoProfesional);
  }

  editarTipoProfesional(){

    this.TipoProfesionalService.id = this.tipo_profesional.id;
    this.TipoProfesionalService.nombre = this.tipo_profesional.tipo;

    this.TipoProfesionalService.editar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }else{
        console.log("Error al editar tipo de profesional" + data.message);
      }
    },(err:any)=>{
      console.log("Error al ediar tipo de profesional" + JSON.stringify(err.statusText));
    });

  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.editarTipoProfesional();
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
      this.editarTipoProfesional();
      this.modalService.dismissAll();
    }else{
      console.log("Formulario erroneo")
    }
  }


}
