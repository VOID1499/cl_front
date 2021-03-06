import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() box:any;
  @ViewChild("modalBox") modalBox!: NgbModal;
  @ViewChild("modalHorarioBox") modalHorarioBox!: NgbModal;
  public closeResult = "";
  public horario:any;
  public servicios:any[] = [];
  public servicioSeleccionado:any;

  constructor(
    private BoxService:BoxService,
    private modalService: NgbModal,
    private ServiciosService:ServiciosService
  ) { }

  ngOnInit(): void {
    this.listarServicios();
  }


  guardar(){
    if(this.box.id != 0){
      this.editarBox();
    }else{
      this.crearBox();
    }

  }

  crearBox(){
    this.BoxService.request = this.box;
    this.BoxService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }
    }
    ,(err:any)=>{
      console.log('Error al crar box '+ JSON.stringify(err.statusText));
    });
  }

  editarBox(){

    console.log(this.box);
    this.BoxService.request = this.box;
    this.BoxService.editar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }
    }
    ,(err:any)=>{
      console.log('Error al editar box '+ JSON.stringify(err.statusText));
    });

  }



  listarServicios(){
    this.ServiciosService.paginacion = false;
    this.ServiciosService.obtener().subscribe(
      (data:any)=>{
        if (data.code == 0) {
          this.servicios = data.body.servicios;
        } else {
          console.log('Error al listar servicios' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar servicios' + JSON.stringify(err.statusText));
      });

  }

  horarioBox(){

    this.BoxService.request = {
      "box_id":this.box.id
    }

    this.BoxService.horarioBox().subscribe((data:any)=>{
      if (data.code == 0) {
        this.horario = data.body.horario;
        console.log(this.horario)
        this.open(this.modalHorarioBox,'xl')
      } else {
        console.log('Error al consultar disponibles' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });

  }





  open(content:any ,size:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:size}).result.then((result) => {
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




}
