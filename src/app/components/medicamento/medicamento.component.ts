import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VademecumService } from 'src/app/servicios/ficha/vademecums/vademecum.service';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {

  public closeResult = '';
  @ViewChild("modalEditarMedicamento") modalEditarMedicamento!: NgbModal;
  @Input() medicamento:any;

  constructor(
    private modalService: NgbModal,
    private VademecumService:VademecumService
  ) { }

  ngOnInit(): void {
  }



  abrirModal(){
    this.open(this.modalEditarMedicamento)
  }

  editarMedicamento(){
    this.VademecumService.id = this.medicamento.id;
    this.VademecumService.nombre = this.medicamento.nombre;
    this.VademecumService.descripcion = this.medicamento.descripcion;

    this.VademecumService.editar().subscribe((data:any)=>{
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
      this.editarMedicamento();
    }else{
      console.log("Formulario erroneo");
    }
  }

}
