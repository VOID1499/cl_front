import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { AgendaService } from 'src/app/servicios/clinica/profesionales/agenda.service';
import { Horario, ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import { ReservaService } from 'src/app/servicios/clinica/reservas/reserva.service';
import { FichasService } from 'src/app/servicios/ficha/fichas/fichas.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { BoxsHorariosComponent } from '../boxs-horarios/boxs-horarios.component';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AtencionComponent } from '../atencion/atencion.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {


  @ViewChild('modalReserva') modalReserva!:NgbModal;
  @ViewChild("modalFicha") modalFicha!: NgbModal;
  @ViewChild('atencion') atencion!:AtencionComponent;

  @Input() profesional_id = 1;
  public plantilla_formulario_id = 0;
  public almacen_dato_id = 0;
  public closeResult= "";
  public turnos:any[] = [];
  public DiasActivo:any[] = [];
  public fecha:any;
  public serviciosProfesional:any;
  public horario:any;
  public horariosServicios:any;
  public paciente_id = 0;
  public turno:any;
  public pacientes = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public atencionVacia =  {
    "id": 0,
    "ficha_id": 0,
    "almacen_dato_id": 0,
    "fecha": "",
    "plantilla_formulario_id": 0
  }


  constructor(
    private ReservasService:ReservasService,
    private AgendaService:AgendaService,
    private ServiciosServices:ServiciosService,
    public PacientesService:PacientesService,
    private modalService:NgbModal,
    public ReservaService:ReservaService,
    public FichasService:FichasService,

  ) {
    this.fecha = moment(this.fecha).format('YYYY-MM-DD');
   }

  ngOnInit(): void {
      this.listarPacientes();
      this.listarServiciosProfesional();
   }

   public ordenarTurnos(){

    this.DiasActivo = this.horariosServicios[0].DiasActivo;
    this.turnos = [];

    this.horariosServicios.forEach((servicio:any,servicio_i:any) => {
        servicio.HoraServicio.forEach((dia:any) => {
          dia.item.forEach((turno:any) => {
            turno['servicio_id'] = servicio.id;
            turno['servicio_index'] =servicio_i;
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

  abrirModalReserva(turno:any){
        this.turno = turno;
        this.open(this.modalReserva,'md')
  }


  pacienteSeleccionado(paciente:any){
    this.paciente_id = paciente.value;
  }

  crearReserva(){
    if(this.paciente_id == 0){
      console.log("seleccione un paciente");
    }else{
        let request = {
          "paciente_id": this.paciente_id,
          "servicio_id": this.turno.servicio_id,
          "fecha": `${this.turno.fecha} ${this.turno.hora}`
      }

      this.ReservaService.request = request;
      this.ReservaService.crearReserva().subscribe((data:any)=>{
        if(data.code == 0){
          console.log(data.message);
          this.modalService.dismissAll();
          this.exeRespuesta(0);
          this.paciente_id = 0;
          this.agendaProfesional();
        }if(data.code == 101){
          console.log(data.message);
          this.modalService.dismissAll();
         this.exeRespuesta(101)
        }
      },
      (err:any)=>{
        console.log('Error al registrar reserva ' + JSON.stringify(err.statusText));
      });

      }
    }

    eliminarReserva(){

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
            "paciente_id": this.turno.usuario.id,
            "servicio_id":this.turno.servicio_id,
            "fecha": `${this.turno.fecha} ${this.turno.hora}`
        }
        this.ReservaService.request = request;
        this.ReservaService.eliminarReserva().subscribe((data:any) =>{
          if(data.code == 0){
            console.log(data.message);
            this.modalService.dismissAll();
            this.exeRespuesta(30);
            this.agendaProfesional();
          }
          if(data.code == 101){
            console.log(data.message);
            this.modalService.dismissAll();
            this.exeRespuesta(3101);

          }
          (err:any)=>{
            console.log('Error al eliminar reserva ' + JSON.stringify(err.statusText));
          }
        });
        }
      })

    }


  open(content:any,size:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:size }).result.then((result) => {
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


  cargarFicha(kid:string){
    this.FichasService.kid = kid;
    this.FichasService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          //response exitoso
          if(data.body.total_registros == 0){
            //abre el modal para seleccionar un formulario y cargarlo sin datos
            //this.open(this.modalSeleccionFormulario);
          }else{
            //1-pasar el request para cargar el formulario
            //2-abirir el modal con el formulario

            this.almacen_dato_id  = data.body.fichas[0].almacen_dato_id;
            this.plantilla_formulario_id = data.body.fichas[0].plantilla_formulario_id;

            this.open(this.modalFicha,'xl');

          }

        } else {
          console.log('Error al cargar ficha del paciente' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar fichas' + JSON.stringify(err.statusText));
      }
    );
  }


  comenzarAtencion(kid:string,atencion:any){
    console.log('Comenzar atencion')
    this.FichasService.kid = kid;
    this.FichasService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          //response exitoso
          if(data.body.total_registros == 0){
            //abre el modal para seleccionar un formulario y cargarlo sin datos
            //this.open(this.modalSeleccionFormulario);
            this.almacen_dato_id  = 0;
            this.plantilla_formulario_id = 0;
            console.log('Paciente sin ficha');

          }else{

            this.atencionVacia.ficha_id  = data.body.fichas[0].id;
            this.atencion.open(this.atencion.modalSeleccionFormulario,'md')
        }

        } else {
          console.log('Error al cargar ficha del paciente' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar fichas' + JSON.stringify(err.statusText));
      }
    );

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
