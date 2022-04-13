import { Component, Input, OnInit, Output, EventEmitter ,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';
import { ReservaService } from 'src/app/servicios/clinica/reservas/reserva.service';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

public closeResult = "";
@ViewChild('modalDiasDisponibles') modalDiasDisponibles!:NgbModal;

@Output() reservaEmit = new EventEmitter<any>();
@Input() fecha:any;
@Input() reserva:any;
@Input() servicio_id:any;
@Input() pacientes:any;
public paciente_id = 0;



constructor(
  public ReservaService:ReservaService,
  private modalService:NgbModal,
  public ProfesionalesService:ProfesionalesService,
  private route: ActivatedRoute,
  private router: Router,
){

}
ngOnInit(): void {

}

seleccionPaciente(item:any){
  this.paciente_id = item.value;
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


crearReserva(item:any){
if(this.paciente_id == 0){
  console.log("seleccione un paciente");
}else{
    let request = {
      "paciente_id": this.paciente_id,
      "servicio_id": parseInt(this.servicio_id),
      "fecha": `${this.fecha} ${item.hora}`
  }

  this.ReservaService.request = request;
  this.ReservaService.crearReserva().subscribe((data:any)=>{
    if(data.code == 0){
      console.log(data.message);
      this.modalService.dismissAll();
      this.reservaEmit.emit(0);
    }if(data.code == 101){
      console.log(data.message);
      this.modalService.dismissAll();
      this.reservaEmit.emit(101);
    }
  },
  (err:any)=>{
    console.log('Error al registrar reserva ' + JSON.stringify(err.statusText));
  });

  }
}

eliminarReserva(item:any){

  Swal.fire({
    title: '¿Quieres cancelar esta reserva?',
    text: "La reserva quedara disponible para otro paciente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: "No",

  }).then((result) => {
    if (result.isConfirmed) {
      let request = {
        "paciente_id": item.usuario.id,
        "servicio_id": parseInt(this.servicio_id),
        "fecha": `${this.fecha} ${item.hora}`
    }
    this.ReservaService.request = request;
    this.ReservaService.eliminarReserva().subscribe((data:any) =>{
      if(data.code == 0){
        console.log(data.message);
        this.modalService.dismissAll();
        this.reservaEmit.emit(30);
      }
      if(data.code == 101){
        console.log(data.message);
        this.modalService.dismissAll();
        this.reservaEmit.emit(3101);

      }
      (err:any)=>{
        console.log('Error al eliminar reserva ' + JSON.stringify(err.statusText));
      }
    });
    }
  })



}


}
