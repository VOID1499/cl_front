import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { TipoProfesionalesService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesionales.service';
import { TipoProfesionalService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesional.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tipo-profesionales',
  templateUrl: './tipo-profesionales.component.html',
  styleUrls: ['./tipo-profesionales.component.css']
})
export class TipoProfesionalesComponent implements OnInit {

  public closeResult = "";
  @ViewChild('modalAgregarTipoProfesional') modalAgregarTipoProfesional!:NgbModal;
  public tipo = "";
  public total_registros:any;
  public tipoProfesionales:any = [];


  ngOnInit(): void {
    this.cargarTabla();
  }


  constructor(
    public TipoProfesionalesService:TipoProfesionalesService,
    public TipoProfesionalService:TipoProfesionalService,
    private modalService:NgbModal
    ){

    }


    cargarTabla(){
      this.TipoProfesionalesService.paginacion = true;
      this.TipoProfesionalesService.obtener().subscribe(
        (data: any) => {
          if (data.code == 0) {
            this.tipoProfesionales = data.body.tipo_profesional;
            this.total_registros = data.body.total_registros;
          } else {
            console.log('Error al cargar tipos de profesionales' + data.message);
          }
        },
        (err: any) => {
          console.log('Error al cargar tipos de profesionales' + JSON.stringify(err.statusText));
        }
      );
    }

    abrirModal(){
      this.tipo = "";
      this.open(this.modalAgregarTipoProfesional);
    }

    agregarTipoProfesional(){

      this.TipoProfesionalService.nombre = this.tipo;

      this.TipoProfesionalService.guardar().subscribe((data:any)=>{
        if(data.code == 0){
          console.log(data.message);
        }else{
          console.log("Error al agregar tipo de profesional" + data.message);
        }
      },(err:any)=>{
        console.log("Error al agregar tipo de profesional" + JSON.stringify(err.statusText));
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
        this.agregarTipoProfesional();
        this.modalService.dismissAll();
      }else{
        console.log("Formulario erroneo")
      }
    }

}
