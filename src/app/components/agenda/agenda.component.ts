import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/clinica/profesionales/agenda.service';
import { ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() profesional_id = 1;
  public serviciosProfesional:any;
  public horariosServicios:any[]= [];
  public pacientes = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];


  constructor(
    private ReservasService:ReservasService,
    private AgendaService:AgendaService,
    private ServiciosServices:ServiciosService,
    public PacientesService:PacientesService,
  ) { }

  ngOnInit(): void {
      this.listarPacientes();
      this.listarServiciosProfesional();
   }

   public mostrar(){

    this.agendaProfesional();


  }





public listarServiciosProfesional(){
  this.ServiciosServices.profesional_id = this.profesional_id;
  this.ServiciosServices.listarTodo().subscribe(
    (data: any) => {
      if (data.code == 0) {
      this.serviciosProfesional = data.servicios;
      } else {
        console.log( data.message);
      }
    },
    (err: any) => {
      console.log( JSON.stringify(err.statusText));
    }
  );
}


  agendaProfesional(){
          this.serviciosProfesional.forEach((servicio:any) => {
            this.ReservasService.request = {
                "servicio_id":servicio.id,
                "fecha_inicio":"2022-05-11",
                "cantidad_dias":7
            }
            this.ReservasService.obtener().subscribe(
                (data: any) => {
                  if (data.code == 0) {
                  this.horariosServicios.push(data.body);
                  console.log(this.horariosServicios);
                  } else {
                    console.log( data.message);
                  }
                },
                (err: any) => {
                  console.log( JSON.stringify(err.statusText));
                }
              );
        });

  }


  listarPacientes(){

    this.PacientesService.listarTodo().subscribe(
      (data:any)=>{
        if (data.code == 0) {
          this.pacientes = data.pacientes.map(function(element:any) {
            return {'value' :element.id,'name' : `${element.nombre} ${element.apellido_paterno} ${element.rut}`,'ver'!:true}
          });
        } else {
          console.log('Error al listar pacientes' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar pacientes' + JSON.stringify(err.statusText));
      });
  }


  exeRespuesta(event:any){

      switch (event) {
          case 0:
            Swal.fire({
              icon: 'success',
              title: 'Reserva creada',
              text: '',
            })
            break;
          case 101:
              Swal.fire({
                icon: 'error',
                title: 'Error al crear reserva!',
                text: 'Reserva no disponible',
              })
            break;
            case 30:
              Swal.fire({
                icon: 'success',
                title: 'Reserva eliminada',
                text: '',
              })
              break;

            case 3101:
                Swal.fire({
                  icon: 'error',
                  title: 'Error al eliminar!',
                  text: 'La reserva ya fue eliminada por otro usuario',
                })
              break;
      }
  }





}
