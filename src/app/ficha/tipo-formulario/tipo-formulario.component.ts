import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';

@Component({
  selector: 'app-tipo-formulario',
  templateUrl: './tipo-formulario.component.html',
  styleUrls: ['./tipo-formulario.component.css']
})
export class TipoFormularioComponent implements OnInit {

  @ViewChild('modalTipoFormulario') modalTipoFormulario!:NgbModal;
  @Output() emitir = new EventEmitter<string>();
  @Input() item =  {
    "id": 0,
    "created_at": null,
    "updated_at": null,
    "tipo": ""
  }

  public closeResult = "";

  constructor(
    private modalService:NgbModal,
    public FormularioService:FormularioService
  ) { }

  ngOnInit(): void {
  }



  open(content:any,size:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: size}).result.then((result) => {
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


  agregarTipoFormulario(){

    this.FormularioService.agregarTippFormulario(this.item).subscribe((data:any)=>{
      if(data.code ==0){
        console.log(data.message);
      }else{
        console.log('Error al crear tipo de formulario');
      }

    },(err:any)=>{
      console.log('Error al crear tipo de formulario' +JSON.stringify(err.error.message));
    })
  }


  validarCampos(form:any){
    if(form.valid) {
      console.log(this.item)
      this.agregarTipoFormulario();
      this.modalService.dismissAll();
      this.emitir.emit('Cambios guardados');
      this.item.tipo = "";
      }else{
        console.log("Formulario erroneo");
      }
    }

    eliminar(){

      this.FormularioService.eliminarTippFormulario(this.item).subscribe((data:any)=>{
        if(data.code == 0){
          console.log(data.message)
          this.emitir.emit('Cambios guardados');
        }

        },(err:any)=>{
          console.log('No se puede eliminar ' , err.statusText);
          this.emitir.emit('No se puede eliminar');
        })
    }


}
