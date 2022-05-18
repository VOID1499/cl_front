import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/clinica/profesionales/agenda.service';
import { Horario, ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { BoxsHorariosComponent } from '../boxs-horarios/boxs-horarios.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() profesional_id = 1;
  public turnos:any[] = [];
  public DiasActivo:any[] = [];
  public fecha:any;
  public serviciosProfesional:any;
  public horario:any;
  public horariosServicios:any;
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

  ) {
    this.fecha = moment(this.fecha).format('YYYY-MM-DD');
   }

  ngOnInit(): void {
      this.listarPacientes();
      this.listarServiciosProfesional();
   }

   public ordenarTurnos(){

    this.DiasActivo = this.horariosServicios[0].DiasActivo;
    console.log(this.DiasActivo)

    this.horariosServicios.forEach((servicio:any) => {
        servicio.HoraServicio.forEach((dia:any) => {
          dia.item.forEach((turno:any) => {
            turno['servicio_id'] = servicio.id;
            turno['servicio_nombre'] = servicio.nombre;
            turno['fecha'] = dia.fecha;
            this.turnos.push(turno)
          });
        });
    });


    this.turnos.sort(function (a, b) {
      if (a.hora > b.hora) {
        return 1;
      }
      if (a.hora < b.hora) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });


   }



public listarServiciosProfesional(){
  this.ServiciosServices.profesional_id = this.profesional_id;
  this.ServiciosServices.listarTodo().subscribe(
    (data: any) => {
      if (data.code == 0) {
      this.serviciosProfesional = data.servicios;
      this.agendaProfesional();
      } else {
        console.log( data.message);
      }
    },
    (err: any) => {
      console.log( JSON.stringify(err.statusText));
    }
  );
}


  sumarRestarFecha(z:number){
    if(z == 1){
      this.fecha = moment(this.fecha).add(7,'d');
      this.agendaProfesional();

    }
    if(z == 0){
      this.fecha = moment(this.fecha).subtract(7,'d');
      this.agendaProfesional();

    }

  }


  agendaProfesional(){

    this.horariosServicios = [];
          this.serviciosProfesional.forEach((servicio:any,index:any) => {
            this.ReservasService.request = {
                "servicio_id":servicio.id,
                "fecha":this.fecha,
                "cantidad_dias":7
            }
            this.ReservasService.obtener().subscribe(
                (data: any) => {
                  if (data.code == 0) {

                  this.horariosServicios.push(data.body);


                  if(this.serviciosProfesional.length-1 == index){
                    this.ordenarTurnos();
                  }

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
