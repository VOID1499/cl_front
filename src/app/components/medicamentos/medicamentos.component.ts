import { Component, OnInit,ViewChild } from '@angular/core';
import { VademecumsService } from 'src/app/servicios/ficha/vademecums/vademecums.service';
import { VademecumService } from 'src/app/servicios/ficha/vademecums/vademecum.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {

  public closeResult  = "";
  @ViewChild('modalAgregarMedicamento') modalAgregarMedicamento!:NgbModal;
  public total_registros:any;
  public medicamentos:any = [];
  public nombre = "";
  public descripcion = "";
  public busqueda = "";

  constructor(
    private modalService:NgbModal,
    public VademecumsService:VademecumsService,
    public VademecumService:VademecumService,
  ) { }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(){
    this.VademecumsService.nombre = this.busqueda;
    this.VademecumsService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
         this.total_registros = data.body.total_registros;
         this.medicamentos = data.body.medicamentos;

        } else {
          console.log('Error al cargar medicamentos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al cargar medicamentos ' + JSON.stringify(err.statusText));
      }
    );
  }

  abrirModal(){
    this.nombre = "";
    this.descripcion = "";
    this.open(this.modalAgregarMedicamento);
  }

  agregarMedicamento(){
    this.VademecumService.nombre = this.nombre;
    this.VademecumService.descripcion = this.descripcion;

    this.VademecumService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
        this.modalService.dismissAll();
      }else{
        console.log("Error al agregar medicamento" + data.message);
      }
    },(err:any)=>{
      console.log("Error al agregar medicamento" + JSON.stringify(err.statusText));
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
      this.agregarMedicamento();
    }else{
      console.log("Formulario erroneo");
    }
  }

}
