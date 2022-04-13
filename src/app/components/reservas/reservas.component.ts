import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import { EspecialidadesService } from 'src/app/servicios/clinica/especialidades/especialidades.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {


  @Input() servicio_id = undefined;
  @Input() fecha:any;
  @Input() reserva:any;
  @Input() paciente_id:any = 0;
  public especialidad_id = 0;
  public profesional_id = 0;


  public especialidades = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public profesionales = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public servicios = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public pacientes = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public reservas = {
    "id": 0,
    "profesional_id": 0,
    "nombre": "",
    "estado": 1,
    "tiempo": 30,
    "DiasActivo": [
      "0000-00-00",
    ],
    "HoraServicio":
          [
            {
            "item": [
                {
                    "reserva": false,
                    "hora": "12:00",
                    "horaFin": "12:30",
                    "usuario": "libre",
                    "dia": 1
                }
            ],
            "fecha": "",
            "reservaTotal": 0,
            "reservados": 0,
            "disponible": 0
        },
          ],
          "CantidadHorasDiaria": 0,

  }

  constructor(
    public ReservasServices:ReservasService,
    public ProfesionalesService:ProfesionalesService,
    public ServiciosService:ServiciosService,
    public PacientesService:PacientesService,
    public EspecialidadesService:EspecialidadesService
    ){}

  ngOnInit(): void {


    this.listarEspecialidades();
    this.listarProfesionales();
    this.listarServicios();
    this.listarPacientes();
    //cancelar peticion si no esta el servicio id
    this.cargarReservas();
  }

  sumarRestarMes(x:number){
    if(x == 1){
      this.fecha = moment(this.fecha).add({months:1});
      this.cargarReservas();
    }
    if(x == 0){
      this.fecha = moment(this.fecha).subtract({months:1});
      this.cargarReservas();
    }

  }


  seleccionEspecialidad(item:any){
    this.especialidad_id = item.value;
    this.ProfesionalesService.especialidad_id = this.especialidad_id;
    this.listarProfesionales();
  }

  seleccionProfesional(item:any){
    this.profesional_id = item.value;
    this.ServiciosService.profesional_id = this.profesional_id;
    this.listarServicios();
  }

  seleccionServicio(item:any){
    this.servicio_id = item.value;
  }


  cargarReservas(){
    if(this.fecha == undefined){
      this.fecha = moment(this.fecha).format('YYYY-MM-DD');
    }
      this.ReservasServices.request = {
        'servicio_id':this.servicio_id,
        'fecha':this.fecha
      }

      if(this.servicio_id == undefined){
        console.log('Servicio no selccionado o ruta sin parametros')
      }else{
        this.ReservasServices.obtener().subscribe((data:any)=>{
          if(data.code == 0){
            this.reservas = data.body;
          }
        },(err:any)=>{

        });
      }

  }

  listarProfesionales(){
    this.ProfesionalesService.listarTodo().subscribe((data:any)=>{
      if (data.code == 0) {
        this.profesionales = data.profesionales.map(function(element:any) {
          return {'value' :element.id,'name' :element.nombre +' '+ element.apellido_paterno+' '+element.apellido_materno,'ver'!:true}
        });
      } else {
        console.log('Error al listar profesionales ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al listar profesionales ' + JSON.stringify(err.statusText));
    });
  }

  listarServicios(){
    this.ServiciosService.listarTodo().subscribe(
      (data:any)=>{
        if (data.code == 0) {
          this.servicios = data.servicios.map(function(element:any) {
            return {'value' :element.id,'name' :element.nombre,'ver'!: true}
          });
        } else {
          console.log('Error al listar servicios' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar servicios' + JSON.stringify(err.statusText));
      });
  }


  listarEspecialidades(){
    this.EspecialidadesService.paginacion  = false;
    this.EspecialidadesService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.especialidades = data.body.especialidad.map(function(element:any) {
            return {'value' :element.id,'name' : element.nombre,'ver' !:true}
          });
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
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


  resetearFiltros(){
    this.especialidad_id = 0;
    this.ProfesionalesService.especialidad_id = this.especialidad_id;
    this.listarProfesionales();

    this.profesionales = [ {
      'value' : "1",
      'name' : "",
      'ver' !: false,
    }];

    this.profesional_id = 0;
    this.ServiciosService.profesional_id = this.profesional_id;
    this.listarServicios();
  }

  exeRespuesta(event:any){

    this.cargarReservas();
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
