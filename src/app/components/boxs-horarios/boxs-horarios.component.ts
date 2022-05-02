import { Component, OnInit ,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';
import { BoxsService } from 'src/app/servicios/clinica/boxs/boxs.service';



@Component({
  selector: 'app-boxs-horarios',
  templateUrl: './boxs-horarios.component.html',
  styleUrls: ['./boxs-horarios.component.css']
})
export class BoxsHorariosComponent implements OnInit {

  @ViewChild("modalHorarioBox") modalHorarioBox!: NgbModal;

  public closeResult = "";
  public horario:any[] = [];
  public boxs:any[] = [];
  public box_id = 0;


  constructor(
    private modalService:NgbModal,
    private BoxService:BoxService,
    private BoxsService:BoxsService
  ) { }

  ngOnInit(): void {
    this.listarBoxs();
  }


  listarBoxs(){

    this.BoxsService.request.paginacion = false;
    this.BoxsService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.boxs = data.body.boxs;

        } else {
          console.log('Error al cargar lista de boxs ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al cargar lista de boxs ' + JSON.stringify(err.statusText));
      }
    );
  }



  horarioBox(){

    this.BoxService.request = {
      "box_id":this.box_id
    }

    this.BoxService.horarioBox().subscribe((data:any)=>{
      if (data.code == 0) {
        this.horario = data.body.horario;
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
