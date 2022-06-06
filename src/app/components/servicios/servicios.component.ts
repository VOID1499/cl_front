import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ServicioService } from 'src/app/servicios/clinica/serviciosClinica/servicio.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { FeriadosService } from 'src/app/servicios/clinica/feriados/feriados.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  @ViewChild('modalAgregarServicio') modalAgregarServicio!:NgbModal;

  public diaMalAsignado = "";
  public duracionServicio = {hour: 0, minute: 0};
  public profesionalSeleccionadoNombre ="";
  public paso:number = 1;
  public data:any;
  public total_registros:any;
  public servicios:any[] = []
  public feriados:any = [];
  public profesionales = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  public horarioValido = true;
  public alert = {
    "estado":false,
    "mensaje":""
  }
  public closeResult = "";
  public servicio =  {
    "id": 0,
    "profesional_id": 0,
    "nombre":"",
    "descripcion":"",
    "estado": 1,
    "tiempo": 0,
    "precio":0.00,
    "comision":0.00,

    "horarios":[
      {
      "id":0,
      "dia_id":1,
      "estado":1,
      "hora_i":"",
      "hora_f":"",
      "atenciones":0,
      "minutosTotales":0,
      "hora_inicio":{"hour":0,"minute": 0,"second": 0},
      "hora_fin":{"hour":0,"minute": 0,"second": 0},
      "box_id":0,
      "nombre":"",
      "boxs_disponibles":[{"id":0,"nombre":"Seleccione dia y horarios"}]
      }
    ],

      "profesionalesExtra":[{
        "nombre":"",
        "profesional_id":0
      }],

      "feriadosNoTrabajados":[]
  }
  public servicioVacio = this.servicio;

  public model: NgbDateStruct | undefined;
  datePickerJson = {};
  public markDisabled:any;
  public json = {
    disable: [6, 7],
    disabledDates: [
      { year: 2022, month: 3, day: 1 },
      { year: 2022, month: 3, day: 2 },
      { year: 2022, month: 3, day: 3 }
    ]
  };
  public isDisabled:any;

  constructor(
    public ServiciosService:ServiciosService,
    public ProfesionalesService:ProfesionalesService,
    private modalService:NgbModal,
    public ServicioService:ServicioService,
    private config: NgbTimepickerConfig,
    public FeriadosService:FeriadosService,
    private calendar: NgbCalendar,
    private BoxService:BoxService
  ){

    config.seconds = false;
    config.spinners = false;
   }


  ngOnInit(): void {
    this.cargarTabla();
    this.cargarFeriados();
    this.listarProfesionales();

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  cargarTabla(){

    this.ServiciosService.paginacion = true;
    this.ServiciosService.obtener().subscribe(
      (data:any)=>{
        if (data.code == 0) {


          this.servicios = data.body.servicios;
          console.log(data.body)

          //formatear los horarios
          this.servicios.forEach((element:any) => {

            element.horarios.forEach((element:any) => {
              element.hora_inicio = {"hour": parseInt(element.hora_inicio.slice(0,2)),"minute": parseInt(element.hora_inicio.slice(3,5))};
              element.hora_fin ={"hour": parseInt(element.hora_fin.slice(0,2)),"minute": parseInt(element.hora_fin.slice(3,5))};
            });

          });

          this.total_registros = data.body.total_registros;

        } else {
          console.log('Error al listar servicios' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar servicios' + JSON.stringify(err.statusText));
      });


  }

  cargarFeriados(){
    this.FeriadosService.paginacion = false;
    this.FeriadosService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.feriados= data.body.feriado.map((element:any)=> {
            element = {
              "id":element.id,
              "estado":false,
              "nombre":element.nombre,
              "dia":element.dia,
              "mes":element.mes
            }
            return element;
         });

      this.deshabilitarDias();


        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

  listarProfesionales(){

    this.ProfesionalesService.listarTodo().subscribe((data:any)=>{
      if (data.code == 0) {

        this.profesionales = data.profesionales.map(function(element:any) {
          return {'value' :element.id,'name' :element.nombre +' '+ element.apellido_paterno+' '+element.apellido_materno,'ver'!:true}
        });

      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });
  }

  seleccionProfesional(item:any){
    this.profesionalSeleccionadoNombre = item.name;
    this.servicio.profesional_id = item.value;
  }



  profesionalExtra(item?:any,i?:any){

    if(i == undefined){
      this.servicio.profesionalesExtra.push({"profesional_id":0,"nombre":""})
    }else{
      this.servicio.profesionalesExtra[i]['profesional_id'] = item.value;
      this.servicio.profesionalesExtra[i]['nombre'] = item.name;
      console.log(this.servicio.profesionalesExtra);
    }
  }



  siguientePaso(){

      this.paso += 1;

  }

  anteriorPaso(){
    this.paso -= 1;
  }

  open(content:any,size:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: size}).result.then((result) => {
      this.crearServicio();
      this.cargarTabla();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.servicio.profesional_id = 0;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.servicio.profesional_id = 0;

      return 'by clicking on a backdrop';
    } else {
      this.servicio.profesional_id = 0;
      return `with: ${reason}`;
    }
  }

  crearServicio(){


    this.formatearHoras();
    this.horaMinutos();
    this.asignarFeriadosNoTrabajados();
    this.ServicioService.request = this.servicio;
    this.ServicioService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
        Swal.fire(
          'Good job!',
          'Servicio creado!',
          'success'
        )
        this.cargarTabla();
      }else{
        console.log('Error al crear servicio' + data.message);
      }
    },
    (err:any)=>{
      console.log('Error al crear' + JSON.stringify(err.statusText));
    })

  }

agregarEliminarHorario(i?:number){

  if(i == undefined){
    //agregar


    this.servicio.horarios.push(
      {
      "id":0,
      "dia_id":1,
      "hora_i":"",
      "hora_f":"",
      "box_id":0,
      "nombre":"",
      "atenciones":0,
      "minutosTotales":0,
      "boxs_disponibles":[{"id":0,"nombre":"Seleccione dia y horarios"}],
      "hora_inicio":{
        "hour": 0,
        "minute": 0,
        "second": 0,
      },
      "hora_fin":{
        "hour": 0,
        "minute": 0,
        "second": 0
      },
      "estado":1
      }
    );


  }else{

    //eiminar
    this.servicio.horarios.splice(i,1);
  }
}

//formatear horas {hour:0,minute:0} a 00:00:00 para la base de datos
formatearHoras(){
  this.servicio.horarios.forEach((element:any)=>{
    element.hora_i =  `${element.hora_inicio.hour}:${element.hora_inicio.minute}:00`
    element.hora_f =  `${element.hora_fin.hour}:${element.hora_fin.minute}:00`
  });

}

//signar array de solo feriados seleccionados en estado true
asignarFeriadosNoTrabajados(){
  this.servicio.feriadosNoTrabajados = this.feriados.filter((element:any) => {
    return element.estado == true;
  });

}


deshabilitarDias(){
        this.json.disabledDates = this.feriados.map((element:any)=>{
          return { year: 2022, month: element.mes , day: element.dia }
        });
      //to disable specific date and specific weekdays
      this.isDisabled = (
        date: NgbDateStruct
        //current: { day: number; month: number; year: number }
      ) => {
        return this.json.disabledDates.find(x =>
          (new NgbDate(x.year, x.month, x.day).equals(date))
          || (this.json.disable.includes(this.calendar.getWeekday(new NgbDate(date.year,date.month,date.day))) )
        )
          ? true
          : false;
      };
    }

    horaMinutos(){
     this.servicio.tiempo = (this.duracionServicio.hour * 60) + this.duracionServicio.minute;
    }


    consultarBoxsDisponibles(i:any){

     let horario =  this.servicio.horarios[i];
     //borra el box_id para forzar la consulta y que no quede el box_id anterior
     horario.box_id = 0;
     if(horario.hora_inicio.hour != 0 && horario.hora_fin.hour != 0 && horario.dia_id != 0){
      var cdt = moment(`${horario.hora_inicio.hour}:${horario.hora_inicio.minute}:00`, 'HH:mm:ss');
      var cdt2 = moment(`${horario.hora_fin.hour}:${horario.hora_fin.minute}:00`, 'HH:mm:ss');

      this.BoxService.request = {
       "hora_inicio":moment(cdt).add(1, 'm').format('HH:mm:ss'),
       "hora_fin":moment(cdt2).subtract(1, 'm').format('HH:mm:ss'),
       "dia_id":horario.dia_id,
       "horario_id":horario.id
      };

      this.BoxService.boxsDisponibles().subscribe((data:any)=>{
           if (data.code == 0) {
             horario.boxs_disponibles = data.body.boxs;
             console.log(data.body.boxs)
             console.log(horario.id)
           } else {
             console.log('Error al consultar disponibles' + data.message);
           }
         },
         (err: any) => {
           console.log('Error en el login ' + JSON.stringify(err.statusText));
         });

     }else{

      console.log('Seleccione el rango horario');
     }


    }




      verificarHorario(){
            let diasSemana = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
            let gruposDias = [];
            //asigno todos los horarios a un array de dia correspodiente
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 1));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 2));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 3));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 4));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 5));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 6));
            gruposDias.push(this.servicio.horarios.filter(item => item.dia_id == 7));


            for (let i = 0; i < this.servicio.horarios.length; i++) {
              const element = this.servicio.horarios[i];
              if(element.dia_id == 0 || (element.hora_inicio.hour == 0 && element.hora_inicio.minute == 0) || element.atenciones == 0 || element.box_id == 0 ){
                this.horarioValido = false;
                break;
              }else{
                this.horarioValido = true;
              }
            }

          for (let indiceGrupo = 0; indiceGrupo < gruposDias.length; indiceGrupo++) {
            const grupo = gruposDias[indiceGrupo];

              for (let indiceDia = 0; indiceDia < grupo.length; indiceDia++) {
                const dia = grupo[indiceDia];
                if(indiceDia == 0){
                  console.log('No pasa nada');
                }else{
                  if(dia.hora_inicio.hour < grupo[indiceDia-1].hora_fin.hour ||
                     dia.hora_inicio.hour <= grupo[indiceDia-1].hora_fin.hour && dia.hora_inicio.minute < grupo[indiceDia-1].hora_fin.minute ){
                    this.horarioValido = false;
                    this.diaMalAsignado = diasSemana[indiceGrupo];
                    break;
                  }
                }
              }

          }


      }




exeRespuesta(message:String){
  Swal.fire(
    'Good job!',
    `${message}`,
    'success'
  )
  this.cargarTabla();
}


calcularHoraTermino(i:number){

  let atenciones = this.servicio.horarios[i].atenciones;
  let minutosEstimadosAtencion = (this.duracionServicio.hour * 60) + this.duracionServicio.minute;
  let x = minutosEstimadosAtencion * atenciones;

  let minutosInicio = (this.servicio.horarios[i].hora_inicio.hour * 60) + this.servicio.horarios[i].hora_inicio.minute ;
  let minutosFin = minutosInicio + x;

  let hora = Math.trunc(minutosFin/60);
  let  minutos = minutosFin % 60;
  this.servicio.horarios[i].hora_fin.hour = hora;
  this.servicio.horarios[i].hora_fin.minute = minutos;
  this.consultarBoxsDisponibles(i);

}

calcularHorasTermino(){
  this.servicio.horarios.forEach((horario,index) => {

    this.calcularHoraTermino(index);

  });
}

editar(item:any){
  this.servicio = item;
  this.horarioValido = true;


  this.servicio.horarios.forEach(element => {
    element['boxs_disponibles'] = [{"id":element.box_id,"nombre":element.nombre}];
  });

  this.feriados.forEach((element:any) => {
    element.estado = false;
  });
  this.removeDuplicates();
  this.minutosHora();
  this.servicio.horarios.forEach(x => {
    let minutosInicio = (x.hora_inicio.hour*60) + x.hora_inicio.minute;
    let minutosFin =  (x.hora_fin.hour*60) + x.hora_fin.minute;
    let diferencia =  minutosFin - minutosInicio;
    x.atenciones = Math.trunc(diferencia/this.servicio.tiempo);

  });

  console.log(this.servicio.tiempo)


  this.open(this.modalAgregarServicio,'xl')
}

nuevoServicio(){
this.paso = 1;
this.servicio = this.servicioVacio;
this.open(this.modalAgregarServicio,'xl')

}

minutosHora(){
  let dato = this.servicio.tiempo;
  let hora = Math.trunc(dato/60);
  let minutos = dato % 60;
  this.duracionServicio.hour = hora;
  this.duracionServicio.minute = minutos;
}

removeDuplicates(){

  var arr = this.feriados.concat(this.servicio.feriadosNoTrabajados); // fusion de feriados con feriados no trabajados

  for(var i=0; i<arr.length; ++i) {

      for(var j=i+1; j<arr.length; ++j) {
          //comparacion
          if(arr[i].id === arr[j].id) {
              arr[i].estado = true;
              arr.splice(j, 1); //quita el elemento con id deuplicado
          }
      }
  }
 // return console.log(arr);
}



    validarPaso1(formulario:any){
        if(formulario.valid &&  this.paso == 1 && this.servicio.profesional_id != 0){
                this.paso += 1;
        }

    }

    validarPaso2(formulario:any){
      if(this.duracionServicio.hour != 0 || this.duracionServicio.minute != 0){
        this.verificarHorario();
          if(this.horarioValido == true){
              this.paso += 1;
          }else{
            Swal.fire(
              `${this.diaMalAsignado}`,
              'Horario mal asignado!',
              'error'
            )
              console.log('Horario mal asignado');
          }
      }
    }


    guardar(){
      if(this.servicio.id != 0){
        console.log('editando');
        this.editarServicio();
      }else{
        console.log('creando');
        this.crearServicio();
      }
    }


    editarServicio(){
      this.formatearHoras();
      this.horaMinutos();
      this.asignarFeriadosNoTrabajados();
      this.ServicioService.request = this.servicio;

      this.ServicioService.editar().subscribe((data:any)=>{
        if (data.code == 0) {
          console.log(data.message);

        } else {
           Swal.fire(
            'Good job!',
            `Ha ocurrido un error`,
            'error'
          )
        }
      },
      (err: any) => {
        Swal.fire(
          'Good job!',
          `${JSON.stringify(err.statusText)}`,
          'error'
        )
      });
    }







}
